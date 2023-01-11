import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddedToCartToastService {

  constructor() { }

  show = false;

  showToast() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 1000);
  }
}
