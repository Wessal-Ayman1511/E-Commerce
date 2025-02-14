import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // logic api ---> htttpClaint
  constructor(private _HttpClient: HttpClient) {}
  myHeader: any = {
    token: localStorage.getItem('userToken'),
  };
  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/cart `,
      {
        // body
        productId: id,
      },
      { headers: this.myHeader }
    );
  }

  getProductsCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.myHeader,
    });
  }

  deleteSpecificCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      headers: this.myHeader,
    });
  }

  updateSpecificCartItem(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/cart/${id}`,
      {
        count: newCount,
      },
      { headers: this.myHeader }
    );
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.myHeader,
    });
  }
}
