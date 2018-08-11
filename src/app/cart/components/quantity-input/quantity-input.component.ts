import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
    selector: 'app-quantity-input',
    templateUrl: './quantity-input.component.html'
  })
  export class QuantityInputComponent {
      @Output() quantity = new EventEmitter<number>();
      @Input() initialInput: number;
      //_quantity: number = 1;

      quantityOnChange() {
        if (this.initialInput >= 1) {
          this.quantity.emit(this.initialInput);
        } else {
          this.quantity.emit(null);
          return;
        }
      }
    
      incrementQuantity() {
        this.initialInput++;
        this.quantity.emit(this.initialInput);
      }
    
      decrementQuantity() {
        if (this.initialInput > 1) {
          this.initialInput--;
          this.quantity.emit(this.initialInput);
        } 
        return;
      }
  }