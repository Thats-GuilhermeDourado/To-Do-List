const inputBox = document.getElementById("input-box");
const listConteiner = document.getElementById("list-continer");

function addTask() {
    if (inputBox.value === '') {
        alert("you must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.setAttribute('draggable', true);  
        listConteiner.appendChild(li);
        
        
        addDragAndDropEvents(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listConteiner.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listConteiner.innerHTML);
}

function showTask() {
    listConteiner.innerHTML = localStorage.getItem("data");
    let items = listConteiner.querySelectorAll('li');
    items.forEach(item => {
        addDragAndDropEvents(item);
    });
}

showTask();

function addDragAndDropEvents(item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
}

let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;  
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
        this.style.display = 'none';  
    }, 0);
}

function handleDragOver(e) {
    e.preventDefault();  
    e.dataTransfer.dropEffect = 'move';  
}

function handleDrop(e) {
    e.preventDefault();  

    if (draggedItem !== this) {
        let allItems = Array.from(listConteiner.querySelectorAll('li'));
        let draggedIndex = allItems.indexOf(draggedItem);
        let targetIndex = allItems.indexOf(this);

        if (draggedIndex < targetIndex) {
            this.after(draggedItem);  
        } else {
            this.before(draggedItem);  
        }
    }
    saveData();  
}

function handleDragEnd() {
    this.style.display = 'block';  
}
