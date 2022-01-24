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

    var redfill = box.append('rect')
                    .attr('x', 110)
                    .attr('y', 30)
                    .attr('width', 50)
                    .attr('height', 50)
                    .attr('stroke', 'black')
                    .attr('fill', '#FF5733')

})