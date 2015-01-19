var Backbone = require('backbone');

var TodoItem = Backbone.Model.extend({
  defaults: {
    label   : "",
    created : 0,
    modified: 0,
    isEdited: false
  },
  validate: function( attrs, options ){
    if( attrs.label.length > 140 )
      return 'TodoItem label length must be below 140 characters';
  }
});

module.exports = TodoItem;
