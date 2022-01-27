socket = io()


$(document).ready(function(){

    console.log('HELLO')

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

/*
        fill.on('click', () => {
            console.log(`${name} has selected the blue box`)
            var list = d3.select('#game_tracker')
            var item = list.append('li')
            item.text(`${name} has selected the blue box`)

        })
*/


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

            var color_selected = $(this).data('color')
            var list = d3.select('#game_tracker')
            var item = list.append('li')

            var mydata = {'username': name, 'selection': color_selected}

            socket.emit('card_select', mydata)

        })

        socket.on('card_return', function(data){
            console.log(data)


            console.log(data.data.selection)
            console.log(data.data.username)

            var myname = data.data.username
            var myselection = data.data.selection

            item.text(`${myname} has selected the ${myselection} box`)

        })

})