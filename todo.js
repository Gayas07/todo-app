
let todoList = localStorage.getItem('todo-items') ? JSON.parse(localStorage.getItem('todo-items')) : []

displayItems();

function addTodo() {
  let inputElement = document.querySelector('#todo-input');
  let todoItem = inputElement.value;

  let dateElement = document.querySelector('#date-input');
  let dateItem = dateElement.value;

  let oneItem = {
    item : todoItem,
    dueDate : dateItem
  }

  todoList.push(oneItem);
  displayItems();
  updateLocalstorage('todo-items', todoList)
  inputElement.value = '';
  dateElement.value = '';
}

function displayItems(){
  let containerElement = document.querySelector('.todo-container');
  let newHtml = '';

  for (let i = 0; i < todoList.length; i++) {
    let {item, dueDate} = todoList[i]
    newHtml+= `
    <span>${item}</span>
    <span>${dueDate}</span>
    <button class="delete-btn" onclick="todoList.splice(${i},1); displayItems(); 
    deleteFromLocalStorage('todo-items', ${i});
    ">Delete</button>
    `;
  }
  containerElement.innerHTML = newHtml;
}


function updateLocalstorage(key, object){
  let todoStr = JSON.stringify(object)
  localStorage.setItem(key, todoStr)
}

function deleteFromLocalStorage(key, item_index){
  let todoObj = JSON.parse(localStorage.getItem(key))
  if (todoObj && todoObj.length > 0) {
    todoObj.splice(item_index,1);
  }
  
  updateLocalstorage(key, todoObj)
  
  todoObj = JSON.parse(localStorage.getItem(key))
  if (todoObj.length === 0){
    localStorage.clear()
    // console.warn('There are currently no items to show')
  }
}

// To set item into local storage (we need to convert the object into str using stringfy)
// let todoStr = JSON.stringify(todoList)
// localStorage.setItem('todo-items', todoStr)
// console.log(`todoStr = ${JSON.stringify(todoList)}`)

// To get item in the form of object from local storage (we need to get item & use parse so that it gets converted back into object)
// let todoObj = JSON.parse(localStorage.getItem('todo-items'))
// console.log('todoObj', todoObj)