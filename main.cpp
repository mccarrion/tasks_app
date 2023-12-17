#define _DEFAULT_SOURCE
#include <SDL2/SDL.h>
#include <stdlib.h>
#include <unistd.h>
#include "lvgl/lvgl.h"
#include "lvgl/examples/lv_examples.h"
#include "lvgl/demos/lv_demos.h"

static lv_display_t* hal_init(int32_t width, int32_t height);

int main() {
    lv_init();

    hal_init(1080, 720);

    SDL_Event event;
    bool eventLoopActive = true;
    while (eventLoopActive) {
        lv_timer_handler();
        usleep(10 * 1000);
        while (SDL_PollEvent(&event) != 0) {
            if (event.type == SDL_QUIT) {
                eventLoopActive = false;
            }
        }
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
