import { Component, EventEmitter, Input, Output } from "@angular/core";

interface AppState {
  board: Array<number>;
}

@Component({
  selector: "board",
  templateUrl: "board.component.html"
})
export class BoardComponent {
  @Input() data: Array<number>;
  @Output() action = new EventEmitter<{ row: number, col: number }>();

  positionTap(pos: number, val: number) {
    if (val === 0) {
      const col = pos % 3;
      const row = (pos - col) / 3;

      this.action.next({ row, col });
    }
  }
}
