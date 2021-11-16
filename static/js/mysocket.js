socket = io()
	function sendMessage () {
		socket.emit("message",document.getElementById("chat-input").value)
	}

	socket.on("new_message",(data)=>{
		document.getElementById("chat").innerHTML+="<br>"+data;
	})