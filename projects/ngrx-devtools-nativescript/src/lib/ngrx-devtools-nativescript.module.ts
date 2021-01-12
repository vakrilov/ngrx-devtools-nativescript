import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { NSDockMonitor } from './ns-monitors/dock-monitor';
import { NSLogMonitor } from './ns-monitors/log-monitor';
import { LogMonitorEntry } from './ns-monitors/log-monitor-entry';
import { LogMonitorButton } from './ns-monitors/log-monitor-button';

@NgModule({
  declarations: [LogMonitorEntry, LogMonitorButton, NSLogMonitor, NSDockMonitor],
  imports: [NativeScriptModule],
  exports: [NSDockMonitor],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativeScriptDevToolsMonitors {
}
