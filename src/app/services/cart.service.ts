import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { OrdersService } from './orders.service';
import { ProductListService } from './product-list.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    public customerService: CustomerService,
    public productListService: ProductListService
    ) { }

  private cart: {
    id: number,
    name: string,
    price: number,
    qty: number,
    imageUrl: string
  }[] = [];

  getCart() {
    return this.cart;
  }

  addToCart(product: {
    id: number,
    name: string,
    price: number,
    qty: number,
    imageUrl: string
  }) {
    let productForCart: {
      id: number,
      name: string,
      price: number,
      qty: number,
      imageUrl: string
    } = {
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      imageUrl: product.imageUrl
    }

    for (let index = 0; index < this.cart.length; index++) {
      if (this.cart[index].id == productForCart.id) {
          this.addQuantity(this.cart[index].id);
          return;
      }
    }
    this.cart.push(productForCart);
  }

  removeProduct(id: number) {
    for (let index = 0; index < this.cart.length; index++) {
      if (this.cart[index].id == id) {
        this.cart.splice(index, 1);
        break;
      }
    }
  }

  addQuantity(id: number) {
    for (let index = 0; index < this.cart.length; index++) {
      if (this.cart[index].id == id) {
        if (this.cart[index].qty >= this.productListService.getProductQtyByName(this.cart[index].name)) {
          alert("We don't have other similar products in stock, sorry");
          return;
        } else {
          this.cart[index].qty += 1;
        }
      }
    }
  }

  subtractQuantity(id: number) {
    for (let index = 0; index < this.cart.length; index++) {
      if (this.cart[index].id == id) {
        if (this.cart[index].qty > 1) {
          this.cart[index].qty -= 1;
        } else {
          // aggiungere alert
          this.removeProduct(id);
        }
      }
    }
  }

  // reset cart con event emitter, in modo che si aggiorni quando l'id cambia
  resetCart() {
    // if id cambia
    this.cart = [];
  }
}
