import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface UiState {
  zoom: number;
  zoomStep: number;
  zoomMin: number;
  zoomMax: number;
  scale: number;
  pageMargin: 20;
  pageHeight: number;
  pageWidth: number;
}

@Injectable()
export class UiStore extends ComponentStore<UiState> {
  constructor() {
    super({
      zoom: 1,
      zoomStep: 0.1,
      zoomMin: 0.5,
      zoomMax: 2,
      pageMargin: 20,
      scale: 1,
      pageHeight: 0,
      pageWidth: 0,
    });
  }

  readonly adjustScale = this.updater((state, {actualPageHeight, actualPageWidth, desiredPageHeight}: { actualPageHeight: number, actualPageWidth: number, desiredPageHeight: number; }) => {
    const ratio = actualPageHeight / actualPageWidth;
    const scale = desiredPageHeight / actualPageHeight;
    const pageHeight = desiredPageHeight
    const pageWidth = Math.floor(desiredPageHeight / ratio)
    return {
      ...state,
      scale,
      pageHeight,
      pageWidth
    }
  })

  readonly zoom$ = this.select(({ zoom }) => zoom);

  readonly zoomIn = this.updater((state) => {
    if (state.zoom < state.zoomMax) {
      return {
        ...state,
        zoom: state.zoom + state.zoomStep,
      };
    }
    return state;
  });

  readonly zoomOut = this.updater((state) => {
    if (state.zoom > state.zoomMin) {
      return {
        ...state,
        zoom: state.zoom - state.zoomStep,
      };
    }
    return state;
  });

  readonly zoomReset = this.updater((state) => {
    return {
      ...state,
      zoom: 1,
    };
  });

  readonly pageHeight$ = this.select(({ pageHeight, zoom }) =>
    Math.floor(pageHeight * zoom)
  );

  readonly pageWidth$ = this.select(({ pageWidth, zoom }) =>
    Math.floor(pageWidth * zoom)
  );

  readonly pageItemHeight$ = this.select(
    this.state$,
    this.pageHeight$,
    ({ pageMargin }, pageHeight) => {
      return pageHeight + pageMargin;
    }
  );
}
