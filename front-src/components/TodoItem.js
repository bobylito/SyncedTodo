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
      labelOrField = <input className="todo-label"
                            type="text"
                            defaultValue={ this.props.item.get('label') }
                            onBlur={ this.handleBlur }/>;
      className = "todo-item rise";
    }
    else if( this.props.item.get('isEdited') ){
      labelOrField = <span className="todo-label disabled">{ this.props.item.get('label') }</span>;
      className = "todo-item decline";
    }
    else{
      labelOrField = <span className="todo-label">{ this.props.item.get('label') }</span>;
      className = "todo-item";
    }

    return <li className={className} onClick={ this.handleClick }>
      { labelOrField }
    </li>;
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
    var value = this.getDOMNode().querySelector( ".todo-label").value;
    this.setState( {
      isUserEditing: false
    } );
    this.props.item.save( {
      label : value,
      isEdited: false
    } );
  }
});

module.exports = TodoItem;
