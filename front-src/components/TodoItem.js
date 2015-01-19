var React = require('React/addons');

var TodoItem = React.createClass({

  getInitialState: function(){
    return {
      isUserEditing : false
    };
  },
  render : function(){
    var labelOrField;
    if( this.state.isUserEditing )
      labelOrField = <input className="todo-label"
                            type="text"
                            defaultValue={ this.props.item.get('label') }
                            onBlur={ this.handleBlur }/>;
    else if( this.props.isEdited )
      labelOrField = <span className="todo-label disabled">{ this.props.item.get('label') }</span>;
    else
      labelOrField = <span className="todo-label">{ this.props.item.get('label') }</span>;

    return <li onClick={ this.handleClick }>
      { labelOrField }
    </li>
  },
  componentDidUpdate: function(){
    var dom   = this.getDOMNode();
    var label = dom.querySelector( ".todo-label" );
    label.focus();
  },
  handleClick : function(){
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
