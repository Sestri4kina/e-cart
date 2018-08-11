import { Pipe, PipeTransform } from '@angular/core';

export const currencies = {
  'USD': '$',
  'EUR': '€'
}

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(currency: string): string {
    return currencies[currency];
  }

}
