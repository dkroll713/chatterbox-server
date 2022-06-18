
// DO NOT MODIFY THIS CODE
if (!/(&|\?)username=/.test(window.location.search)) {
  var search = window.location.search;
  if (!/\?/.test(search)) {
    search += '?';
  }
  if (search[search.length - 1] !== '?') {
    search += '&';
  }
  search += 'username=' + (prompt('What is your name?') || 'anonymous');
  window.location.search = search;
}
