import {Inject, Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {StoreDevtools} from '@ngrx/devtools';

import {LogEntryItem} from './log-entry-item';
import {LogMonitorEntry} from './log-monitor-entry';
import {LogMonitorButton} from './log-monitor-button';

@Component({
  selector: 'ns-log-monitor',
  directives: [LogMonitorEntry, LogMonitorButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .container {
      background-color: #2A2F3A;
      font-family: monospace;
    }
    
    .toolbar {
      horizontal-align: center;
    }

    .items {
      background-color: #69737D;
      horizontal-align: stretch;
    }
  `],
  template: `
    <grid-layout rows="auto *" class="container">
      <stack-layout orientation="horizontal" class="toolbar">
        <log-monitor-button text="Reset" (action)="handleReset()">
        </log-monitor-button>

        <log-monitor-button text="Revert" (action)="handleRollback()" [disabled]="canRevert$ | async">
        </log-monitor-button>

        <log-monitor-button text="Sweep"(action)="handleSweep()" [disabled]="canSweep$ | async">
        </log-monitor-button>

        <log-monitor-button text="Commit" (action)="handleCommit()" [disabled]="canCommit$ | async">
        </log-monitor-button>
      </stack-layout>
      
      <scroll-view row="1">
        <stack-layout class="items">
          <log-monitor-entry
            *ngFor="let item of (items$ | async); let even = even"
            [even]="even"
            [item]="item"
            (toggle)="handleToggle($event.id)">
          </log-monitor-entry>
        </stack-layout>
      </scroll-view>
    </grid-layout>
  `
})
export class NSLogMonitor{
  private items$: Observable<LogEntryItem[]>;
  private canRevert$: Observable<boolean>;
  private canSweep$: Observable<boolean>;
  private canCommit$: Observable<boolean>;

  constructor(private devtools: StoreDevtools){
    this.canRevert$ = devtools.liftedState.map(s => !(s.computedStates.length > 1));
    this.canSweep$ = devtools.liftedState.map(s => !(s.skippedActionIds.length > 0));
    this.canCommit$ = devtools.liftedState.map(s => !(s.computedStates.length > 1));

    this.items$ = devtools.liftedState
      .map(({ actionsById, skippedActionIds, stagedActionIds, computedStates }) => {
        const actions = [];

        for (let i = 0; i < stagedActionIds.length; i++){
          const actionId = stagedActionIds[i];
          const action = actionsById[actionId].action;
          const { state, error } = computedStates[i];
          let previousState;
          if (i > 0) {
            previousState = computedStates[i - 1].state;
          }

          actions.push({
            key: actionId,
            collapsed: skippedActionIds.indexOf(actionId) > -1,
            action,
            actionId,
            state,
            previousState,
            error
          });
        }

        return actions.slice(1);
      });
  }

  handleToggle(id: number){
    this.devtools.toggleAction(id);
  }

  handleReset(){
    this.devtools.reset();
  }

  handleRollback(){
    this.devtools.rollback();
  }

  handleSweep(){
    this.devtools.sweep();
  }

  handleCommit(){
    this.devtools.commit();
  }
}
