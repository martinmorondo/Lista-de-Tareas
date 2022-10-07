const date = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");
const plusIcon = document.querySelector("#plus-icon");
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id;
let LIST;


const currentDate = new Date();
date.innerHTML = currentDate.toLocaleDateString('en-us', {weekday:"long", year:"numeric", month:"short", day:"numeric"});


function addTask(task, id, done, deleted) {

    if(deleted) {
        return;
    }

    const DONE = done ? check : uncheck;
    const LINE = done ? lineThrough : '';

    const element = `<li id = "element">
                      <i class="far ${DONE}" data = "done" id = "${id}"></i>
                      <p class = "task-text ${LINE}">${task}</p>
                      <i class="bi bi-trash-fill" data = "deleted" id = "${id}"></i>  
                      </li>
                      `
    list.insertAdjacentHTML('beforeend', element);
}

function completedTask(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.task-text').classList.toggle(lineThrough);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function deletedTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].deleted = true;
}


plusIcon.addEventListener('click', () => {
    const task = input.value;
    if(task) {
        addTask(task, id, false, false);
        LIST.push({
            name: task,
            id: id,
            done: false,
            deleted: false
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
    input.value='';
    id++;
});

document.addEventListener('keyup', function(e) {
    if(e.key == 'Enter') {
        const task = input.value;
        if(task) {
            addTask(task, id, false, false);
            LIST.push({
                name: task,
                id: id,
                done: false,
                deleted: false
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LIST));
        input.value = '';
        id++;
    }
})

list.addEventListener('click', function(e) {
    const element = e.target;
    const elementData = element.attributes.data.value;
    if(elementData == 'done') {
        completedTask(element);
    } else if (elementData == 'deleted') {
        deletedTask(element);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
})


let data = localStorage.getItem('TODO');
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    refreshList(LIST);
} else {
    LIST = [];
    id = 0;
}

function refreshList(array) {
    array.forEach(function(i) {
        addTask(i.name, i.id, i.done, i.deleted);
    })
}