const canvas = document.querySelector("#canvas")

canvas.width = window.innerWidth

canvas.height = window.innerHeight

const context = canvas.getContext("2d")

context.strokeStyle = "black"

context.lineWidth = 5 

context.lineCap = "round"

let shouldPaint = false

document.addEventListener("mousedown", function (event)
{
  shouldPaint = true

  context.moveTo(event.pageX, event.pageY)

  context.beginPath()

})

document.addEventListener("mouseup", function (event)
{
  shouldPaint = false
})


document.addEventListener("mousemove", function(event) {

  if (shouldPaint)
  {

  context.lineTo(event.pageX, event.pageY)

  context.stroke()
  }

})

$("#flex a").click(function(){
  $("#flex a").removeClass("selected_a"); 
  $(".eraser").removeClass("selected_eraser");   
 $(this).addClass("selected_a"); 
});

$("#flex_second a#five").addClass("selected_a"); 
$("#flex_second a").click(function(){
  $("#flex_second a").removeClass("selected_a");
  $(".all").removeClass("selected_eraser");   
 $(this).addClass("selected_a"); 
});


$(".eraser").click(function(){
  $("#flex a").removeClass("selected_a"); 
  $(".all").removeClass("selected_eraser");  
 $(this).addClass("selected_eraser"); 
});

$(".all").click(function(){ 
 $("#flex_second a").removeClass("selected_a");
 $(".eraser").removeClass("selected_eraser");
 $(this).addClass("selected_eraser"); 
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(event){
    context.strokeStyle = this.style.backgroundColor

  })
})

$("#clear").click(function() {
    // Use the identity matrix while clearing the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
})

$("#half").click(function() {
    context.lineWidth = 0.5 
})

$("#one").click(function() {
    context.lineWidth = 1 
})

$("#three").click(function() {
    context.lineWidth = 3 
})

$("#five").click(function() {
    context.lineWidth = 5 
})

$("#eight").click(function() {
    context.lineWidth = 8 
})

$("#ten").click(function() {
    context.lineWidth = 10 
})

$("#twenty").click(function() {
    context.lineWidth = 20 
})

$("#thirty").click(function() {
    context.lineWidth = 30 
})

$("#forty").click(function() {
    context.lineWidth = 40 
})

$("#fifty").click(function() {
    context.lineWidth = 50 
})

$("#hundred").click(function() {
    context.lineWidth = 100 
})

$("#two_hundred").click(function() {
    context.lineWidth = 200 
})

$("#four_hundred").click(function() {
    context.lineWidth = 400 
})

$("#six_hundred").click(function() {
    context.lineWidth = 600 
})

$("#eight_hundred").click(function() {
    context.lineWidth = 800 
})


$(".all").click(function() {
    context.lineWidth = 4000 
})



    const saveButton = document.getElementById('capture');
  saveButton.addEventListener('click', () => save(canvas));



function save(canvas) {
  const data = canvas.toDataURL('image/png');
  const anchor = document.createElement('a');
  anchor.href = data;
  anchor.download = 'image.png';
  anchor.click();
}


