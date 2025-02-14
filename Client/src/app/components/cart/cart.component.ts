import { ICart } from './../../core/interfaces/icart';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  cartDetails: ICart = {} as ICart;
  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  removeFromCart(id: string): void {
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        // remove -- response specific product from cart
        this.cartDetails = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  updateCount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateSpecificCartItem(id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.cartDetails = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    }
  }

  cleaAllCart(): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.cartDetails = {} as ICart;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
