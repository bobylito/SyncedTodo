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
    todoList.reset( todosFromServer );
    console.log(todosFromServer);
  });

  socket.on('add', function( todoFromServer ){
    todoList.add( todoFromServer );
  });

  socket.on('update', function( todoFromServer ){
    todoList.get( todoFromServer.id ).set( todoFromServer );
  });

  return socketIoSync;
};

module.exports = setupSocketIO;
