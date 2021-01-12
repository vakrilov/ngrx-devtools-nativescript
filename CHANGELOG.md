## 7.0.0 (2021-12-1)

* Upgrade to NativeScript v7!
* Upgrade to Angular 11!
* Using official Angular build system process for libraries based on `ng-packagr` for Angular 9+ compatibility. Generated code is compatible with `Ivy` based Angular projects, as well as backward compatible with `View Engine` based Angular projects.
  https://angular.io/guide/creating-libraries
  * Source files for this tool (as an Angular library) are located: `./projects/ngrx-devtools-nativescript/src/lib`
  * Build output will be in: `./dist/ngrx-devtools-nativescript`
  * Build commands:
    ```sh
    ng build ngrx-devtools-nativescript --prod
    cd dist/ngrx-devtools-nativescript
    npm publish
    ```

## 6.0.1 (2019-08-22)

### Bug Fixes

* items toggled when tapped on log btns ([7dc201b](https://github.com/vakrilov/ngrx-devtools-nativescript/commit/7dc201b))
* prevent ios logs from stacking ([14795de](https://github.com/vakrilov/ngrx-devtools-nativescript/commit/14795de))
