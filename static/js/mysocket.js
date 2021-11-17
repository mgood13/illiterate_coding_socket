socket = io()
	function sendMessage () {
		socket.emit("message",document.getElementById("chat-input").value)
	}

	socket.on("new_message",(data)=>{
		document.getElementById("chat").innerHTML+="<br>"+data;
	})

    socket.on('connect', function(){
        var message = d3.select('#chat')
        var list = message.append('ol')
        var item = list.append('li')
        item.text('USER CONNECTED')

        socket.emit('my event', {data: 'User Connected'})


    });

    socket.on('my response', function(msg){
        console.log(msg)
        document.getElementById('chat').innerHTML+="<br>"+"User Connected"
        document.getElementById('chat').innerHTML+="<br>"+msg
    });