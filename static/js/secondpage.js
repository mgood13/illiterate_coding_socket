socket = io()


$(document).ready(function(){

    var body = d3.select('body')
    var outer_div = body.append('div')
    outer_div.attr('class', 'modal')
    outer_div.attr('tabindex', '-1')
    outer_div.attr('role', 'dialog')
    outer_div.attr('id', 'invalid_player_modal')



    <div class="modal-dialog modal-dialog-centered" role="document">
    var inner_div = outer_div.append('div')
    inner_div.attr('class', 'modal-dialog modal-dialog-centered')
    inner_div.attr('role', 'document')

    var cont = inner_div.append('div')
    cont.attr('class', 'modal-content')
    var bod = cont.append('div')
    bod.attr('class', 'modal-body')
    var title = bod.append('h3')
    title.text('NOT YOUR TURN')

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
                    .attr('fill', '#69a3b2')
                    .attr('id', 'blue_box')
                    .attr('data-color', 'Blue')


    var redfill = box.append('rect')
                    .attr('x', 110)
                    .attr('y', 30)
                    .attr('width', 50)
                    .attr('height', 50)
                    .attr('stroke', 'black')
                    .attr('fill', '#FF5733')
                    .attr('id', 'red_box')
                    .attr('data-color', 'Red')




/*
        redfill.on('click', () => {
            console.log(`${name} has selected the red box`)
            var list = d3.select('#game_tracker')
            var item = list.append('li')
            item.text(`${name} has selected the red box`)
        })
        */

        $('#red_box, #blue_box').on('click', function(){
           // $(this).popover('hide')

            var color_selected = $(this).data('color')
            var mydata = {'username': name, 'selection': color_selected}



/*
            $(this).popover({
            'container': 'body',
            'placement': 'top',
            'content': 'It is not your turn.',
            'trigger': 'focus'
            }).popover('show')
            */


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

            }
            else{
                $('#invalid_player_modal').modal('show')

            }



        })

})