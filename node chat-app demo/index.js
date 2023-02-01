const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3080 });
var messages=[]


server.on('connection', (socket) => {
  
  
   
  var name ;
  
  
    console.log(messages);

  messages.forEach(m=>
  socket.send(JSON.stringify(m)) )
  
  socket.on('message', (message) => {
    
   
      const parsedMessage = JSON.parse(message) ;

      console.log(parsedMessage);

       if(parsedMessage.type=="name-message"){
        name=parsedMessage.text ;
        console.log(name);
        return ;
     }



      server.clients.forEach((client) => {
        if (client==socket && client.readyState === WebSocket.OPEN) {
          parsedMessage.username = "you";
          client.send(JSON.stringify(parsedMessage));
         parsedMessage.username=name;
          console.log('Message sent');
        }
        else {
          parsedMessage.username = name;
          client.send(JSON.stringify(parsedMessage));
        
          console.log('Message sent');
         
        }
     
      });  

       messages.push(parsedMessage)
    }) 
});
