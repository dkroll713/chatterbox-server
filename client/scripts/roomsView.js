// RoomsView is an object which controls the DOM elements
// responsible for displaying and selecting rooms.

var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.
  },

  render: function() {
    // TODO: Render out the list of rooms.
    // console.log(Rooms._data);
    var roomKeys = {};
    var keyCounter = 0;

    if ($('#rooms select').has('option').length === 0) {
      // $('#rooms select').empty();

      for (var x = 0; x < Rooms._data.length; x++) { // loop thru rooms & create key/values
        roomKeys[keyCounter] = Rooms._data[x];
        keyCounter ++;
      }
      // console.log(roomKeys);
      $.each(roomKeys, function(key, value) { // add rooms to select property
        $('#rooms select').append($('<option>', {value: key}).text(value));
      });
    }
  },

  renderRoom: function(roomname) {
    // TODO: Render out a single room.
    $main = $('#main');
    $rooms = $('#rooms select');
    $room = $('#rooms select option:selected');
    $rooms.on('change', function() {
      $room = $('#rooms select option:selected');
      console.log('selected room:', $room.text());
      // if no room is selected
      if ($room.text() === 'none selected') {
        $('.room').remove();
        // if ($('.room')) {
          // console.log('there is already a room');
        // } else {
        $main.append('<div class="room1" id="' + $room.text() + '"></div>');
        $('.room').append('No room is selected. Pick a room from the above drop-down menu.');

      }
      // if a room is selected
      if ($room.text() !== 'none selected') {
        $('.room').remove();
        $main.append('<div class="room" id="' + $room.text() + '">' + $room.text() + ' is selected :)</div>');
        // render messages belonging to a specific room inside previous div
        $chatroom = $('.room');
        MessagesView.roomRender();
        console.log($chatroom);
      }
    });
  },

  handleChange: function(event) {
    // TODO: Handle a user selecting a different room.
    $rooms.on('change', function() {
      $room = $('#rooms select option:selected');
      // console.log('selected room:', $room.text());
      // if no room is selected
      // if ($room.text() === 'none selected' && !$('.room')) {
      //   $('.room').remove();
      //   $main.append('<div class="room" id="' + $room.text() + '"></div>');
      //   $('.room').append('No room is selected. Pick a room from the above drop-down menu.');
      // }
      // if a room is selected
      if ($room.text() !== 'none selected' && !$('.room')) {
        $('.room').remove();
        $main.append('<div class="room" id="' + $room.text() + '">' + $room.text() + ' is selected :)</div>');
        RoomsView.renderRoom();
        // add another div and render messages inside it
      }
    });
  },

  handleClick: function(event) {
    // TODO: Handle the user clicking the "Add Room" button.
    $button = $('#rooms button');

    $button.on('click', function() {
      var text = prompt("Which room would you like to join?", "idk make one");
      console.log(text);
      var messageToSend = {
        username: App.username,
        // username: 'the real david kroll',
        text: App.username + ' is creating a room: ' + text,
        roomname: text,
      };
      console.log(messageToSend);
      Parse.create((messageToSend));
    });
  }

};
