import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UiStore } from './ui.store';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent implements OnInit {
  totalPages$!: Observable<number[]>;
  pageItemHeight$!: Observable<number>;
  zoom$!: Observable<number>;

  constructor(private readonly uiStore: UiStore) {}

  ngOnInit(): void {
    const actualPageHeight = 1176;
    const actualPageWidth = 840;
    const desiredPageHeight = 840;

    this.uiStore.adjustScale({
      actualPageHeight,
      actualPageWidth,
      desiredPageHeight,
    });
    this.totalPages$ = of([...Array(9).keys()].map((n) => n + 1));
    this.pageItemHeight$ = this.uiStore.pageItemHeight$;
    this.zoom$ = this.uiStore.zoom$;
  }

  zoomIn() {
    this.uiStore.zoomIn();
  }

  zoomOut() {
    this.uiStore.zoomOut();
  }

  zoomReset() {
    this.uiStore.zoomReset();
  }
}
