import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
    selector: 'app-quantity-input',
    templateUrl: './quantity-input.component.html'
  })
  export class QuantityInputComponent {
      @Output() quantity = new EventEmitter<number>();
      @Input() initialQuantity: number;

      quantityOnChange() {
        if (this.initialQuantity >= 1) {
          this.quantity.emit(this.initialQuantity);
        } else {
          this.quantity.emit(null);
          return;
        }
      }
    
      incrementQuantity() {
        this.initialQuantity++;
        this.quantity.emit(this.initialQuantity);
      }
    
      decrementQuantity() {
        if (this.initialQuantity > 1) {
          this.initialQuantity--;
          this.quantity.emit(this.initialQuantity);
        } 
        return;
      }
  }