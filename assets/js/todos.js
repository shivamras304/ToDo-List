window.onload = function() {

  class TodoList {
    constructor() {
      this.todos = [];
      this.nextId = 0;
    }

    getTodoIndexById(todoId) {
      for (let i = 0; i < this.todos.length; i++) {
        const todo = this.todos[i];
        //comparing string with number
        if (todo.id == todoId) {
          return i;
        }
      }
    }

    addTodo(todo) {
      this.nextId++;
      this.todos.push(todo);
    }

    removeTodo(i) {
      this.todos.splice(i, 1);
    }

    moveUp(i) {
      if(i !== 0) {
        const temp = this.todos[i-1];
        this.todos[i-1] = this.todos[i];
        this.todos[i] = temp;
      }
    }

    moveDown(i) {
      if(i !== this.todos.length-1) {
        const temp = this.todos[i+1];
        this.todos[i+1] = this.todos[i];
        this.todos[i] = temp;
      }
    }

    removeDoneTodos() {
      this.todos = this.todos.filter(function(item) {
          return !item.done;
      })
    }
  }

  class Todo {
    constructor(todoText, todoId) {
      this.text = todoText;
      this.done = false;
      this.id = todoId;
    }
    toggleDone() {
      this.done = !this.done;
    }
  }

  const inputText = document.querySelector("#input-text");
  const delDone = document.querySelector("#del-done");
  const todoListHtml = document.querySelector("#todolist");
  // let checkBox = document.querySelector("")
  const myTodoList = new TodoList();

  inputText.addEventListener("keypress", function(event) {
    if (event.which === 13 && inputText.value) {
      const newTodo = new Todo(inputText.value, myTodoList.nextId);
      myTodoList.addTodo(newTodo);

      addToDoHtml(newTodo.text, newTodo.done, newTodo.id);

      inputText.value = "";
    }
  });

  delDone.addEventListener("click", function() {
    myTodoList.removeDoneTodos();
    drawTodoListAgain();
  });

  function drawTodoListAgain() {
    todoListHtml.innerHTML = "";
    let flag = false;
    myTodoList.todos.forEach(function(todo) {
      flag = todo.done || flag;
      addToDoHtml(todo.text, todo.done, todo.id)
    })
    if(flag) {
      delDone.style.display = "flex";
    } else {
      delDone.style.display = "none";
    }
  }

  function addToDoHtml(todoText, todoDone, todoId) {
    let newListItem = document.createElement("li");

    let innerHtml = "";

    innerHtml = `
    <span class="todo-move">
        <i class="fa fa-chevron-up todo-up" aria-hidden="true" data-target="todo-up"></i>
        <i class="fa fa-chevron-down todo-down" aria-hidden="true" data-target="todo-down"></i>
    </span>
    `;
    if(todoDone) {
      innerHtml += `<span class="todo-text completed" data-target="todo-text">${todoText}</span>`;
    } else {
      innerHtml += `<span class="todo-text" data-target="todo-text">${todoText}</span>`;
    }
    innerHtml += `
    <span class="todo-grow"></span>
    <i class="fa fa-trash todo-del" aria-hidden="true" data-target="todo-delete"></i>
    `;

    newListItem.innerHTML = innerHtml;
    newListItem.setAttribute("data-id", todoId);
    newListItem.addEventListener("click", liClickEvent);
    todoListHtml.appendChild(newListItem);
  }

  function liClickEvent(event) {

    // console.log(event.target.getAttribute("data-target"));
    const index = myTodoList.getTodoIndexById(event.currentTarget.getAttribute("data-id"));
    console.log(index);
    switch (event.target.getAttribute("data-target")) {
      case "todo-text":
        const todo = myTodoList.todos[index];
        todo.toggleDone();
        drawTodoListAgain();
        break;
      case "todo-up":
        myTodoList.moveUp(index);
        drawTodoListAgain();
        break;
      case "todo-down":
        myTodoList.moveDown(index);
        drawTodoListAgain();
        break;
      case "todo-delete":
        myTodoList.removeTodo(index);
        drawTodoListAgain();
        break;
    }
    console.log(myTodoList.todos);
  }

};
