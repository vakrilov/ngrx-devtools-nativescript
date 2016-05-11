#ngrx-devtools-nativescript
Implementation of a devtools monitor similar to those available in [@ngrx/devtools](https://github.com/ngrx/devtools) for [NativeScript](https://www.nativescript.org/).

## How to use
First of all you should instrument your @ngrx/store using `instrumentStore()`. Check out [@ngrx/devtools readme](https://github.com/ngrx/devtools/blob/master/README.md) for how to do that.

Include `<ns-dock-monitor>` component inside you application - preferably in the root of the visual tree.

```
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

You can specify what part of the screen should be covered by the dev-tools slideout with the `screenCover` proeprty.

## Example
Example projects: 
  * [ns-ngrx-tic-tac-toe](https://github.com/vakrilov/ns-ngrx-tic-tac-toe)