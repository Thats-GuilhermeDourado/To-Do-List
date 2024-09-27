# To-Do List

This To-Do List Application is a simple and intuitive task management tool that allows users to add, mark as completed, delete, and reorder their tasks through a drag-and-drop feature. The app leverages HTML, CSS, and JavaScript to provide a clean, responsive interface, while saving tasks locally in the browser to ensure persistent data.

## Features

- **Add New Tasks**:
Users can input text into the task field and add it to the list. Tasks will appear immediately in the task list below.
If the input field is empty, the app will prompt the user to enter something.

- **Mark Tasks as Completed**:
Tasks can be marked as completed by clicking on them. When marked, the task will have a line-through and change its color to indicate it is done.

- **Delete Tasks**:
Each task has a delete button (represented by an "×" symbol). Clicking on this button will remove the task from the list.

- **Drag and Drop Reordering**:
Users can drag tasks to reorder them within the list. The new order is saved locally, so it persists even after refreshing the page.

- **LocalStorage Persistence**:
The app automatically saves the tasks in the browser's localStorage. This ensures that tasks are not lost when the user closes or reloads the page.
Both the tasks and their order are preserved between sessions.



## How It Works

--- Adding a Task:
The user enters a task description in the input box and clicks the "Add" button. This creates a new <li> element, which is appended to the task list container.
A delete button (<span>×</span>) is also added to each task to allow for easy deletion.

--- Task Completion:
Clicking on any task toggles its completion state. Completed tasks are visually differentiated by a strikethrough and muted color.

--- Deleting a Task:
Each task contains a small "×" button to its right. Clicking on it removes the task from the list and updates the stored data.

--- Reordering Tasks (Drag and Drop):
Each task is draggable. The user can drag a task to a new position, and the list will reorder accordingly. This new order is saved so that tasks remain in the correct sequence on subsequent visits.

--- Data Persistence:
The app saves the current list of tasks (including their status and order) to localStorage whenever changes are made. Upon page reload, the task list is retrieved from localStorage and displayed exactly as the user left it.



## Project Structure

├── images # Folder for img
├── index.html # Main page 
├── script.js # Application logic
└── styles.css # Application styling 
