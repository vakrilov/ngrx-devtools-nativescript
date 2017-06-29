import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { NSDockMonitor } from './ns-monitors/dock-monitor';
import { NSLogMonitor } from './ns-monitors/log-monitor';
import { LogMonitorEntry } from './ns-monitors/log-monitor-entry';
import { LogMonitorButton } from './ns-monitors/log-monitor-button';

@NgModule({
  declarations: [LogMonitorEntry, LogMonitorButton, NSLogMonitor, NSDockMonitor],
  imports: [NativeScriptModule],
  exports: [NSDockMonitor]
})
export class NativeScriptDevToolsMonitors {
}
