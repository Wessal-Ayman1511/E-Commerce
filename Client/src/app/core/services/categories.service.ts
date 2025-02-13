import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _HttpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }
  getSpecificCategory(id: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/categories/${id}`
    );
  }
}
