// This object houses all the message _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Messages = {

  // TODO: Define how you want to store your messages.
  _data: [],

  // TODO: Define methods which allow you to retrieve from,
  // add to, and generally interact with the messages.
  // use body.append(messages to post messages)

  getAllMessages: () => {
    console.log(Messages._data);
  },

  getFirstMessage: () => {
    console.log(Messages._data[0]);
    return Messages._data[0];
  },

  sendMessage: () => {
    $message = $('#message');
    $submit = $('#submit');
    $submit.on('click', function() {
      console.log(message.text);
    });
    return $message.text();
  }

};

// console.log(Messages._data);

var date = new Date();
var mdy = date.getFullYear() + '-' + 6 + '-' + date.getDate() + 'T';
var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + (date.getMilliseconds() / 100 + 'Z');
var dateTime = mdy + time;
// console.log(mdy + time);