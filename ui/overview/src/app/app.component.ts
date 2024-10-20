import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  currentCarouselIndex = 0;
  showGetStarted = false;
  ngOnInit() {
    this.startCarousel();
  }

  startCarousel() {
    const slides = document.querySelectorAll('.carousel-item');
    const setSlideStyle = (slide: HTMLElement, left: string, transition: string = 'all 0.5s') => {
        slide.style.transition = transition;
        slide.style.left = left;
    };

    setSlideStyle(slides[this.currentCarouselIndex] as HTMLElement, '0');

    setInterval(() => {
        const currentSlide = this.currentCarouselIndex;
        const nextSlide = (currentSlide + 1) % slides.length;

        setSlideStyle(slides[currentSlide] as HTMLElement, '-100%');
        
        setTimeout(() => {
            setSlideStyle(slides[currentSlide] as HTMLElement, '100%', 'none');
            setTimeout(() => {
                setSlideStyle(slides[currentSlide] as HTMLElement, '100%');
            }, 100);
        }, 500);

        setSlideStyle(slides[nextSlide] as HTMLElement, '0');
        this.currentCarouselIndex = nextSlide;
    }, 3000);

  }
  getStarted(){
    this.showGetStarted = !this.showGetStarted;
  }
}
