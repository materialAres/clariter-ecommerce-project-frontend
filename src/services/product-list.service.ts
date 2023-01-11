import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListService implements OnInit {

  constructor(public httpClient: HttpClient) {
    this.loadProducts();

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
  }

  disableButton(id: number) {
    console.log("ID " + id);

    if (id == 0) {
      this.btnIsDisabled = true;
    } else {
      this.btnIsDisabled = false;
    }
   }

  loadProducts(): void {
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

  getProductQtyByName(name: string) {
    for (let product of this.products) {
      if (product.name == name) {
        return product.qty;
      }
    }

    return 'No such product';
  }
}
