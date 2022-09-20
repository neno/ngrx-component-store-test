import { UiStore } from './../ui.store';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  private pageNumSubject = new BehaviorSubject<number | null>(null);

  public pageNum$ = this.pageNumSubject.asObservable();
  public pageHeight$!: Observable<number>;
  public pageWidth$!: Observable<number>;
  // public scale = 1.4;
  // public initialHeight = 840;
  // public initialWidth = 600;
  // public pageHeight = this.initialHeight;
  // public pageWidth = this.pageHeight / this.scale;
  // public pageHeight = 1159;
  // public pageWidth = 820;
  public marginBottom = 20;

  @Input()
  set pageNum(value: number) {
    this.pageNumSubject.next(value);
  }

  constructor(private readonly uiStore: UiStore) {}

  ngOnInit(): void {
    this.pageHeight$ = this.uiStore.pageHeight$
    this.pageWidth$ = this.uiStore.pageWidth$;
  }
}
