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
  <GridLayout rows="auto, auto, *" columns="* auto *" class="m-t-30 p-t-30">
    <Button text="-" (tap)="decrement()" class="counter-btn" col="0" class="-primary h3"></Button>
    <Label [text]="counter$ | async" class="counter" col="1" class="h1"></Label>
    <Button text="+" (tap)="increment()" class="counter-btn" col="2" class="-primary"></Button>

    <Button row="1" colSpan="3" text="reset" (tap)="reset()" class="counter-btn" class="-outline"></Button>

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
