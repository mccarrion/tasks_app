cmake_minimum_required(VERSION 3.24)
project(tasks_app)

set(CMAKE_C_STANDARD 99)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(SDL2 REQUIRED)
find_package(duckdb REQUIRED)
find_package(Threads REQUIRED)

add_subdirectory(lvgl)
target_include_directories(lvgl PUBLIC ${PROJECT_SOURCE_DIR}
        ${SDL2_INCLUDE_DIRS} ${DUCKDB_INCLUDE_DIRS})

add_executable(tasks_app main.cpp)
target_compile_definitions(tasks_app PRIVATE LV_CONF_INCLUDE_SIMPLE)
target_link_libraries(tasks_app lvgl lvgl::examples lvgl::demos lvgl::thorvg
        SDL2::SDL2 duckdb Threads::Threads m pthread)
