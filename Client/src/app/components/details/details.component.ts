import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

  detailsProduct: Iproduct | null = null;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');
        //logic api   call api Specific product => getSpecificProducts
        this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            console.log(res);
            this.detailsProduct = res;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
      },
    });
  }
}
