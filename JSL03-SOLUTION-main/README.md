# JSL03 Challenge – Solution Code

## Overview

This repository contains the **official solution code for the JSL03 challenge**. It builds on JSL02 by introducing **arrays**, **loops**, and **function structuring** for managing multiple tasks dynamically.

This solution is designed to help students deepen their understanding of:

- JavaScript arrays and object manipulation
- Validating user input within loops
- Defining and reusing functions
- Managing task states (`todo`, `doing`, `done`)
- Using the console to inspect data structures

## Features Covered

The solution demonstrates how to:

- Initialize an array of task objects with various states
- Prompt the user to **add new tasks** until the list contains exactly six items
- Validate task status input using a loop to prevent invalid entries
- Encapsulate logic into clearly named, reusable functions
- Display both the full list of tasks and completed tasks (`status: "done"`) in the console
- Alert the user when the task board is full

## Structure

The project includes:

- 📦 A task array initialized with 3 predefined tasks
- ✍️ `addTask()` function that handles all user input and validation
- 🔁 A loop that fills the board with user-provided tasks until there are 6 total
- ✅ A `getCompletedTasks()` function that filters and returns completed tasks
- 💬 Alerts and console messages that give users useful feedback

## How to Use This Solution

1. Open the project in **VS Code** with **Live Server** or run it in a browser environment that supports `prompt()` and `alert()`.
2. Open your browser’s **developer console** to see the task list output.
3. Walk through the code and observe how:
   - Tasks are structured and stored
   - Input is validated in real-time
   - Functions promote clean and modular design
4. Reflect on how to apply these concepts to more complex task management or UI-driven applications.

---

## License

This solution code is provided for **educational use only**.
