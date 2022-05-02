/**
 * Step 1: lấy giá trị từ ô input
 * Step 2: khi nhấn Btn Add thì show ra giá trị từ ô input form (Render)
 * Step 3: hiển thị số task đã thêm vào 
 * Step 4: xóa 1 task
 * Step 5: xóa tất cả
 * Step 6: sửa task khi ấn btn sửa.
 * 
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelector.bind(document);

const inputForm = $('.input-form');
const addBtn = $('.add');
const listItems = $('.list-tasks');
const addedNum = $('.added span');
const removeAllTasks = $('.clear')
var hasRemove = true;
var hasEditMode = true;
// console.log(removeAllTasks);

var listTasks = getLocalStorageTask();
var listTasksLenght = listTasks.length;

// console.log(listTasksLenght);



// function

// render
function renderTask() {

    let content = '';
    listTasks.forEach(function (item, index) {
        content += `<div class="item">
                    <p>${item.name} </p>
                    <div class="action">
                        <i class="fas fa-trash" onclick="deleteTask(${index})"></i>
                        <i index="${index}" class="fas fa-edit" onclick="editTask(${index})"></i>
                    </div>
                </div>`
    });

    listItems.innerHTML = content;
    // console.log(listItems.innerHTML);
};
renderTask(listTasks);

// render Counting Added Number
function updateTaskCounting() {
    let listTasksLenght = listTasks.length;
    if (!hasRemove) {
        addedNum.textContent = `(${listTasksLenght})`
        listTasksLenght++
    } else {
        addedNum.textContent = `(${listTasksLenght})`
        listTasksLenght--;
    }
}
updateTaskCounting()

// enableRemove 
function enableRemove() {
    hasRemove = true;
}

// disableRemove 
function disableRemove() {
    hasRemove = false;
}


// get value from input form
function getValueFromInput() {
    return inputForm.value
}

// clear value from input form 
function clearValueFromInput() {
    inputForm.value = '';
}



// addTask
function addTask() {
    addBtn.onclick = function (e) {
        e.preventDefault();

        if (!getValueFromInput()) {
            alert('Vui lòng nhập Task')
            return false;
        }

        let taskIndex = this.getAttribute('index')
        let task = { name: inputForm.value }
        // update listTask
        if (taskIndex) {
            listTasks[taskIndex] = task;
            this.removeAttribute('index');
            addBtn.textContent = 'Add'
        } else {
            listTasks.push(task)
        }

        // listTasks.push({ name: getValueFromInput() })

        setLocalStorageTask(listTasks)

        disableRemove()

        renderTask(listTasks);
        updateTaskCounting();
        clearValueFromInput()
        // console.log(getValueFromInput());

    };
};
addTask();


// enableEditMode
function enableEditMode() {
    hasEditMode = true;
}

// disableEditMode
function disableEditMode() {
    hasEditMode = false;
}


// edit task
function editTask(index) {

    if (listTasks.length > 0) {

        if (hasEditMode) {
            inputForm.value = listTasks[index].name;
            addBtn.textContent = 'Save'
            addBtn.setAttribute('index', index)

        }
        // console.log(inputForm.value);
    }

}



// delete all task 
function deleteAllTasks(index) {
    removeAllTasks.onclick = function (e) {
        if (confirm('Are you sure you want to delete all tasks')) {
            let listTasksLenght = listTasks.length;
            listTasks.splice(index, listTasksLenght)

            setLocalStorageTask()

            updateTaskCounting()
            renderTask(listTasks);
        }
    }
}
deleteAllTasks();

// delete 1 task
function deleteTask(index) {
    // const removeBtn = $('.action .fa-trash')
    if (confirm('Are you sure you want to delete this task')) {
        listTasks.splice(index, 1)
        setLocalStorageTask(listTasks)
        enableRemove()
        updateTaskCounting()
        renderTask(listTasks)
    };

}


// function get local Storage
function getLocalStorageTask() {
    return localStorage.getItem('listTasks') ? JSON.parse(localStorage.getItem('listTasks')) : [];
}
// function set local Storage
function setLocalStorageTask() {
    return localStorage.setItem('listTasks', JSON.stringify(listTasks));
}
setLocalStorageTask();
