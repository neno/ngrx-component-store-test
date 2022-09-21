import {
  Directive,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { debounceTime, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[intersectionObserver]',
})
export class IntersectionObserverDirective implements AfterViewInit, OnDestroy {
  @Input() root: HTMLElement | null = null;
  @Input() rootMargin = '0px 0px 0px 0px';
  @Input() threshold = 0;
  @Input() debounceTime = 500;
  @Input() isContinuous = true;

  @Output() isIntersecting = new EventEmitter<boolean>();

  _isIntersecting = false;
  subscription!: Subscription;

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.subscription = this.createAndObserve();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createAndObserve() {
    const options: IntersectionObserverInit = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    };

    return new Observable<boolean>((subscriber) => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0];
        subscriber.next(isIntersecting);

        isIntersecting &&
          !this.isContinuous &&
          intersectionObserver.disconnect();
      }, options);

      intersectionObserver.observe(this.element.nativeElement);

      return {
        unsubscribe() {
          intersectionObserver.disconnect();
        },
      };
    })
      .pipe(debounceTime(this.debounceTime))
      .subscribe((status) => {
        this.isIntersecting.emit(status);
        this._isIntersecting = status;
      });
  }
}
