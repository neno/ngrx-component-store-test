import { AfterContentInit, AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, of, BehaviorSubject, combineLatest, map } from 'rxjs';
import { PageComponent } from './page/page.component';
import { UiStore } from './ui.store';

interface IPageItem {
  pageNum: number,
  isVisible: boolean
}

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent
  implements OnInit, AfterContentInit, AfterViewInit
{
  allPages$!: Observable<IPageItem[]>;
  totalPages$!: Observable<number[]>;
  visiblePagesSubject = new BehaviorSubject<number[]>([]);

  totalPages!: number[];
  pageItemHeight$!: Observable<number>;
  zoom$!: Observable<number>;

  // @ContentChildren(PageComponent) pages: QueryList<PageComponent> | undefined
  @ViewChildren(PageComponent) pages!: QueryList<PageComponent> | undefined;

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

    this.totalPages = Array.from({ length: 9 }).map((_, n) => n + 1);
    this.totalPages$ = of(this.totalPages)
    this.allPages$ = combineLatest([this.totalPages$, this.visiblePagesSubject]).pipe(
      map(([totalPages, visiblePages]) => totalPages.map((n) => ({pageNum: n, isVisible: visiblePages.includes(n)})))
    )

    this.pageItemHeight$ = this.uiStore.pageItemHeight$;
    this.zoom$ = this.uiStore.zoom$;
  }

  ngAfterContentInit(): void {
    // console.log(this.page);
    // if (this.page) {
    // }
    // if (this.pages) {
    //   console.log('pages', this.pages);
    // }
  }

  ngAfterViewInit(): void {
    console.log(this.pages?.toArray());
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

  trackByIndex(index: number) {
    return index;
  }

  isIntersecting(isVisible: boolean, pageNum: number) {

    if (isVisible) {
      if (!this.visiblePagesSubject.value.includes(pageNum)) {
        this.visiblePagesSubject.next([...this.visiblePagesSubject.value, pageNum])
      }
    } else {
      this.visiblePagesSubject.next(this.visiblePagesSubject.value.filter(n => n !== pageNum))
    }

    console.log('Element #' + pageNum + ' is intersecting ' + isVisible);
  }
}
