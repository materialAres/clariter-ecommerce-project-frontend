import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListService implements OnInit {

  constructor(public httpClient: HttpClient) {
    setInterval(() => {
      this.loadProducts();
    }, 30000);
  }

  private btnIsDisabled = true;

  private products: {
    id: number,
    name: string,
    price: number,
    qty: number,
    imageUrl: string
  }[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  disableButton(id: number) {
    if (id == 0) {
      this.btnIsDisabled = true;
    } else {
      this.btnIsDisabled = false;
    }
   }

  loadProducts() {
    this.products = [];

    this.httpClient.get('http://localhost:8080/product/all').subscribe((response) => {
      Object.entries(response).forEach(([key, value]) => {
        this.products.push(value);
      })
    })

  }

  getProducts() {
    return this.products;
  }

  getProductById(id: number): {
    id: number,
    name: string,
    price: number,
    qty: number,
    imageUrl: string
  } {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return this.products[i];
      }
    }

    throw new Error('This product does not exist.');
  }

  getProductQtyByName(name: string) {
    for (let product of this.products) {
      if (product.name == name) {
        return product.qty;
      }
    }

    throw new Error('This product does not exist.');
  }

  getBtnIsDisabled() {
    return this.btnIsDisabled;
  }
}
