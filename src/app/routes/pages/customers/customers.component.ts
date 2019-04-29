import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(
    private customerService: CustomerService ,
    private toastr : ToastrService
  ) { }
  customers;
  newItem = {};
  selectedItem ;
  ngOnInit() {
    // this.customerService.getAll().subscribe(result => {
    //   this.customers = result['data'];
    //   console.log("customers",result['data']);
    // })
  }
  create(form : NgForm) {
    if(!form.invalid){
    console.log("create" , this.newItem) ;
    this.customerService.create(this.newItem).subscribe(result => {
      // this.customers.push(result['data']);
      this.newItem = {};
      this.toastr.success("Customer Add") ;
      form.resetForm();
    });
  }
}
}

