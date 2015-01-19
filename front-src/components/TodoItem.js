var React = require('React/addons');

var TodoItem = React.createClass({

  getInitialState: function(){
    return {
      isUserEditing : false
    };
  },
  render : function(){
    var labelOrField;
    var className;
    if( this.state.isUserEditing ){
      className = "todo-item rise";
      return <li className="todo-item rise" onClick={ this.handleClick }>
               <input className="todo-label"
                      type="text"
                      defaultValue={ this.props.item.get('label') }
                      onBlur={ this.handleBlur }
                      onKeyUp={ this.handleKeyUp }/>
               <i className="fa fa-trash fa-2x" onMouseDown={this.handleClickDelete}/>
             </li>
    }
    else if( this.props.item.get('isEdited') ){
      return <li className="todo-item decline" onClick={ this.handleClick }>
               <span className="todo-label disabled">
                 { this.props.item.get('label') }
               </span>
               <i className="fa fa-trash fa-2x hidden"/>
             </li>
    }
    else{
      return <li className="todo-item" onClick={ this.handleClick }>
               <span className="todo-label">
                 { this.props.item.get('label') }
               </span>
               <i className="fa fa-trash fa-2x hidden"/>
             </li>
    }
  },
  componentDidUpdate: function(){
    var dom   = this.getDOMNode();
    var label = dom.querySelector( ".todo-label" );
    label.focus();
  },
  handleClick : function(){
    if( this.props.item.get('isEdited') ) return ;
    this.setState( {
      isUserEditing: true
    } );
    this.props.item.save( {
      isEdited: true
    } );
  },
  handleBlur : function(){
    this.save();
  },
  handleKeyUp: function( e ){
    if(e.keyCode === 13){ 
      this.save();
    }
    else if(e.keyCode === 27){
      this.discard();
    }
  },
  save: function(){
    var value = this.getDOMNode().querySelector( ".todo-label").value;
    this.setState( {
      isUserEditing: false
    } );
    this.props.item.save( {
      label : value,
      isEdited: false
    } );
  },
  discard: function(){
    this.setState( {
      isUserEditing: false
    } );
    this.props.item.save( {
      isEdited: false
    } );
  },
  handleClickDelete : function( e ){
    if( this.props.item.get('isEdited') &&  !this.state.isUserEditing ) return ;
    e.stopPropagation();
    var todo  = this.props.item;
    todo.destroy();
  }
});

module.exports = TodoItem;
