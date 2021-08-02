import gsap from 'gsap'

export default class Scroll {
  constructor() {

    this.scroll = null
    this.speed = 0
    this.disabled = true

    window.addEventListener('wheel', (e) => {
      if (!this.disabled && window.innerWidth > 576) {
        this.speed += e.deltaY * 0.1
      }
    })

  }

  animate(){
    window.scrollTo({
      top: window.scrollY + this.speed,
    });

    if(window.scrollY + window.innerHeight < document.body.scrollHeight && window.scrollY > 0){
      gsap.to('#aside', {
        y: '-=' + this.speed,
        ease:  'power4.out'
      })
    }

    if (this.speed < 0.1 && this.speed > -0.1) {
      this.speed = 0;
    } else {
      this.speed *= 0.95;
    }
  }

}
