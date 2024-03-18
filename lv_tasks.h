#ifndef TASKS_H
#define TASKS_H

typedef enum {
    DISP_SMALL,
    DISP_MEDIUM,
    DISP_LARGE,
} disp_size_t;

static disp_size_t disp_size;

static lv_obj_t* tv;
static lv_obj_t* calendar;
static lv_style_t style_text_muted;
static lv_style_t style_title;
static lv_style_t style_icon;
static lv_style_t style_bullet;

static lv_obj_t* scale1;
static lv_obj_t* scale2;
static lv_obj_t* scale3;

static lv_obj_t* chart1;
static lv_obj_t* chart2;
static lv_obj_t* chart3;

static lv_chart_series_t* ser1;
static lv_chart_series_t* ser2;
static lv_chart_series_t* ser3;
static lv_chart_series_t* ser4;

static const lv_font_t* font_large;
static const lv_font_t* font_normal;

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


static void tasks_create(lv_obj_t* parent) {

}

static void tabview_delete_event_cb(lv_event_t * e) {
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

    lv_obj_t* t1 = lv_tabview_add_tab(tv, "Tasks");
    lv_obj_t* t2 = lv_tabview_add_tab(tv, "Profile");

    tasks_create(t1);
}

#endif //TASKS_H
