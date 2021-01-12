import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NativeScriptDevToolsMonitors } from 'ngrx-devtools-nativescript';

import { AppComponent } from "./app.component";
import { counterReducer } from "./counter.reducer";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptDevToolsMonitors,
        StoreModule.forRoot({ counter: counterReducer }),
        StoreDevtoolsModule.instrument()
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
