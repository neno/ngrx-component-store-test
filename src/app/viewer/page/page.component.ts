import { UiStore } from './../ui.store';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
  @Input() pageNum!: number;
  @Input() isVisible!: boolean;

  public pageHeight$!: Observable<number>;
  public pageWidth$!: Observable<number>;
  public marginBottom = 20;

  constructor(private readonly uiStore: UiStore) {}

  ngOnInit(): void {
    this.pageHeight$ = this.uiStore.pageHeight$;
    this.pageWidth$ = this.uiStore.pageWidth$;
  }
}
