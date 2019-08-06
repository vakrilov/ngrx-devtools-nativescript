import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptDevToolsMonitors } from "ngrx-devtools-nativescript";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { StoreModule } from '@ngrx/store';

import { counterReducer } from "./counter.reducer";
import { AppComponent } from "./app.component";


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptDevToolsMonitors,
    StoreModule.forRoot({ counter: counterReducer }),
    StoreDevtoolsModule.instrument()
  ],
  declarations: [AppComponent],
  providers: [],
  schemas: [
      NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };

