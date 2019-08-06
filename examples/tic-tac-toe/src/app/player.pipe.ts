import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'player' })
export class PlayerPipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case 1:
                return "X";
            case -1:
                return "O";
            default:
                return "";
        }
    }
}