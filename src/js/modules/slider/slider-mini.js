import Slider from "./slider"; 

export default class MiniSlider extends Slider {
    constructor(container, prev, next, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
// ____________________________MY try__________________

        const array = Array.from(this.slides);
        const slidesArr = array.filter(slide => slide.tagName !== 'BUTTON');
        for (let i = 0; i < slidesArr.length; i++) {
            if (slidesArr[i].tagName !== 'BUTTON') {
                let active = slidesArr[i];
                this.container.insertBefore(active,slidesArr[slidesArr.length - 1]);
                this.decorizeSlides();
                break;
            } 
        }
    }

    prevSlide() {
        for (let i = this.slides.length - 1; i > 0; i--) {
            if (this.slides[i].tagName !== 'BUTTON') {
                let active = this.slides[i];
                this.container.insertBefore(active, this.slides[0]);
                this.decorizeSlides();
                break;
            }
        }
    }

    stopAutoplay(id, next, prev) {
        const arr = [...[next], ...[prev]];
        arr.forEach(btn => {
            btn.addEventListener('mouseover', () => {
                clearInterval(id);
            });
            btn.addEventListener('mouseout', () => {
                id = setInterval(() => this.nextSlide(),5000);
            });
        });
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());
        this.prev.addEventListener('click', () => this.prevSlide());
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            let autoSlide = 0;
            clearInterval(autoSlide);
            autoSlide = setInterval(() => this.nextSlide(),5000);
            this.stopAutoplay(autoSlide, this.next, this.prev);
        }
    }
}
