socket = io()


$(document).ready(function(){


	$('#send-input').on('click', function(){

        var text = document.getElementById("chat-input").value

        var info = {'message': text, 'channel': $('#chat-input').attr('data-chat')}


        socket.emit("message",)

	})

	socket.on("new_message",(data)=>{
		// document.getElementById("chat").innerHTML+="<br>"+data;
		var myroom = $('#chat-input').attr('data-chat')
		console.log('I am calling from room:')
		console.log(myroom)

		var outerlist = d3.select('#chatlist')
		var item = outerlist.append('li')
		item.text(myroom + ": " + data)

		$('#chat-input').val('');
	})

    socket.on('connect', function(){
        var message = d3.select('#chatlist')
        var item = message.append('li')
        item.text('USER CONNECTED')
        socket.emit('my event', {data: 'User Connected', mess: message})

    });

    socket.on('my response', function(msg){
        console.log(msg)
    });

    $('#inputname').on('click', function(){
        var username = $('#myname').val()
        var channel= $('#initial_chat').val()

        console.log(username)
        console.log(channel)
        socket.send();

        var body = d3.select('#skeleton')
        var header = body.insert('h4').text(`Hello ${username}. Welcome to the chat app`)
        var localchat = body.insert('h7').text(`You are currently talking on channel: ${channel}`)

        body.append('br')

        var myinput = body.insert('input')
        myinput.attr('id', 'chat-input')
        myinput.attr('data-name', username)
        myinput.attr('data-chat', channel)

        var send = body.append('button')
        send.text('SEND')
        send.attr('id', 'send-input')

        var chat = body.insert('ul')
        chat.attr('id', 'chatlist')
        var speak = chat.append('li')
        speak.text(`${username} is now speaking on this channel`)
    });


    $('#chatselect').on('click', function(){
        var chat = $('#chatroom').val()


        if(d3.select('#myname')[0] == null){
            var mychat = d3.select('#chat-input')
            mychat.attr('data-chat', chat)
        }

        else{
            var myinput = d3.select('#myname')
            myinput.attr('data-chat', chat)
        }

    });


})
