import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { INCREMENT, DECREMENT, RESET } from "./counter.reducer";

interface AppState {
  counter: number;
}

@Component({
  selector: "my-app",
  template: `
  <GridLayout rows="auto, auto, *" columns="* auto *">
    <Button text="-" (tap)="decrement()" class="counter-btn" col="0"></Button>
    <Label [text]="counter$ | async" class="counter" col="1"></Label>
    <Button text="+" (tap)="increment()" class="counter-btn" col="2"></Button>

    <Button row="1" colSpan="3" text="reset" (tap)="reset()" class="counter-btn"></Button>

    <ns-dock-monitor screenCover="0.5"></ns-dock-monitor>
  </GridLayout>
`,
})
export class AppComponent {
  counter$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.counter$ = store.select(s => s.counter);
  }

  public increment() {
    this.store.dispatch({ type: INCREMENT });
  }

  public decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  public reset() {
    this.store.dispatch({ type: RESET });
  }
}
