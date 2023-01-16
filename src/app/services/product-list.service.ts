import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListService implements OnInit {

  constructor(public httpClient: HttpClient) {
    setInterval(() => {
      this.loadProducts();
    }, 30000);
  }

  btnIsDisabled: boolean = true;

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

  async loadProducts() {
    this.products = [];

    /* Suscribe si collega alla chiamata e rimane in attesa, dove poi arriverà la risposta.
    la response rappresenta il risultato in json
    la chiamata get restituisce un oggetto observable. L'oggetto observable ha tra i suoi metodi
    il subscribe */
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
        console.log("THE PRODUCT INSIDE GET", this.products[i]);
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
}
