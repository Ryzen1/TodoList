var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(index, todoText) {
        this.todos[index].todoText = todoText;
    },
    deleteTodo: function(index) {
        this.todos.splice(index, 1)
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var completedTodos = 0;
        var totalTodos = this.todos.length;

        for (var i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed === true)
                completedTodos++;
        }
        if (completedTodos === totalTodos) {
            for (var i = 0; i < totalTodos; i++)
                this.todos[i].completed = false;
        } else {
            for (var i = 0; i < totalTodos; i++)
                this.todos[i].completed = true;
        }
    },
};

var handlers = {
    addTodo: function() {
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displayTodos();
    },
    changeTodo: function() {
        var indexTextInput = document.getElementById("indexTextInput");
        var todoTextInput = document.getElementById("todoTextInput");
        todoList.changeTodo(indexTextInput.value, todoTextInput.value);
        indexTextInput.value = null;
        todoTextInput.value = "";
        view.displayTodos();
    },
    deleteTodo: function() {
        var deleteTodoIndex = document.getElementById("deleteTodoIndex");
        todoList.deleteTodo(deleteTodoIndex);
        deleteTodoIndex.value = null;
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleCompletedPosition = document.getElementById("toggleCompletedPosition");
        todoList.toggleCompleted(toggleCompletedPosition.value);
        toggleCompletedPosition.value = null;
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    },

};

var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        for (var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement('li');
            var todo = todoList.todos[i];
            var todoTextWithCompletion = '';

            if (todo.completed === true) {
                todoTextWithCompletion = "(x) " + todo.todoText;
            } else {
                todoTextWithCompletion = '() ' + todo.todoText;
            }

            todoLi.id = i;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = "deleteButton";


        return deleteButton;
    }
};
