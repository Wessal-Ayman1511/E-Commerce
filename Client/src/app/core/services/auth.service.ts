import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  userData: any = null;
  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }
  setloginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken'));
      console.log('userData', this.userData);
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    //navigate  login
    this._Router.navigate(['/login']);
  }
}

function jwtDecode(arg0: string | null): any {
  throw new Error('Function not implemented.');
}
