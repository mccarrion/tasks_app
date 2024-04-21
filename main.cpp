#define _DEFAULT_SOURCE
#include <iostream>
#include <SDL2/SDL.h>
#include <cstdlib>
#include <unistd.h>
#include "duckdb.hpp"
#include "lvgl/lvgl.h"
#include "lvgl/examples/lv_examples.h"
#include "lvgl/demos/lv_demos.h"
#include "lv_tasks.hpp"

static lv_display_t* hal_init(int32_t width, int32_t height);

int main() {
    lv_init();
    hal_init(1080, 720);

    //lv_demo_widgets();
    lv_tasks_widget();
    while (1) {
        lv_timer_handler();
        usleep(10 * 1000);
    }
    lv_deinit();
    return 0;
}

static lv_display_t* hal_init(int32_t width, int32_t height) {
    lv_display_t* display = lv_sdl_window_create(width, height);
    lv_indev_t* mouse = lv_sdl_mouse_create();
    lv_indev_set_group(mouse, lv_group_get_default());
    lv_indev_set_disp(mouse, display);
    lv_display_set_default(display);

    lv_indev_t* mousewheel = lv_sdl_mouse_create();
    lv_indev_set_disp(mousewheel, display);

    lv_indev_t* keyboard = lv_sdl_keyboard_create();
    lv_indev_set_disp(keyboard, display);
    lv_indev_set_group(keyboard, lv_group_get_default());
    return display;
}
