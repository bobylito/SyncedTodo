var React             = require('React/addons');
var Backbone          = require('backbone');

var socketIOSync      = require('./socketIOSync.js');

var TodoListComponent = require('./components/TodoList');
var TodoListModel     = require('../models/TodoList');

Backbone.sync = socketIOSync;

var todos = new TodoListModel();

todos.create( );
todos.create( );
todos.create( );
todos.create( );

React.render( <TodoListComponent list={todos} />, document.getElementById("app") );
