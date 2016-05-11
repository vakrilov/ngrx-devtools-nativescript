import {Inject, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {View} from "ui/core/view";
import {screen} from "platform";
import {NSLogMonitor } from "./log-monitor"
import {device, platformNames} from "platform";

const isIOS = device.os === platformNames.ios;
const TOGGLE_BTN_HEIGHT = 40;
const STATUS_BAR_HEIGHT = isIOS ? 22 : 25;
const SOFT_BUTTON_HEIGHT = isIOS ? 0 : 55;

@Component({
    selector: 'ns-dock-monitor',
    directives: [NSLogMonitor],
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
    <grid-layout rows="auto *" #dock class="dock" rowSpan="100" colSpan="100">
      <label text="^" (tap)="toggleShown()" #toggle [width]="toggleLength" [height]="toggleLength" class="toggle"></label>
      <grid-layout row="1">
        <ns-log-monitor></ns-log-monitor>
      </grid-layout>
    </grid-layout>
  `
})
export class NSDockMonitor implements AfterViewInit {
    @Input() screenCover: number = 0.5;
    @ViewChild("toggle") toggleBtnEl: ElementRef;
    @ViewChild("dock") dockEl: ElementRef;

    private shown: boolean = false;
    toggleLength: number = TOGGLE_BTN_HEIGHT;
    toggleBtn: View;
    dock: View;

    private offsetShown: number;
    private offsetHidden: number;

    constructor() {
        var height = screen.mainScreen.heightDIPs - STATUS_BAR_HEIGHT - SOFT_BUTTON_HEIGHT;
        this.offsetHidden = height - this.toggleLength;
        this.offsetShown = height * this.screenCover - this.toggleLength;
    }

    ngAfterViewInit() {
        this.toggleBtn = <View>this.toggleBtnEl.nativeElement;
        this.dock = <View>this.dockEl.nativeElement;

        this.dock.translateY = this.offsetHidden;
        this.dock.height = this.offsetHidden - this.offsetShown + this.toggleLength;
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
