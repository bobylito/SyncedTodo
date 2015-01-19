var React             = require('React/addons');
var Backbone          = require('backbone');

var socketIOSync      = require('./socketIOSync.js');

var TodoListComponent = require('./components/TodoList');
var TodoListModel     = require('../models/TodoList');


var todos = new TodoListModel();

Backbone.sync = socketIOSync( todos );

todos.on("change", function(){
  console.log( arguments, todos );
  React.render( <TodoListComponent list={todos} />, document.getElementById("app") );
});

todos.on("add", function(){
  console.log( arguments, todos );
  React.render( <TodoListComponent list={todos} />, document.getElementById("app") );
});

todos.on("reset", function(){
  console.log( arguments, todos );
  React.render( <TodoListComponent list={todos} />, document.getElementById("app") );
});

React.render( <TodoListComponent list={todos} />, document.getElementById("app") );
