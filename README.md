## Looking for maintainers

This repo is looking for maintainers. If you are interested please ping me on <https://twitter.com/ufsa>

# ngrx-devtools-nativescript

Implementation of a devtools monitor similar to those available in [@ngrx/store-devtools](https://github.com/ngrx/store-devtools) for [NativeScript](https://www.nativescript.org/).

## Install

```sh
npm i ngrx-devtools-nativescript
```

## How to use

First of all you should instrument your @ngrx/store using `StoreModule.provideStore(...)`. Check out [@ngrx/devtools readme](https://github.com/ngrx/devtools/blob/master/README.md) for how to do that.

Import the `NativeScriptDevToolsMonitors` in your app(or other) module and add store-dev-tools instrumentation by importing `StoreDevtoolsModule.instrumentStore()`:

```typescript
import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';
import { NativeScriptDevToolsMonitors } from "ngrx-devtools-nativescript";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptDevToolsMonitors,
    StoreModule.provideStore({ ... }),
    StoreDevtoolsModule.instrumentStore()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule { };

```

Use `<ns-dock-monitor>` component inside you application - preferably in the root of the visual tree.

```typescript
import { NSDockMonitor } from "ngrx-devtools-nativescript";

@Component({
    selector: "my-app",
    directives: [NSDockMonitor],
    template: `
    <grid-layout>
        //...
        <ns-dock-monitor screenCover="0.5"></ns-dock-monitor>
    </grid-layout>`
})
export class AppComponent {
    //...
}
```

You can specify what part of the screen should be covered by the dev-tools slideout with the `screenCover` property.

## Example

Example projects:

* [counter](https://github.com/vakrilov/ngrx-devtools-nativescript/tree/master/examples/counter)
* [tic-tac-toe](https://github.com/vakrilov/ngrx-devtools-nativescript/tree/master/examples/tic-tac-toe)
  
## Pure Redux example with Vanilla JS {N} App

* [reduxDemo](https://github.com/shiv19/nativescript-redux-poc)

## Contributing

* Source files for this tool (as an Angular library) are located: `./projects/ngrx-devtools-nativescript/src/lib`
* Build output will be in: `./dist/ngrx-devtools-nativescript`
* Build commands:

  ```sh
  npm i
  ng build ngrx-devtools-nativescript --prod
  cd dist/ngrx-devtools-nativescript
  npm publish  # or 'npm pack' for a local build
  ```
