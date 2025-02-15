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
      `${environment.baseUrl}/cart/add`,
      {
        // body
        productId: id,
        quantity: 2,
      },
      { headers: this.myHeader }
    );
  }

  getProductsCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/cart/view`, {
      headers: this.myHeader,
    });
  }

  deleteSpecificCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/cart/delete/${id}`, {
      headers: this.myHeader,
    });
  }

  updateSpecificCartItem(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/cart/update/${id}`,
      {
        count: newCount,
      },
      { headers: this.myHeader }
    );
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/cart/clearcart`, {
      headers: this.myHeader,
    });
  }
}
