import { Component, Input, OnChanges, SimpleChanges, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'custom-debug-supporter',
  standalone: true,
  imports: [],
  templateUrl: './debug-supporter.component.html',
  styleUrls: ['./debug-supporter.component.scss'],
})
export class DebugSupporterComponent implements OnChanges, OnDestroy {
  @Input() hostComponent!: any;
  private readonly store = inject(Store);

  // Subscribe Store
  private storeSub: Subscription;

  constructor() {
    // called when NgRx state changed
    this.storeSub = this.store.subscribe((stateSnapshot: unknown) => {
      // export to window
      // >ndeRootState  on dev console
      (window as any).ndeRootState = stateSnapshot;
      (window as any).ndeStore = this.store;

      //console log
      console.log('[debug-supporter] rootState -> window.ndeRootState \n To copy this object to the clipboard, run the following in the developer console ("5" is the depth level and can be any number). \n > copy(JSON.stringify(ndeRootState,null,5))', stateSnapshot);
      console.log('[debug-supporter] Store -> window.ndeStore', this.store);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hostComponent']?.currentValue) {

      (window as any).ndeHostComponent = this.hostComponent;
      //console log
      console.log(
        '[debug-supporter] hostComponent -> window.ndeHostComponent',
        this.hostComponent
      );
    }
  }

 // Subscription release
  ngOnDestroy(): void {
    this.storeSub?.unsubscribe();
  }

}
