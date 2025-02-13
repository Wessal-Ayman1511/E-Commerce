import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  ProductsList: Iproduct[] = [];
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.ProductsList = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
