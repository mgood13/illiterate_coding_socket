socket = io()

colors = {'Red': '#FF0602', 'Green': '#61FF33', 'Blue': '#0502FF', 'Black': '#000000'}
$(document).ready(function(){

    var body = d3.select('body')
    var outer_div = body.append('div')
    outer_div.attr('class', 'modal')
    outer_div.attr('tabindex', '-1')
    outer_div.attr('role', 'dialog')
    outer_div.attr('id', 'invalid_player_modal')

    var inner_div = outer_div.append('div')
    inner_div.attr('class', 'modal-dialog modal-dialog-centered')
    inner_div.attr('role', 'document')

    var cont = inner_div.append('div')
    cont.attr('class', 'modal-content')
    var bod = cont.append('div')
    bod.attr('class', 'modal-body')
    var title = bod.append('h3')
    title.text("It isn't your turn, please wait.")

    var foot = cont.append('div')
    foot.attr('class', 'modal-footer')

    var button = foot.append('button')
    button.attr('data-dismiss', 'modal')
    button.text('Dismiss')


    var intro = d3.select('#greeting')
    var name = localStorage.getItem('name')
    intro.text(`Welcome ${name} behold the squares`)


    var hand = d3.select('#hand')
    var box = hand.append('svg')
                    .attr('width', 300)
                    .attr('height', 300)


    var fill = box.append('rect')
                    .attr('x', 30)
                    .attr('y', 30)
                    .attr('width', 50)
                    .attr('height', 50)
                    .attr('stroke', 'black')
                    .attr('fill', '#0502FF')
                    .attr('id', 'blue_box')
                    .attr('data-color', 'Blue')


    var redfill = box.append('rect')
                    .attr('x', 110)
                    .attr('y', 30)
                    .attr('width', 50)
                    .attr('height', 50)
                    .attr('stroke', 'black')
                    .attr('fill', '#FF0602')
                    .attr('id', 'red_box')
                    .attr('data-color', 'Red')




        $('#red_box, #blue_box').on('click', function(){


            var color_selected = $(this).attr('data-color')
            console.log(`You have selected ${color_selected}`)
            var myid = $(this).attr('id')
            var mydata = {'username': name, 'selection': color_selected, 'id': myid}


            socket.emit('card_select', mydata)

        })

        socket.on('card_return', function(data){
            console.log(data)

            if (data.response == 'Accepted'){
                console.log(data.selection)
                console.log(data.username)

                var myname = data.username
                var myselection = data.selection

                var list = d3.select('#game_tracker')
                var item = list.append('li')
                item.text(`${myname} has selected the ${myselection} box`)



                var send_data = {'selection': myselection, 'id': data.id}
                console.log('Turn Rotation')
                socket.emit('turn_rotate', send_data)


            }

            else{
                $('#invalid_player_modal').modal('show')
            }



        })

        socket.on('change_card', function(data){


        for (var k = 0; k < Object.keys(colors).length; k++){
                var current_color = Object.keys(colors)[k]

                if (data.selection == current_color) {
                    if (k == (Object.keys(colors).length - 1)){
                        var mycolor = Object.keys(colors)[0]
                        var shade = colors[mycolor]
                        break
                    }
                    else{
                        var mycolor = Object.keys(colors)[k + 1]
                        var shade = colors[mycolor]
                        break
                    }

                }

            }

        console.log('Color Switch')
        console.log(mycolor)
        console.log(shade)
        var square = d3.select(`#${data.id}`)
        square.attr('fill', `${shade}`)
        square.attr('data-color', `${mycolor}`)




        })

})