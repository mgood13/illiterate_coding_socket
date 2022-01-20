socket = io()


$(document).ready(function(){

    console.log('HELLO')

    var hand = d3.select('#hand')
    var box = hand.append('rect')
                    .attr('x', 30)
                    .attr('y', 30)
                    .attr('width', 50)
                    .attr('height', 50)
                    .attr('stroke', 'black')
                    .attr('fill', '#69a3b2')

})