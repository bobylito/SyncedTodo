var React    = require('React/addons');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({
  render : function(){
    var todos = this.props.list.map( function(item){
      return <TodoItem item={item} />;
    });
    return <ul className="todos">
             {todos}
           </ul>;
  }
});

module.exports = TodoList;
