import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  HostListener,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'log-monitor-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  template: `
  <label [text]="text" (tap)="handleAction()" [class.disabled]="disabled"></label>`,
  styles: [`
     label {
      font-family: monospace;
      font-weight: bold;
      border-radius: 3;
      margin: 5 3;
      padding: 3 5;
      font-size: 10;
      color: white;
      background-color: #4F5A65;
    }

    .disabled{
      opacity: 0.2;
      background-color: transparent;
    }
  `]
})
export class LogMonitorButton{
  @Input() disabled: boolean;
  @Output() action = new EventEmitter();
  @Input() text = "";

  handleAction(){
    if(!this.disabled){
      this.action.next({});
    }
  }
}
