import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../shared/services/customer.service';
import {PaginatedCustomer} from '../../../core/models/PaginatedCustomer';
import {ToastrService} from 'ngx-toastr';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {IntlService} from '@progress/kendo-angular-intl';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.scss']
})
export class ViewCustomersComponent implements OnInit {
  [x: string]: any;

  public pageSize = 1;
  public skip = 0;
  title = 'kindo';
  customers;
  formGroup: any;
  loading = true;
  public gridView: GridDataResult;
  constructor(private customerservice: CustomerService, private intl: IntlService, private router: Router, private toasr: ToastrService) {

  }

  editHandler({sender, rowIndex, dataItem}) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'id': new FormControl(dataItem.id),
      'name': new FormControl(dataItem.name, Validators.required),
      'father_name': new FormControl(dataItem.father_name, Validators.required),
      'enrollment_place': new FormControl(dataItem.enrollment_place, Validators.required),
      'enrollment_number': new FormControl(dataItem.enrollment_number, Validators.required),
      'mother_name': new FormControl(dataItem.mother_name, Validators.required),
    });


    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  cancelHandler({sender, rowIndex}) {
    // close the editor for the given row
    sender.closeRow(rowIndex);

  }

  removeHandler({dataItem}) {
    // this.editService.remove(dataItem);
    this.customerservice.delete(dataItem.id).subscribe(() => {
      for (let index = 0; index < this.customers.length; index++) {
        const element = this.customers[index];
        if (element.id === dataItem.id) {
          this.customers.splice(index, 1);
          break;

        }
      }

    });
    console.log(dataItem.id);
  }

  saveHandler({sender, rowIndex, formGroup}) {
    const customer = formGroup.value;
    this.customerservice.update(customer.id, customer).subscribe(() =>
      this.customerservice.getAll().subscribe((res) => {

        this.customers = res;
      }));

    this.toasr.success('Edited');

    // close the editor, that is, revert the row back into view mode
    sender.closeRow(rowIndex);

  }

  addHandler({sender}) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl('', Validators.required),
    });

    sender.addRow(this.formGroup);

  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  ngOnInit(): void {
    this.customerservice.getAll().subscribe((res) => {
      this.customers = res;
      this.loadCustomer();
      this.loading = false;
    });
  }


  edit(data) {
    this.router.navigate(['/pages/customer/add', {id: data.id}]).then();
  }


  protected pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadCustomer();
  }

  private loadCustomer(): void {
    this.gridView = {
      data: this.customers.slice(this.skip, this.skip + this.pageSize),
      total: this.customers.length
    };
  }
}
