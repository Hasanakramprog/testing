import {Component, OnInit} from '@angular/core';
import {CustomerService} from 'src/app/shared/services/customer.service';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  updateflag = false;
  customers;
  id;
  newItem = {};
  selectedItem;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.customerService.getbyid(this.id).subscribe((res) =>
        this.newItem = res['data']);
      this.updateflag = true;
    }
  }

  create(form: NgForm) {
    if (!form.invalid) {
      console.log('create', this.newItem);
      if (!this.updateflag) {
        this.customerService.create(this.newItem).subscribe(result => {
          // this.customers.push(result['data']);
          this.newItem = {};
          this.toastr.success('Customer Add');
          form.resetForm();
        });
      } else {
        this.customerService.update(this.id, this.newItem).subscribe(() => {
          this.toastr.success('Updated ');
         this.router.navigate(['/customers/view']);
        });
      }
    }
  }
}

