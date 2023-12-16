#include <SDL2/SDL.h>
#include <iostream>

int main() {

    if (SDL_Init(SDL_INIT_EVERYTHING) < 0) {
        std::cout << "Failed to initialize SDL2\n";
        return -1;
    }

    SDL_Window *window = nullptr;
    SDL_Renderer *renderer = nullptr;
    SDL_CreateWindowAndRenderer(720, 480, 0, &window, &renderer);
    SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);
    SDL_RenderClear(renderer);
    SDL_RenderPresent(renderer);

    SDL_Event event;
    bool eventLoopActive = true;
    while (eventLoopActive) {
        while (SDL_PollEvent(&event) != 0) {
            if (event.type == SDL_QUIT) {
                eventLoopActive = false;
            }
        }
    }
}
