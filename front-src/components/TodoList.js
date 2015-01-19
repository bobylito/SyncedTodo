var React    = require('React/addons');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({
  render : function(){
    var todos = this.props.list.map( function(item){
      return <TodoItem item={item} key={item.cid}/>;
    });
    return <div className="todosContainer">
      <div className="add" onClick={ this.addItem }></div>
      <ul className="todos">
        {todos}
      </ul>
    </div>;
  },
  addItem: function(){
    this.props.list.create();
  }
});

module.exports = TodoList;
