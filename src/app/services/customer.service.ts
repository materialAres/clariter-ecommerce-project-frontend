import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public httpClient: HttpClient) {
    this.loadCustomers();
  }

  customers: {
    id: number,
    name: string,
    surname: string
  }[] = [];

  customer: {
    id: number,
    name: string,
    surname: string
  } = {
    id: 0,
    name: '',
    surname: ''
  };

  public customerId: number = 0;

  loadCustomers(): void {
    this.customers = [];
    this.httpClient.get('http://localhost:8080/customer/all').subscribe((response) => {


      Object.entries(response).forEach(([key, value]) => {
        this.customers.push(value);
      })
    })
  }

  getCustomers() {
    return this.customers;
  }

  setCustomerId(id: number) {
    this.customerId = id;
  }

  setCustomer(customer: {
    id: number,
    name: string,
    surname: string
  }) {
    this.customer = customer
  }
}
