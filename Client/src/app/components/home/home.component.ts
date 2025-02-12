import { ProductsService } from './../../core/services/products.service';
import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe(
      (res) => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
