import { Component } from '@angular/core';
import { ProductListService } from './services/product-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private productListService: ProductListService) {
    this.productListService.loadProducts();
  }

}
