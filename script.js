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

const sizeSelected = document.querySelector(".size")
const currentColor = document.querySelector(".current__color")
const defaultsize = document.querySelector("#flex_second  a#five")
const color = document.querySelectorAll("#flex > nav > a")
const size = document.querySelectorAll("#flex_second > .nav_second > a")
const eraser = document.querySelector(".eraser")
const full = document.querySelector(".all")



function setColor() {
  for(var i = 0; i < color.length; i++){
    const color_data = color[i].dataset.color;
    color[i].style.backgroundColor = color_data;
  }
}
setColor();


for(var i = 0; i < color.length; i++){
  color[i].addEventListener('click', (e) => {
    eraser.classList.remove("selected_eraser");
    current__color__e = e.target.dataset.color

    console.log(current__color__e)
    currentColor.style.backgroundColor = current__color__e;
  })
}

for(var i = 0; i < size.length; i++){
  size[i].addEventListener('click', (e) => {
    full.classList.remove("selected_full");
    eraser.classList.remove("selected_eraser");
    current__size__e = e.target.innerHTML;

    context.lineWidth = current__size__e 

    sizeSelected.innerHTML = current__size__e 
  })

  
}

defaultsize.classList.add("selected_a");

eraser.addEventListener('click', () => {
  for(var i = 0; i < color.length; i++){
    color[i].classList.remove("selected_a")
  }
  eraser.classList.toggle("selected_eraser");
  full.classList.remove("selected_full");
})

full.addEventListener('click', () => {
  for(var i = 0; i < size.length; i++){
    size[i].classList.remove("selected_a")
  }
  full.classList.toggle("selected_full");
  eraser.classList.remove("selected_eraser");
  context.lineWidth = 4000 
  sizeSelected.innerHTML = 'Full';
})

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(event){
    context.strokeStyle = this.style.backgroundColor

  })
})

const clear = document.querySelector("#clear")

clear.addEventListener("click",() => {
    // Use the identity matrix while clearing the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
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


