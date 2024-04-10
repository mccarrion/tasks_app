#ifndef TASKS_H
#define TASKS_H

static lv_obj_t *tv;
static lv_obj_t *calendar;
static lv_style_t style_text_muted;
static lv_style_t style_title;
static lv_style_t style_icon;
static lv_style_t style_bullet;

static const lv_font_t *font_large;
static const lv_font_t *font_normal;

static uint32_t session_desktop = 1000;
static uint32_t session_tablet = 1000;
static uint32_t session_mobile = 1000;

static void lv_tasks_widget();

using namespace duckdb;

Connection init_db() {
    DuckDB db("tasks.db");
    Connection con(db);

    /* Need to check version of DuckDB being used as tools for connecting to and reading
     * the DB seem to be 6 months behind what is being released on GitHub. If versions of viewer tools
     * and the API being used to create the DB do not match, the DB file is unreadable to the viewer tools */
    auto result = con.Query("PRAGMA version");
    result->Print();

    con.Query("CREATE TABLE IF NOT EXISTS tasks ("
              "COMPLETE         BOOLEAN        NOT NULL,"
              "DESCRIPTION      VARCHAR        NOT NULL);");

    return con;
}

inline static Connection con = init_db();

/* textarea event callback */
static void ta_event_cb(lv_event_t *e) {
    lv_event_code_t code = lv_event_get_code(e);
    auto *ta = static_cast<lv_obj_t *> (lv_event_get_target(e));
    auto *kb = static_cast<lv_obj_t *> (lv_event_get_user_data(e));
    std::string hi = "hi";
    if (code == LV_EVENT_FOCUSED) {
        if (lv_indev_get_type(lv_indev_active()) != LV_INDEV_TYPE_KEYPAD) {
            lv_keyboard_set_textarea(kb, ta);
            lv_obj_set_style_max_height(kb, LV_HOR_RES * 2 / 3, 0);
            lv_obj_update_layout(tv);
            lv_obj_set_height(tv, LV_VER_RES - lv_obj_get_height(kb));
            lv_obj_remove_flag(kb, LV_OBJ_FLAG_HIDDEN);
            lv_obj_scroll_to_view_recursive(ta, LV_ANIM_OFF);
            lv_indev_wait_release(static_cast<lv_indev_t *>(lv_event_get_param(e)));
        }
    } else if (code == LV_EVENT_DEFOCUSED) {
        lv_keyboard_set_textarea(kb, nullptr);
        lv_obj_set_height(tv, LV_VER_RES);
        lv_obj_add_flag(kb, LV_OBJ_FLAG_HIDDEN);
        lv_indev_reset(nullptr, ta);
    } else if (code == LV_EVENT_READY || code == LV_EVENT_CANCEL) {
        lv_obj_set_height(tv, LV_VER_RES);
        lv_obj_add_flag(kb, LV_OBJ_FLAG_HIDDEN);
        lv_indev_reset(nullptr, ta);
    }
}

static void submit_btn_event_cb(lv_event_t *e) {
    lv_event_code_t code = lv_event_get_code(e);
    auto *ta_data = static_cast<lv_obj_t *> (lv_event_get_user_data(e));
    if (code == LV_EVENT_CLICKED) {
        const char *task_desc = lv_textarea_get_text(ta_data);
        std::string statement = "INSERT INTO tasks (COMPLETE, DESCRIPTION) VALUES (false, '";
        statement += task_desc;
        statement.append("');");
        con.Query(statement);
        lv_textarea_set_text(ta_data, "");
        LV_LOG_USER("Clicked");
        lv_tasks_widget();
    }
}

static void tasks_create(lv_obj_t *parent) {
    // Initialize container
    lv_obj_t *container = lv_obj_create(parent);
    std::vector<int32_t> row_heights;
    static int32_t row_dsc[50] = {};

    // Define tasks panel
    lv_obj_t *title = lv_label_create(container);
    lv_obj_set_grid_cell(title,
                         LV_GRID_ALIGN_STRETCH, 0, 1,
                         LV_GRID_ALIGN_STRETCH, (int) row_heights.size(), 1);
    lv_label_set_text(title, "Your Tasks");
    lv_obj_add_style(title, &style_title, 0);
    row_heights.insert(row_heights.end(), 20);

    unique_ptr<MaterializedQueryResult> result = con.Query("SELECT * FROM tasks;");
    for (size_t i = 0; i < result->RowCount(); i++) {
        lv_obj_t * cb;
        cb = lv_checkbox_create(container);
        lv_checkbox_set_text(cb, result->GetValue(1, i).ToString().c_str());
        lv_obj_set_grid_cell(cb,
                             LV_GRID_ALIGN_STRETCH, 0, 1,
                             LV_GRID_ALIGN_STRETCH, (int) row_heights.size(), 1);
        row_heights.insert(row_heights.end(), 20);
    }

    lv_obj_t *description_label = lv_label_create(container);
    lv_obj_set_grid_cell(description_label,
                         LV_GRID_ALIGN_STRETCH, 0, 1,
                         LV_GRID_ALIGN_STRETCH, (int) row_heights.size(), 1);
    lv_label_set_text(description_label, "Create Task");
    lv_obj_add_style(description_label, &style_text_muted, 0);
    row_heights.insert(row_heights.end(), 12);

    lv_obj_t *kb = lv_keyboard_create(lv_screen_active());
    lv_obj_add_flag(kb, LV_OBJ_FLAG_HIDDEN);

    lv_obj_t *description = lv_textarea_create(container);
    lv_obj_set_grid_cell(description,
                         LV_GRID_ALIGN_STRETCH, 0, 1,
                         LV_GRID_ALIGN_STRETCH, (int) row_heights.size(), 1);
    lv_textarea_set_one_line(description, true);
    lv_textarea_set_placeholder_text(description, "Start adding task here...");
    lv_obj_add_event_cb(description, ta_event_cb, LV_EVENT_ALL, kb);
    row_heights.insert(row_heights.end(), 100);

    lv_obj_t *submit_btn = lv_btn_create(container);
    lv_obj_set_grid_cell(submit_btn,
                         LV_GRID_ALIGN_START, 0, 1,
                         LV_GRID_ALIGN_STRETCH, (int) row_heights.size(), 1);
    lv_obj_add_event_cb(submit_btn, submit_btn_event_cb, LV_EVENT_ALL, description);
    lv_obj_t *label = lv_label_create(submit_btn);
    lv_label_set_text(label, "Submit");
    lv_obj_center(submit_btn);
    row_heights.insert(row_heights.end(), 40);

    /* Container and Grid properties are down here so that later on
     * they can become variables that are set by the code above */
    // Panel layout
    static int32_t col_dsc[] = {LV_PCT(95), LV_GRID_TEMPLATE_LAST};
    int row = 0;
    for (int32_t row_height: row_heights) {
        row_dsc[row] = row_height;
        row++;
        /* TODO: add better handling for pre-sized array
         * TODO: cannot go out of bounds on row_dsc size */
        if (row + 1 >= 50) {
            break;
        }
    }
    row_dsc[row] = LV_GRID_TEMPLATE_LAST;

    // Container sizing
    lv_obj_set_style_grid_column_dsc_array(container, col_dsc, 0);
    lv_obj_set_style_grid_row_dsc_array(container, row_dsc, 0);
    lv_obj_set_size(container, LV_PCT(95), 500);
    lv_obj_set_layout(container, LV_LAYOUT_GRID);
}

static void tabview_delete_event_cb(lv_event_t *e) {
    lv_event_code_t code = lv_event_get_code(e);

    if (code == LV_EVENT_DELETE) {
        lv_style_reset(&style_text_muted);
        lv_style_reset(&style_title);
    }
}

inline void lv_tasks_widget() {

    // assume DISP_LARGE
    int32_t tab_h = 70;
    font_large = &lv_font_montserrat_24;
    font_normal = &lv_font_montserrat_16;

#if LV_USE_THEME_DEFAULT
    lv_theme_default_init(nullptr,
                          lv_palette_main(LV_PALETTE_BLUE),
                          lv_palette_main(LV_PALETTE_RED),
                          LV_THEME_DEFAULT_DARK, font_normal);
#endif

    // TODO add styling stuff here

    tv = lv_tabview_create(lv_screen_active());
    lv_tabview_set_tab_bar_size(tv, tab_h);
    lv_obj_add_event_cb(tv, tabview_delete_event_cb, LV_EVENT_DELETE, nullptr);

    lv_obj_set_style_text_font(lv_screen_active(), font_normal, 0);

    lv_obj_t *t1 = lv_tabview_add_tab(tv, "Tasks");
    lv_obj_t *t2 = lv_tabview_add_tab(tv, "Profile");

    tasks_create(t1);
}

#endif //TASKS_H
