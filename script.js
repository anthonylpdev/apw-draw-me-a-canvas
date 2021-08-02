const canvas = document.querySelector("#canvas")

canvas.width = window.innerWidth

canvas.height = window.innerHeight

const context = canvas.getContext("2d")

context.strokeStyle = "black"

context.lineWidth = 5 

context.lineCap = "round"

let shouldPaint = false


let shouldPaintImage = false

let isSelected = false

const image = document.createElement("img")


document.addEventListener("mousedown", function (event)
{ 


  if (isSelected) {
    shouldPaint = false
  }else {
    shouldPaint = true
  }
  
  if (shouldPaint) {
  context.moveTo(event.pageX, event.pageY)
  context.beginPath()
  }
})

document.addEventListener("mouseup", function (event)
{
  shouldPaint =false
  shouldPaintImage = false
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
const color = document.querySelectorAll("#flex > nav > a")
const size = document.querySelectorAll("#flex_second > .nav_second > a")
const form = document.querySelectorAll("#flex_second > .nav_third > a.form")

const emotes = document.querySelectorAll(".nav_third > a.emote")


const flame = document.querySelector("a.flame")
const bug = document.querySelector("a.bug")
const fr = document.querySelector("a.fr")


const eraser = document.querySelector(".eraser")
const full = document.querySelector(".all")

const defaultSize = document.querySelector(".default");

window.addEventListener("DOMContentLoaded", (event) => {
  defaultSize.classList.add("selected__size")
});

function setColor() {
  for(var i = 0; i < color.length; i++){
    const color_data = color[i].dataset.color;
    color[i].style.backgroundColor = color_data;
  }
}
setColor();

function resetSize() {
  for(var i = 0; i < size.length; i++){
    size[i].classList.remove("selected__size")
  }
}

function resetForm() {
  for(var i = 0; i < form.length; i++){
    form[i].classList.remove("selected__form")
  }
}



bug.addEventListener('click', (e) => {

  for(var i = 0; i < emotes.length; i++){
    emotes[i].classList.remove('selected__emote')
    }

  e.target.parentElement.classList.add('selected__emote')

  shouldPaint = false;

  isSelected = true;

  image.src = "bug.png"

  currentColor.style.background = "transparent url('bug.png') no-repeat center";
  currentColor.style.backgroundSize = "cover";
});



flame.addEventListener('click', (e) => {

  for(var i = 0; i < emotes.length; i++){
    emotes[i].classList.remove('selected__emote')
    }

  console.log(e.target)

  e.target.parentElement.classList.add('selected__emote')

  shouldPaint = false;

  isSelected = true;

  image.src = "flame.png"

  currentColor.style.background = "transparent url('flame.png') no-repeat center";
  currentColor.style.backgroundSize = "cover"

});

fr.addEventListener('click', (e) => {

  for(var i = 0; i < emotes.length; i++){
    emotes[i].classList.remove('selected__emote')
    }

  e.target.parentElement.classList.add('selected__emote')

  shouldPaint = false;

  isSelected = true;

  image.src = "fr.png"

  currentColor.style.background = "transparent url('fr.png') no-repeat center";
  currentColor.style.backgroundSize = "cover"

});


canvas.addEventListener('click', (e) => {


  if (isSelected) {
    shouldPaintImage = true;

      if (shouldPaintImage) {

        context.drawImage(image, event.pageX - 75, event.pageY - 75, 150, 150)

      }
  }
  


});

for(var i = 0; i < form.length; i++){
  form[i].addEventListener('click', (e) => {
    shouldPaintImage = false;
    isSelected = false;
    
    console.log(e)
    resetForm()


    for(var i = 0; i < emotes.length; i++){
    emotes[i].classList.remove('selected__emote')
    }
    
    if (e.target.localName == "span") {
      e.target.parentElement.classList.add("selected__form")
    }else {
      e.target.classList.add("selected__form")
    }
    
    if (e.target.classList.contains("round")) {
      context.lineCap = "round"
    } else if (e.target.classList.contains("square")) {
      context.lineCap = "square"
    } else if (e.target.children[0].classList.contains("square")){
      context.lineCap = "square"
    }else if (e.target.children[0].classList.contains("round")){
      context.lineCap = "round"
    }
  })
}


for(var i = 0; i < color.length; i++){
  color[i].addEventListener('click', (e) => {
    shouldPaintImage = false;
    isSelected = false;

    for(var i = 0; i < emotes.length; i++){
      emotes[i].classList.remove('selected__emote')
      }

    eraser.classList.remove("selected_button");
    current__color__e = e.target.dataset.color
    
    console.log(current__color__e)
    currentColor.style.background = current__color__e;
  })
}

for(var i = 0; i < size.length; i++){
  
  size[i].addEventListener('click', (e) => {
    shouldPaintImage = false;
    isSelected = false;
    resetSize();

    for(var i = 0; i < emotes.length; i++){
      emotes[i].classList.remove('selected__emote')
      }


      if (currentColor.style.background == "black") {
        context.strokeStyle = "black"
      }

      if (eraser.classList.contains("selected_button")) {
        currentColor.style.background = "white";
      }

    e.target.classList.add("selected__size")
    full.classList.remove("selected_button");
    current__size__e = e.target.innerHTML;
    
    context.lineWidth = current__size__e 
    
    sizeSelected.innerHTML = current__size__e 
  })
  
  size[i].classList.remove("selected__size")
}

eraser.addEventListener('click', () => {
  shouldPaintImage = false;
  isSelected = false;

  for(var i = 0; i < emotes.length; i++){
    emotes[i].classList.remove('selected__emote')
    }

    currentColor.style.background = "white";
  context.strokeStyle = "white";
  resetSize();
  for(var i = 0; i < color.length; i++){
    color[i].classList.remove("selected_a")
  }
  eraser.classList.toggle("selected_button");
  full.classList.remove("selected_button");

})

full.addEventListener('click', () => {
  shouldPaintImage = false;
  isSelected = false;
  resetSize();

  for(var i = 0; i < emotes.length; i++){
    emotes[i].classList.remove('selected__emote')
    }

  for(var i = 0; i < size.length; i++){
    size[i].classList.remove("selected_a")
  }
  full.classList.toggle("selected_button");
  eraser.classList.remove("selected_button");
  context.lineWidth = 4000 
  sizeSelected.innerHTML = 'Full';
  
})







document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(event){
    context.strokeStyle = this.style.backgroundColor
    
  })
})

const clear = document.querySelector(".clear")

clear.addEventListener("click",() => {
  shouldPaintImage = false;
  isSelected = false;

  for(var i = 0; i < emotes.length; i++){
    emotes[i].classList.remove('selected__emote')
    }

  // Use the identity matrix while clearing the canvas
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
})


const saveButton = document.querySelector('.capture');
saveButton.addEventListener('click', () => save(canvas));


function save(canvas) {
  const data = canvas.toDataURL('image/png');
  const anchor = document.createElement('a');
  anchor.href = data;
  anchor.download = 'image.jpg';
  anchor.click();
}


