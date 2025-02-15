import { TermtextPipe } from './../../core/pipes/termtext.pipe';
import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import {
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CarouselModule,
    FormsModule,
    RouterLink,
    UpperCasePipe,
    LowerCasePipe,
    SlicePipe,
    CurrencyPipe,
    DatePipe,
    JsonPipe,
    SalePipe,
    TermtextPipe,
    SearchPipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  ProductsList: Iproduct[] = [];
  CategoriesList: ICategory[] = [];
  text: string = '';
  gitAllproducts!: Subscription;

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.CategoriesList = res;
        const uniqueCategories = new Map();
        res.forEach((product: Iproduct) => {
          if (!uniqueCategories.has(product.category._id)) {
            uniqueCategories.set(product.category._id, product.category);
          }
        });

        this.CategoriesList = Array.from(uniqueCategories.values());
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    this.gitAllproducts = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.ProductsList = res;
        const uniqueCategories = new Map();
        res.forEach((product: Iproduct) => {
          if (!uniqueCategories.has(product.category._id)) {
            uniqueCategories.set(product.category._id, product.category);
          }
        });

        this.CategoriesList = Array.from(uniqueCategories.values());
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    //unSubscribe observable
    this.gitAllproducts?.unsubscribe();
  }
  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        // this._ToastrService.success(res.message);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
