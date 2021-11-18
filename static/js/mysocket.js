socket = io()


$(document).ready(function(){

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
    });

    $('#inputname').on('click', function(){
        var username = $('#myname').val()
        socket.send();

        if ($('#myname').data('chat') == '0'){
                var chatroomval = '0'
            }
            else{
                var chatroomval = $('#myname').data('chat')
            }

    });

    $('#chatselect').on('click', function(){
        var chat = $('#chatroom').val()
        console.log(chat)
        console.log(d3.select('#myname')[0])

        if(d3.select('#myname')[0] == null){
        console.log('here')
            var mychat = d3.select('#MyMessage')
            mychat.attr('data-chat', chat)
        }
        else{
        console.log('actually here')
            var myinput = d3.select('#myname')
            myinput.attr('data-chat', chat)
        }

    });






})
