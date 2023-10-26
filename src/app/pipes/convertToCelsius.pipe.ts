import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'convertToCelsius'})
export class ConvertToCelsiusPipe implements PipeTransform {
  transform(value: number): string {
    return ((value - 32) / 1.8).toFixed(0);
  }
}