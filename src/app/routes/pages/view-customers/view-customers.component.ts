import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../shared/services/customer.service';
import {PaginatedCustomer} from '../../../core/models/PaginatedCustomer';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.scss']
})
export class ViewCustomersComponent implements OnInit {
  customers: PaginatedCustomer;


  constructor(private customerservive: CustomerService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.customerservive.getAll().subscribe((res) => {
      this.customers = res;
      console.log(this.customers);
    });
  }

  prevPage() {
    this.customerservive.geturl(this.customers.prev_page_url).subscribe((res) => this.customers = res);
  }

  nextPage() {
    this.customerservive.geturl(this.customers.next_page_url).subscribe((res) => this.customers = res);
  }

  delete(id: number) {
    this.customerservive.delete(id).subscribe(res => {
      for (let index = 0; index < this.customers.data.length; index++) {
        const element = this.customers.data[index];
        if (element.id === id) {
          this.customers.data.splice(index, 1);
          break;

        }
      }
      this.toastr.warning('Customer Deleted');

    });
  }
}
