#ifndef TASKS_H
#define TASKS_H

typedef enum {
    DISP_SMALL,
    DISP_MEDIUM,
    DISP_LARGE,
} disp_size_t;

static disp_size_t disp_size;

static lv_obj_t *tv;
static lv_obj_t *calendar;
static lv_style_t style_text_muted;
static lv_style_t style_title;
static lv_style_t style_icon;
static lv_style_t style_bullet;

static lv_obj_t *scale1;
static lv_obj_t *scale2;
static lv_obj_t *scale3;

static lv_obj_t *chart1;
static lv_obj_t *chart2;
static lv_obj_t *chart3;

static lv_chart_series_t *ser1;
static lv_chart_series_t *ser2;
static lv_chart_series_t *ser3;
static lv_chart_series_t *ser4;

static const lv_font_t *font_large;
static const lv_font_t *font_normal;

static uint32_t session_desktop = 1000;
static uint32_t session_tablet = 1000;
static uint32_t session_mobile = 1000;

static lv_style_t scale3_section1_main_style;
static lv_style_t scale3_section1_indicator_style;
static lv_style_t scale3_section1_tick_style;
static lv_style_t scale3_section2_main_style;
static lv_style_t scale3_section2_indicator_style;
static lv_style_t scale3_section2_tick_style;
static lv_style_t scale3_section3_main_style;
static lv_style_t scale3_section3_indicator_style;
static lv_style_t scale3_section3_tick_style;

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

static void tasks_create(lv_obj_t *parent) {
    // Initialize container
    lv_obj_t *container = lv_obj_create(parent);

    // Define tasks panel
    lv_obj_t *title = lv_label_create(container);
    lv_obj_set_grid_cell(title,
                         LV_GRID_ALIGN_STRETCH, 0, 1,
                         LV_GRID_ALIGN_STRETCH, 0, 1);
    lv_label_set_text(title, "Your Tasks");
    lv_obj_add_style(title, &style_title, 0);

    lv_obj_t *description_label = lv_label_create(container);
    lv_obj_set_grid_cell(description_label,
                         LV_GRID_ALIGN_STRETCH, 0, 1,
                         LV_GRID_ALIGN_STRETCH, 1, 1);
    lv_label_set_text(description_label, "Create Task");
    lv_obj_add_style(description_label, &style_text_muted, 0);

    lv_obj_t *description = lv_textarea_create(container);
    lv_obj_set_grid_cell(description,
                         LV_GRID_ALIGN_STRETCH, 0, 1,
                         LV_GRID_ALIGN_STRETCH, 2, 1);
    lv_textarea_set_one_line(description, true);
    lv_textarea_set_placeholder_text(description, "Start adding task here...");

    /* Container and Grid properties are down here so that later on
     * they can become variables that are set by the code above */
    // Panel layout
    static int32_t col_dsc[] = {LV_PCT(95), LV_GRID_TEMPLATE_LAST};
    static int32_t row_dsc[] = {20, 12, 100, LV_GRID_TEMPLATE_LAST};

    // Container sizing
    lv_obj_set_style_grid_column_dsc_array(container, col_dsc, 0);
    lv_obj_set_style_grid_row_dsc_array(container, row_dsc, 0);
    lv_obj_set_size(container, LV_PCT(95), 300);
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
    // initialize db connection
    auto con = init_db();

    // assume DISP_LARGE
    int32_t tab_h = 70;
    font_large = &lv_font_montserrat_24;
    font_normal = &lv_font_montserrat_16;
    disp_size = DISP_LARGE;

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
