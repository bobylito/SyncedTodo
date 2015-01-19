var SocketIO = require('socket.io-client');
var uuid     = require('uuid');

var setupSocketIO = function setupSocketIO( todoList ){
  var socket   = SocketIO();

  var socketIoSync = function( method, model, options ){
    if( method === 'create' ){
      model.set({
        id : uuid.v4()
      });
    }
    socket.emit( method, model.toJSON() )
  };

  socket.on('init', function( todosFromServer ){
    todoList.reset( todosFromServer, { collection: todoList } );
  });

  socket.on('add', function( todoFromServer ){
    todoList.create( todoFromServer );
  });

  socket.on('update', function( todoFromServer ){
    todoList.get( todoFromServer.id ).set( todoFromServer );
  });

  socket.on('delete', function( todoItem ){
    console.log("DELETE");
    todoList.get( todoItem.id ).destroy();
  });

  return socketIoSync;
};

module.exports = setupSocketIO;
