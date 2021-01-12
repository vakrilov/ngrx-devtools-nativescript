import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NativeScriptDevToolsMonitors } from "ngrx-devtools-nativescript";

import { AppComponent } from "./app.component";
import { boardReducer } from './board.reducer';
import { logger } from './logger.metareducer';
import { BoardComponent } from './board.component';
import { PlayerPipe } from './player.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent, PlayerPipe],
  imports: [
    NativeScriptModule,
    NativeScriptDevToolsMonitors,
    StoreModule.forRoot({ board: logger(boardReducer) }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  schemas: [
      NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
