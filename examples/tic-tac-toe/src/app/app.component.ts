import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { PLAY_O, PLAY_X, RESET, checkWinner } from './board.reducer';

interface AppState {
  board: Array<number>;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnDestroy {
  board$: Observable<Array<number>>;

  currentPlayer: boolean; // ture:X, false:O
  currentPlayerSubscription: Subscription;
  winner: number; // 1:X, -1:O
  winnerSubscription: Subscription;

  constructor(public store: Store<AppState>) {
    this.board$ = store.select(s => s.board);

    this.currentPlayerSubscription = this.board$.pipe(
      map(b => b.reduce((a, b) => a + b, 0) <= 0)
    ).subscribe((val) => this.currentPlayer = val);

    this.winnerSubscription = this.board$.pipe(
      map(checkWinner)
    ).subscribe((val) => this.winner = val);
  }

  ngOnDestroy() {
    this.currentPlayerSubscription.unsubscribe();
    this.winnerSubscription.unsubscribe();
  }

  positionSelected(payload: { row: number, col: number }, player: boolean) {
    if (this.winner) {
      return;
    }

    this.store.dispatch({
      type: player ? PLAY_X : PLAY_O,
      payload: payload
    });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }
}
