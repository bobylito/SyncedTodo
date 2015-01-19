var Server   = require( 'socket.io' );
var TodoList = require( '../models/TodoList' );

var todos  = new TodoList();
var server = new Server();

server.on( 'connection', function( socket ){
  console.log( "a user connected" );
  socket.emit( 'init', todos.toJSON() );
  socket.on( 'create', function( todoItem ){
    todos.add( todoItem );
    socket.broadcast.emit( 'add', todoItem );
  } );
  socket.on( 'update', function( todoItem ){
    todos.get( todoItem.id ).set( todoItem );
    socket.broadcast.emit( 'update', todoItem );
  });
  /*
     'create': 'POST',
     'update': 'PUT',
     'patch':  'PATCH',
     'delete': 'DELETE',
     'read':   'GET'
  */
});

module.exports = server;
