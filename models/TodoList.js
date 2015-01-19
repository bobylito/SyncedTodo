var Backbone = require('backbone');
var TodoItem = require('./TodoItem');

var TodoList = Backbone.Collection.extend({
  model: TodoItem,
});

module.exports = TodoList;
