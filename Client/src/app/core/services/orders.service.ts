import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _HttpClient: HttpClient) {}
  myHeaders: any = {
    token: localStorage.getItem('userToken'),
  };
  checkOut(idCart: string | null, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${idCart}?url=${environment.UrlServer}`,
      {
        shippingAddress: shippingDetails,
      },
      {
        headers: this.myHeaders,
      }
    );
  }
}
