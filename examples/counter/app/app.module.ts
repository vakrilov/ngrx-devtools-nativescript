// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
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
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule { };

platformNativeScriptDynamic().bootstrapModule(AppModule);
