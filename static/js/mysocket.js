socket = io()
	function sendMessage () {
		socket.emit("message",document.getElementById("chat-input").value)
	}

	socket.on("new_message",(data)=>{
		document.getElementById("chat").innerHTML+="<br>"+data;
	})

    socket.on('connect', function(){
    socket.emit('my event', {data: 'User Connected'})


    });

    socket.on('my response', function(msg){
    console.log('Received Message')
    document.getElementById('chat').innerHTML+="<br>"+"User Connected"
    });