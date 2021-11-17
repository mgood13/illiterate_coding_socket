socket = io()
	function sendMessage () {
		socket.emit("message",document.getElementById("chat-input").value)
	}

	socket.on("new_message",(data)=>{
		// document.getElementById("chat").innerHTML+="<br>"+data;
		var outerlist = d3.select('#chat')
		var item = outerlist.append('li')
		item.text(data)
	})

    socket.on('connect', function(){
        var message = d3.select('#chat')
        var item = message.append('li')
        item.text('USER CONNECTED')

        socket.emit('my event', {data: 'User Connected', mess: message})


    });

    socket.on('my response', function(msg){
        console.log(msg)
        document.getElementById('chat').innerHTML+="<br>"+msg
    });