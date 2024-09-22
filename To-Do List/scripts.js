const inputField = document.getElementById("new-task");
const addButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");
const modal = document.getElementById("modal"); 

function addTask() {
    const taskText = inputField.value.trim(); 

    if (taskText !== "") {
        const newTask = document.createElement("li"); 
        newTask.classList.add("task-item"); 
        newTask.setAttribute("draggable", true); 

        newTask.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        `;

        addEventListeners(newTask, taskText);

        todoList.appendChild(newTask); 
        inputField.value = ""; 
    }
}

function addEventListeners(taskElement, taskText) {
    const checkbox = taskElement.querySelector("input[type='checkbox']");
    
    checkbox.addEventListener("change", function() {
        taskElement.style.textDecoration = checkbox.checked ? "line-through" : "none"; // Marca como concluída
        taskElement.classList.toggle("checked"); // Adiciona/Remove a classe "checked"
    });


    taskElement.querySelector(".delete-btn").addEventListener("click", function() {
        currentTaskToDelete = taskElement; 
        modal.style.display = "flex"; 
    });

    taskElement.querySelector(".edit-btn").addEventListener("click", function() {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskText; 
        taskElement.innerHTML = ''; 
        taskElement.appendChild(editInput); 

        const saveButton = document.createElement("button");
        saveButton.textContent = "Salvar"; 
        saveButton.classList.add("edit-btn"); 


        saveButton.addEventListener("click", function() {
            const updatedText = editInput.value.trim(); 
            if (updatedText !== "") {
                taskElement.innerHTML = `
                    <input type="checkbox">
                    <span>${updatedText}</span>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                `;
                addEventListeners(taskElement, updatedText);
            } else {
                alert("A tarefa não pode ser vazia."); 
            }
        });

        taskElement.appendChild(saveButton); 
    });

    taskElement.addEventListener("dragstart", function() {
        taskElement.classList.add("dragging"); 
    });

    taskElement.addEventListener("dragend", function() {
        taskElement.classList.remove("dragging");
    });
}


addButton.addEventListener("click", addTask);


todoList.addEventListener("dragover", function(e) {
    e.preventDefault(); 
    const dragging = document.querySelector(".dragging"); 
    const afterElement = getDragAfterElement(todoList, e.clientY); 

    if (afterElement == null) {
        todoList.appendChild(dragging);
    } else {
        todoList.insertBefore(dragging, afterElement);
    }
});

function getDragAfterElement(todoList, y) {
    const draggableElements = [...todoList.querySelectorAll('.task-item:not(.dragging)')]; 
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

document.getElementById("confirm-delete").addEventListener("click", function() {
    if (currentTaskToDelete) {
        todoList.removeChild(currentTaskToDelete); 
        modal.style.display = "none"; 
    }
});

document.getElementById("cancel-delete").addEventListener("click", function() {
    modal.style.display = "none"; 
});

const filterSelect = document.getElementById("filter");
filterSelect.addEventListener("change", function() {
    const filterValue = filterSelect.value; 
    const tasks = todoList.getElementsByTagName("li"); 

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const checkbox = task.querySelector("input[type='checkbox']");

        if (filterValue === "all") {
            task.style.display = "flex"; 
        } else if (filterValue === "completed" && checkbox.checked) {
            task.style.display = "flex"; 
        } else if (filterValue === "pending" && !checkbox.checked) {
            task.style.display = "flex";
        } else {
            task.style.display = "none"; 
        }
    }
});


const themeToggle = document.getElementById("theme-toggle");


if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme"); 
    themeToggle.innerHTML = '<i class="bi bi-brightness-high"></i>'; 
}

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-theme"); 
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark"); 
        themeToggle.innerHTML = '<i class="bi bi-brightness-high"></i>'; 
    } else {
        localStorage.setItem("theme", "light"); 
        themeToggle.innerHTML = '<i class="bi bi-moon-stars"></i>'; 
    }
});
