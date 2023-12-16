cmake_minimum_required(VERSION 3.24)
project(tasks_app)

set(CMAKE_CXX_STANDARD 17)

find_package(SDL2 REQUIRED)

include_directories(tasks_app ${SDL2_INCLUDE_DIRS})

add_executable(tasks_app src/main.cpp)
target_link_libraries(tasks_app SDL2::SDL2)
