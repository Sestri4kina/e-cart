import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from './currency-format/currency-format.pipe';
import { PriceFormatPipe } from './price-format/price-format.pipe';

@NgModule({
  imports: [ 
    CommonModule,
    ],
  exports: [
    CurrencyFormatPipe,
    PriceFormatPipe
  ],
  declarations: [ 
    CurrencyFormatPipe,
    PriceFormatPipe
 ],
})

export class PipeModule {}