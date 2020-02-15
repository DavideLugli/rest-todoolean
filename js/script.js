// http://157.230.17.132:30XX/todos
// http://157.230.17.132:3021/todos
// Creiamo una app che permette di inserire e cancellare dei todos in una lista utilizzando la API boolean per fare operazioni CRUD.

$(document).ready(function() {
  printToDo();

  $('#send-todo').click(function() {
    var toDoValue = $('#add-todo').val();
    addToDo(toDoValue);
    $('#add-todo').val('');
  });

  $(document).on('click', '.delete', function() {
    var deleteThisTodo = $(this);
    var toDoId = deleteThisTodo.parent().attr('data-id');
    deleteToDo(toDoId);
  })
})


function printToDo() {
  $.ajax({
    url: 'http://157.230.17.132:3021/todos',
    method: 'GET',
    success: function(data) {
      var todos = data;

      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);
      for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        var context = {
          id: todo.id,
          text: todo.text
        };
        var html = template(context);
        $('.todolist').append(html);
      }
    },
    error: function() {
      alert('errore');
    }
  })
}

function addToDo(value) {
  $.ajax({
    url: 'http://157.230.17.132:3021/todos',
    method: 'POST',
    data: {
      text: value
    },
    success: function(data) {
      $('.todolist').html('');
      printToDo();

    },
    error: function() {
      alert('errore');
    }
  })

}

function deleteToDo(id) {
  $.ajax({
    url: 'http://157.230.17.132:3021/todos/' + id,
    method: 'DELETE',
    success: function(data) {
      $('.todolist').html('');
      printToDo();

    },
    error: function() {
      alert('errore');
    }
  })
}
