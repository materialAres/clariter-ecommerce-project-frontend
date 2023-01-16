import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public httpClient: HttpClient) {
    this.loadCustomers();
  }

  private customerId = 0;

  private customers: {
    id: number,
    name: string,
    surname: string
  }[] = [];

  private customer: {
    id: number,
    name: string,
    surname: string
  } = {
    id: 0,
    name: '',
    surname: ''
  };

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

  getCustomer() {
    return this.customer;
  }

  setCustomer(customer: {
    id: number,
    name: string,
    surname: string
  }) {
    this.customer = customer
  }

  getCustomerId() {
    return this.customerId;
  }
}
