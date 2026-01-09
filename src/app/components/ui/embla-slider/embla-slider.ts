import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import EmblaCarousel from 'embla-carousel';

@Component({
  selector: 'embla-slider',
  imports: [],
  templateUrl: './embla-slider.html',
  styleUrl: './embla-slider.scss',
})
export class EmblaSlider {
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  
  @Output() selectedItemIndex = new EventEmitter<number>();

  @ViewChild('emblaContainer', { static: true }) emblaRef!: ElementRef<HTMLDivElement>;
  embla!: ReturnType<typeof EmblaCarousel>;

  ngAfterViewInit() {
    this.embla = EmblaCarousel(this.emblaRef.nativeElement, {
      align: 'start',
      loop: false,
      axis: this.direction === 'horizontal' ? 'x' : 'y',
    });

    this.embla.on('select', () => {
      const index = this.embla.selectedScrollSnap();
      this.selectedItemIndex.emit(index);
    });
  }

  get containerClasses(): string {
    return this.direction === 'horizontal' 
      ? 'embla__container embla__container--horizontal' 
      : 'embla__container embla__container--vertical';
  }

  get emblaClasses(): string {
    return this.direction === 'horizontal' 
      ? 'embla embla--horizontal' 
      : 'embla embla--vertical';
  }
}
