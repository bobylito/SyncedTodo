var Server   = require( 'socket.io' );
var Backbone = require( 'backbone' );
var TodoList = require( '../models/TodoList' );

var todos  = new TodoList();
var server = new Server();

Backbone.sync = function(){return {};}

server.on( 'connection', function( socket ){
  socket.emit( 'init', todos.toJSON() );
  socket.on( 'create', function( todoItem ){
    todos.add( todoItem );
    socket.broadcast.emit( 'add', todoItem );
  } );
  socket.on( 'update', function( todoItem ){
    todos.get( todoItem.id ).set( todoItem );
    socket.broadcast.emit( 'update', todoItem );
  });
  socket.on('delete', function( todoItem ){
    var todo = todos.get( todoItem.id );
    if( !!todo ){
      todo.destroy();
      socket.broadcast.emit( 'delete', todoItem );
      console.log( "todo item deleted" );
    }
    else {
      console.log( "todo item NOT deleted" );
    }
  });
});

module.exports = server;
