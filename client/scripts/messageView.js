// Whereas MessagesView controls the entire list of messages,
// MessageView is responsible for rendering a single message.

var MessageView = {
  // Learn more about Underscore's templating capability
  // here: https://underscorejs.org/#template.
  // TODO: Update this template accordingly.
  render: (message) => {
    // console.log(message);
    // _.template(`
    //   <!--
    //   <div class="chat">
    //     <div class="username"></div>
    //     <div class="message"></div>
    //   </div>
    //   -->
    // `);
    //   console.log(_.template(`
    //   <div class="chat">
    //     <div class="username">`+message.username+`</div>
    //     <div class="message">`+message.text+`</div>
    //     <div class="github_handle">` + message.github_handle + `</div>
    //   </div>
    // `)());

    MessagesView.$chats.append(_.template(`
    <div class="chat">
      <div class="roomname">Room name: ` + message.roomname + `</div>
      <div class="username">Username: ` + message.username + `</div>
      <div class="message">Message: ` + message.text + `</div>
      <div class="github_handle">Github handle: ` + message.github_handle + `</div>
    </div>
  `)());

  },

  roomRender: (message) => {
    $chatroom = $('.room');
    $chatroom.append(_.template(`
    <div class="chat">
      <div class="roomname">Room name: ` + message.roomname + `</div>
      <div class="username">Username: ` + message.username + `</div>
      <div class="message">Message: ` + message.text + `</div>
      <div class="github_handle">Github handle: ` + message.github_handle + `</div>
    </div>
  `)());
  }
};

