// FormView is an object which houses all the message form functionality.
// Consider the provided code and complete the functionality.
// Apply what you learn here to other interactive views if necessary.

var FormView = {

  $form: $('form'),
  $rooms: $('#rooms select'),
  $room: $('#rooms select option:selected'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  $message: $('#message'),

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    // TODO: Currently, this is all handleSubmit does.
    // Make this function actually send a message to the Parse API.

    var success = () => {
      console.log('yay');
    };

    var messageToSend = {
      username: App.username,
      // username: 'the real david kroll',
      text: $message.val(),
      roomname: $room.text(),
    };
    console.log(messageToSend);
    Parse.create((messageToSend));
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    // FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};