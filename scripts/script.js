'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');
     

const todoData = [];

let json, jsonparse, arr;

const render = function() {

    jsonparse = localStorage.getItem('value');
    arr = JSON.parse(jsonparse);

    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    arr.forEach(function(item){
        const li = document.createElement('li');
        console.log();
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
		    '<button class="todo-complete"></button>' +
        '</div>';
        
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        // const btnTodoRemove = li.querySelector('.todo-remove');

        // btnTodoRemove.addEventListener('click', function(){
            
           
        //     render();
        // });
    });
    
};


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

        json = JSON.stringify(todoData);
        localStorage.setItem('value', json);
        
        render();
    }
});



    
      


render();