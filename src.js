const list_form = document.getElementById("list_form")

const tasks_list = document.getElementById("tasks_list")

load_localTasks()

list_form.addEventListener("submit",(event)=> {
    event.preventDefault();
    const task_input = document.getElementById("list_input")

    const new_task = task_input.value

    if(new_task){
        tasks_list.append(createNewTaskElement(new_task))
        store_in_LocalStorage(new_task);
        task_input.value = ''
    }
})

function createNewTaskElement (task){
    const li = document.createElement('li')

    li.textContent = task

    li.append(createButton('❌','delete-btn'), createButton('✒️','edit-btn'))

    return li
}

function createButton(text,class_name){
    const button = document.createElement('span')

    button.textContent = text
    button.className = class_name

    return button
}

tasks_list.addEventListener("click", (event) => {
    if(event.target.classList.contains("delete-btn")){
        delete_task(event.target.parentElement)
    }else if(event.target.classList.contains("edit-btn")){
        edit_task(event.target.parentElement)
    }
})

function delete_task(task_Item){
    if(confirm("Are you sure to delete the task")){
        task_Item.remove()
        update_LocalStorage()
    }
}

function edit_task(task_Item){
    const new_task = prompt("Reescribe la tarea",task_Item.firstChild.textContent)

    if( new_task !== null){
        task_Item.firstChild.textContent = new_task;
        update_LocalStorage()
    }
}

function store_in_LocalStorage(task){
    const tasks = JSON.parse(localStorage.getItem("taks") || "[]")

    tasks.push(task)

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function load_localTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")

    tasks.forEach(task => {
        tasks_list.appendChild(createNewTaskElement(task))
    })
}

function update_LocalStorage(){
    const tasks = Array.from(tasks_list.querySelectorAll('li')).map((li) => li.firstChild.textContent)

    localStorage.setItem("tasks",JSON.stringify(tasks))
}

const Theme_Toogle_Button = document.querySelector("#toogle-theme-btn")

const currentTheme = localStorage.getItem("theme")


Theme_Toogle_Button.addEventListener("click",() =>{
    document.body.classList.toggle("dark-theme")

    const theme_storage = document.body.classList.contains("dark-theme")? "dark": "light"

    localStorage.setItem("theme", theme_storage)
})


if(currentTheme === "dark"){
    document.body.classList.add("dark-theme")
}
