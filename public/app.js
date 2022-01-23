$(document).ready(() => {
  $.getJSON("/api/todos").then(addTodos);

  $("#todoInput").keypress(event => {
    if (event.which === 13) {
      createTodo();
    }
  });
  $(".list").on("click", "li", function () {
    updateTodo($(this));
  });
  $(".list").on("click", "span", function (e) {
    e.stopPropagation();
    removeTodo($(this).parent());
  });
});

const addTodos = todos => {
  todos.forEach(todo => {
    addTodo(todo);
  });
};

const addTodo = todo => {
  let newTodo = $('<li class="task">' + todo.name + " <span>X</span></li>");
  newTodo.data("id", todo._id);
  newTodo.data("completed", todo.completed);
  if (todo.completed) {
    newTodo.addClass("done");
  }
  $(".list").append(newTodo);
};

const createTodo = () => {
  let userInput = $("#todoInput").val();
  $.post("/api/todos", { name: userInput })
    .then(newTodo => {
      addTodo(newTodo);
    })
    .catch(err => {
      console.log(err);
    });
};

const removeTodo = todo => {
  const clickedId = todo.data("id");
  let deleteUrl = "/api/todos/" + clickedId;
  $.ajax({
    method: "DELETE",
    url: deleteUrl
  })
    .then(data => {
      todo.remove();
    })
    .catch(err => {
      console.log(err);
    });
};

const updateTodo = todo => {
  const updateUrl = "/api/todos/" + todo.data("id");
  let isDone = !todo.data("completed");
  let updateData = { completed: isDone };
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData
  }).then(function (updatedTodo) {
    todo.toggleClass("done");
    todo.data("completed", isDone);
  });
};
