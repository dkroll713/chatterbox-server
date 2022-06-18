// This App object represents the Chatterbox application.
// It should initialize the other parts of the application
// and begin making requests to the Parse API for data.

var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    var update = function() {
      setInterval(App.fetch, 10000);

      console.log('updated');
    };
    update();

    // TODO: Make sure the app loads data from the API
    // continually, instead of just once at the start.
  },

  // update: () => {

  //   // console.log('updated');
  // },

  fetch: function() {

    $main = $('#main');
    $chatroom = $('.room');
    $chats = $('#chats');

    Parse.readAll((data) => {
      // examine the response from the server request:
      // console.log(data);

      // ~~~~~~~~~~~~~~~~~~on page load~~~~~~~~~~~~~~~~~~
      $main.remove($chatroom);
      $('#chats').empty();



      // ~~~~~~~~~~~~~~~~~~messages~~~~~~~~~~~~~~~~~~
      Messages._data = data;
      Messages.getAllMessages();
      MessagesView.render(Messages._data);
      Messages.sendMessage();

      // ~~~~~~~~~~~~~~~~~~rooms~~~~~~~~~~~~~~~~~~


      rooms = [];
      rooms.push('lobby');
      for (var x = 0; x < data.length; x++) { // iterate through each message
        var message = data[x];
        // if the roomname property exists and is not already in the rooms array
        if (message.roomname && !rooms.includes(message.roomname)) {
          rooms.push(message.roomname);
        }
      }

      Rooms._data = rooms;
      RoomsView.render();
      RoomsView.handleClick();



    });
    data = Messages._data;

    $rooms = $('#rooms select');
    $room = $('#rooms select option:selected');

    RoomsView.renderRoom();

    // if room is selected, add it to main div & remove other rooms

    $main.append('<div class="room" id="' + $room.text() + '"></div>');
    console.log($room.text());
    // if no room is selected, add a default div to the page
    // if ($room.text() === 'none selected') {
    //   $('.room').append('1 No room is selected. Pick a room from the above drop-down menu.');
    // }
    // TODO: Use the data to update Messages and Rooms
    // and re-render the corresponding views.
    // ~~~~~~~~~~~~~~~~~~recursively update~~~~~~~~~~~~~~~~~~
    console.log('updated');
    $main.remove($('.room'));
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};

