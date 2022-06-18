// MessagesView is an object which controls the DOM elements
// responsible for displaying messages.

var MessagesView = {

  $chats: $('#chats'),
  $chatroom: $('.chatroom'),

  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.

  },

  render: function(data) {
    // TODO: Render _all_ the messages.
    // console.log(data);
    // for (var x = 0; x < data.length; x++) {
    //   // console.log(data[x]);
    //   MessagesView.renderMessage(data[x]);
    // }

    // xss escaping code
    for ( var x = 0; x < data.length; x++) {
      var message = data[x];
      if (message.text) {
        if (!message.text.includes('<' || '>' || 'null')) {
          MessagesView.renderMessage(data[x]);
        }
      }
    }
  },

  roomRender: (message) => {
    $rooms = $('#rooms select');
    $room = $('#rooms select option:selected');
    $chatroom = $('.room');
    var roomname = $room.text();
    console.log(roomname);
    for (var x = 0; x < Messages._data.length; x++) {
      var message = Messages._data[x];
      if (message.text && message.roomname === roomname) {
        if (!message.text.includes('<' || '>')) {
          console.log('messagesView.roomRender');
          console.log($chatroom);
          $chatroom.append('<div>message</div>');
          $chatroom.append(MessageView.roomRender(message));
        }
      }
    }
  },

  renderMessage: function(message) {
    // TODO: Render a single message.
    // this.$chats.append();
    this.$chats.append(MessageView.render(message));
    // console.log(MessageView.render(message));
    // console.log(this.$chats);
  },

  handleClick: function(event) {
    // TODO: handle a user clicking on a message
    // (this should add the sender to the user's friend list).
  }

};