// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { NativeScriptModule, platformNativeScriptDynamic } from "nativescript-angular/platform";
import { NativeScriptDevToolsMonitors } from "ngrx-devtools-nativescript";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';

import { counterReducer } from "./counter.reducer";
import { AppComponent } from "./app.component";


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptDevToolsMonitors,
    StoreModule.provideStore({ counter: counterReducer }),
    StoreDevtoolsModule.instrumentStore()
  ],
  bootstrap: [AppComponent]
})
class AppModule { };

platformNativeScriptDynamic().bootstrapModule(AppModule);
