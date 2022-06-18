/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var fs = require('fs');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,PATCH, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

var exampleMessageData = [
  {room: 'default', username: 'username', text: 'example text 01'},
  {room: 'default', username: 'the other user', text: 'example text 02'},
  {room: 'the second room', username: 'the other other user', text: 'example text 03'},
  {room: 'the third room', username: 'the other other OTHER user', text: 'example text 03'}
];

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  if (request.url === '/') {
    if (request.method === 'GET') { // For this method we will need to edit client code to send POST with username data
      statusCode = 200;
      response.writeHead(statusCode, headers);
      //response.end(fs.readFileSync(`chatterbox.html/???username=${data}`));
    }
    console.log('hello');
    response.writeHead(200, {'content-type': 'text/html'});
    // response.write(fs.readFileSync('node_modules/underscore/underscore.js'));
    response.end(fs.readFileSync('chatterbox.html'));

  } else if ( request.url === '/client/styles/styles.css') {
    response.writeHead(200, {'content-type': 'text/css'});
    response.end(fs.readFileSync('client/styles/styles.css'));

  } else if ( request.url === '/client/images/spiffygif_46x46.gif' ) {
    console.log('loading image');
    response.writeHead(200, {'content-type': 'image/gif'});
    response.end(fs.readFileSync('client/images/spiffygif_46x46.gif'));

  } else if ( request.url === '/client/env/config.js') {
    response.writeHead(200, {'content-type': 'text/javascript'});
    response.end(fs.readFileSync('client/env/config.js'));

  } else if ( request.url === '/client/scripts/parse.js') {
    response.writeHead(200, {'content-type': 'text/javascript'});
    response.end(fs.readFileSync('client/scripts/parse.js'));

  } else if ( request.url === '/client/scripts/rooms.js') {
    response.writeHead(200, {'content-type': 'text/javascript'});
    response.end(fs.readFileSync('client/scripts/rooms.js'));

  } else if ( request.url === '/client/scripts/friends.js') {
    response.writeHead(200, {'content-type': 'text/javascript'});
    response.end(fs.readFileSync('client/scripts/friends.js'));

  } else if ( request.url === '/client/scripts/messages.js') {
    response.writeHead(200, {'content-type': 'text/javascript'});
    response.end(fs.readFileSync('client/scripts/messages.js'));

  } else if ( request.url === '/client/scripts/formView.js') {
    response.writeHead(200, {'content-type': 'text/javascript'});
    response.end(fs.readFileSync('client/scripts/formView.js'));

  } else if ( request.url === '/client/scripts/roomsView.js') {
    response.writeHead(200, {'content-type': 'text/javascript'});
    response.end(fs.readFileSync('client/scripts/roomsView.js'));

  } else if ( request.url === '/client/scripts/messageView.js') {
    response.writeHead(200, {'content-type': 'text/javascript'});
    response.end(fs.readFileSync('client/scripts/messageView.js'));

  } else if ( request.url === '/client/scripts/messagesView.js') {
    response.writeHead(200, {'content-type': 'text/javascript'});
    response.end(fs.readFileSync('client/scripts/messagesView.js'));

  } else if ( request.url === '/client/scripts/app.js') {
    response.writeHead(200, {'content-type': 'text/javascript'});
    response.end(fs.readFileSync('client/scripts/app.js'));

  // }
  // else if ( request.url === '/client/scripts/userName.js') {
  //   response.writeHead(200, {'content-type': 'text/javascript'});
  //   response.end(fs.readFileSync('client/scripts/userName.js'));

  } else if (request.url.includes('username')) {
    console.log('username');
    response.write(fs.readFileSync('chatterbox.html'));

  } else if (request.url === '/classes/messages') {
    // response.end('Hello,404 World!');
    if (request.method === 'OPTIONS') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end('OPTIONS request recieved');
    }
    if (request.method === 'GET') {
      // console.log('Method is GET');
      // console.log(request);
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(exampleMessageData)); // sending the Server data back to client
    }
    if (request.method === 'POST') {
      request.on('data', function(input) {
        exampleMessageData.unshift(JSON.parse(input));
        // console.log(input);
        // console.log(exampleMessageData);
      });
      statusCode = 201;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(exampleMessageData)); // send a success message and put data in the server data storage
    }
    if (request.method === 'PATCH') {
      console.log('patch is coming through as a patch');
      request.on('data', function(input) {
        // exampleMessageData.unshift(JSON.parse(input));
        // console.log(input);
        // console.log(exampleMessageData);
        statusCode = 405;
        response.writeHead(statusCode, headers);
        response.end('ERROR');
      });
      statusCode = 405;
      response.writeHead(statusCode, headers);
      response.end('ERROR');
      // console.log(response);
    }
    if (request.method === 'PUT') {
      statusCode = 405;
      response.writeHead(statusCode, headers);
      response.end('ERROR');
      //console.log(response);
    }
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('Not found');
  }

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports.requestHandler = requestHandler;
module.exports.defaultCorsHeaders = defaultCorsHeaders;