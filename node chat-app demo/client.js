

var socket = new WebSocket('ws://localhost:3080');


  var message= {type:"name-message",text:''} ;
  
   socket.onopen=()=>{
    do {
     message.text= prompt("enter your name") ;
    } while (!message.text);
     

    socket.send(JSON.stringify(message))
   
  
  }
  
  

  socket.onmessage = function(event) {
    var messages = document.getElementById('messages');
    var newMessage = document.createElement('li');
    var message = JSON.parse(event.data);
  
    newMessage.innerHTML = "<span>"+message.username +"</span>"+ ': ' + message.text;
    messages.appendChild(newMessage);
  };


  document.getElementById('form').onsubmit = function(e) {
    e.preventDefault()
    var input = document.getElementById('input');

   message={type:'text-message',text:input.value}
    socket.send(JSON.stringify(message));
    input.value = '';
   return false;
  };
