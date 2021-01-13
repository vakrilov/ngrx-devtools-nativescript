import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Page, View} from '@nativescript/core';

const TOGGLE_BTN_HEIGHT = 40;

@Component({
  selector: 'ns-dock-monitor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .toggle {
        color: white;
        border-radius:` + TOGGLE_BTN_HEIGHT / 2 + `;
        border-width: 2;
        border-color: #69737D;
        background-color: #2A2F3A;
        text-align: center;
        font-family: monospace;
        font-size: 32;
        font-weight: bold;
    }
    .dock {
        vertical-align: top;
    }
  `],
  template: `
    <grid-layout rows="auto *" #dock class="dock" rowSpan="100" colSpan="100" translateY="1000" (loaded)="dockLoaded($event)">
      <label text="^" (tap)="toggleShown()" #toggle [width]="toggleLength" [height]="toggleLength" class="toggle"></label>
      <grid-layout row="1">
        <ns-log-monitor></ns-log-monitor>
      </grid-layout>
    </grid-layout>
  `
})
export class NSDockMonitor implements AfterViewInit {
  @Input() screenCover: number = 0.5;
  @ViewChild("toggle", { static: false }) toggleBtnEl: ElementRef;
  @ViewChild("dock", { static: false }) dockEl: ElementRef;

  private shown: boolean = false;
  toggleLength: number = TOGGLE_BTN_HEIGHT;
  toggleBtn: View;
  dock: View;

  private offsetShown: number;
  private offsetHidden: number;

  constructor(private page: Page) {
  }

  ngAfterViewInit() {
    this.toggleBtn = <View>this.toggleBtnEl.nativeElement;
  }

  dockLoaded(args) {
    this.dock = <View>args.object;
    setTimeout(() => this.setup(), 100);
  }

  private setup() {
    const height = this.dock.getActualSize().height;
    console.log("Dock height: " + height);
    this.offsetHidden = height - this.toggleLength;
    this.offsetShown = height * this.screenCover - this.toggleLength;

    this.dock.height = this.offsetHidden - this.offsetShown + this.toggleLength;
    this.dock.animate({ translate: { x: 0, y: this.offsetHidden } });
  }

  toggleShown() {
    this.shown = !this.shown;
    if (this.shown) {
      this.toggleBtn.animate({ rotate: 180 });
      this.dock.animate({ translate: { x: 0, y: this.offsetShown } });
    } else {
      this.toggleBtn.animate({ rotate: 0 });
      this.dock.animate({ translate: { x: 0, y: this.offsetHidden } });
    }
  }
}
