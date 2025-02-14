import { HttpErrorResponse } from '@angular/common/http';
import { OrdersService } from './../../core/services/orders.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);
  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });
  cartId: string | null = '';
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.cartId = p.get('id');
        console.log(this.cartId);
      },
    });
  }

  ordersSubmit() {
    console.log(this.orders.value);
    this._OrdersService.checkOut(this.cartId, this.orders.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          // res.session.url; //url session stripe
          window.open(res.session.url, '_self');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
