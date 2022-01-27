export default class Slider {
    constructor(page, btns) {
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        } 

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        
        try {
            this.hanson.style.opacity = '0';
            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() =>{
                    this.hanson.style.opacity ='1';
                    this.hanson.classList.add('slideInUp');
                },3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e){}
        

        //my version for popup block
        // if (n === 3) {
        //     const popupBlock = document.querySelector('.hanson');
        //     popupBlock.style.display = 'none';
        //     setTimeout(function(){
        //         popupBlock.classList.add('animated', 'fadeIn');
        //         popupBlock.style.display = 'block';

        //     }, 3000);
        // }

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex -1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        // console.log(this.page, this.slides);

        try {
            this.hanson = document.querySelector('.hanson');
        } catch(e) {}
        

        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.showSlides(this.slideIndex);
    }
}
