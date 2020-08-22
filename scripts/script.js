'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');
     

let todoData = [];

//checked  for emptiness localStorage
if (localStorage.getItem('todo')) {
    todoData = JSON.parse(localStorage.getItem('todo'));
    render();
}
//output on screen
function render() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    todoData.forEach(function(item){
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = `<span class="text-todo">${item.value}</span>  
        <div class="todo-buttons"> 
            <button class="todo-remove"></button> 
		    <button class="todo-complete"></button> 
        </div>`;
        
        if (item.value !=='') {
            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
                headerInput.value = '';
            }
        }

        const btnTodoComplete = li.querySelector('.todo-complete');

//changes the status of the case
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            localStorage.setItem('todo', JSON.stringify(todoData));
            render();
        });


        const btnTodoRemove = li.querySelector('.todo-remove');

//deleted the case
        btnTodoRemove.addEventListener('click', function(){
        
            let i = todoData.indexOf(item);

            if(i >= 0) {
                todoData.splice(i,1);
            }

            localStorage.setItem('todo', JSON.stringify(todoData));

            render();
        });
    });
    
};

//add the case
todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if (headerInput.value === '') {
        headerInput.placeholder = 'Ну скажи какие планы????';
    } else{
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo);
        headerInput.value = '';

        localStorage.setItem('todo', JSON.stringify(todoData));
        
        render();
    }
});

render();