socket = io()


$(document).ready(function(){




	socket.on("new_message",(data)=>{

        console.log(data)
        var myroom = $('#chat-input').attr('data-chat')
		var myname = $('#chat-input').attr('data-name')


        if (data.data == 'User Connected'){
            if (data.channel == myroom){
                var list = d3.select('#chatlist')
                var item = list.append('li')
                item.text(data.user + ' has joined this channel')
            }
        }
        else{

        console.log(data.data.username)
        console.log(data.data.channel)

        var incomingname = data.data.username
        var incomingchannel = data.data.channel
        var incomingmessage = data.data.message



        if (incomingchannel == myroom){
            var outerlist = d3.select('#chatlist')
            var item = outerlist.append('li')
            item.text(incomingname + ": " + incomingmessage)

            if (incomingname == myname){
            console.log('my message')
                item.style('color', 'ForestGreen') // Dark Green
            }
            else{
                item.style('color', 'FireBrick') // Dark Red
            }
        }
		$('#chat-input').val('');
        }

	})

	socket.on('addpeep', (data) => {
        console.log(data)
        all_players = data.data
        var list = d3.select('#peeps')
        all_items = d3.selectAll('.player_list_element')
        all_items.remove()

        for (var element of all_players){
            console.log(element)
            var item = list.append('li')
            item.attr('class', 'player_list_element')
            item.text(element)

        }

	})

    socket.on('connect', function(){
        var myMessage = d3.select('#chatlist')
        var item = myMessage.append('li')
        item.text('USER CONNECTED')
        socket.emit('my event', {data: 'User Connected', mess: myMessage})

    });

    socket.on('my response', function(msg){
        console.log(msg)
    });

    $('#inputname').on('click', function(){
        var username = $('#myname').val()
        var channel= $('#initial_chat').val()

        localStorage.setItem('name', username)

        console.log(username)
        console.log(channel)

        var body = d3.select('#skeleton')
        var changepage = body.insert('button')
        changepage.text('GO')
        changepage.attr('id', 'pageload')

        changepage.on('click', () =>{
            var myname = localStorage.getItem('name')
            var userdata = {'name': myname}

            socket.emit('redirection', userdata)
            console.log('success')
        })


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

        socket.emit('message', {data: 'User Connected', channel: $('#chat-input').attr('data-chat'), user: $('#chat-input').attr('data-name')})
        socket.emit('addition', {name: username})


            send.on("click", () => {
            var text = $("#chat-input").val()

            var info = {'message': text, 'channel': $('#chat-input').attr('data-chat'), 'username': $('#chat-input').attr('data-name')}

            console.log(info)
            socket.emit("message", {data: info})
            });



    });


    socket.on('pageRedirect', (data) =>{
        console.log(data)
        var url = data.url

        window.location = url
    })





})
