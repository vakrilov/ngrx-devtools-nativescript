import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { LogEntryItem } from './log-entry-item';
import { isIOS } from '@nativescript/core';

let logSuffixCount = 0;

@Component({
  selector: 'log-monitor-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <grid-layout columns="* auto" class="container" [class.even]="even">
      <grid-layout (tap)="handleToggle()">
        <label [text]="item.action.type"
              class="title-bar"
              [class.collapsed]="item.collapsed"></label>
      </grid-layout>

      <stack-layout col="1" *ngIf="!item.collapsed" orientation="horizontal">
        <log-monitor-button (action)="logPayload()" text="Log Payload">
        </log-monitor-button>

        <log-monitor-button (action)="logState()" text="Log State">
        </log-monitor-button>
      </stack-layout>
    </grid-layout>
  `,
  styles: [`
    .container {
      horizontal-align: stretch;
      height: 32;
    }
    .title-bar {
      text-align: left;
      horizontal-align: stretch;
      vertical-align: center;
      margin: 6 10;
      font-family: monosapce;
      color: #FFFFFF;
      font-size: 12;
      font-weight: bold;
    }
    .collapsed{
      text-decoration: line-through;
      font-style: italic;
      opacity: 0.5;
    }
    .even {
      background-color: #7A8590;
    }
  `]
})
export class LogMonitorEntry {
  @Input() item: LogEntryItem;
  @Input() even: boolean;
  @Output() toggle = new EventEmitter();

  handleToggle() {
    this.toggle.next({ id: this.item.actionId });
  }

  logPayload() {
    console.log("ACTION: " + JSON.stringify(this.item.action) + this.logSuffix());
  }

  logState() {
    console.log("STATE: " + JSON.stringify(this.item.state) + this.logSuffix());
  }

  private logSuffix(): string {
    // IOS console stacks same messages. Add an " " suffix on every second message to prevent that.
    if (isIOS) {
      return (logSuffixCount++ % 2) ? "" : " ";
    } else {
      return "";
    }
  }
}
