import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../../../shared/services/customer.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RemoteBindingDirective} from '../directives/remote-binding.directive';
import {CompositeFilterDescriptor} from '@progress/kendo-data-query/dist/npm/filtering/filter-descriptor.interface';

const flatten = filter => {
  const filters = filter.filters;
  if (filters) {
    return filters.reduce((acc, curr) => acc.concat(curr.filters ? flatten(curr) : [curr]), []);
  }
  return [];
};
@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.scss']
})
export class ViewCustomersComponent implements OnInit {
  [x: string]: any;

  @ViewChild(RemoteBindingDirective) public bindingDirective: RemoteBindingDirective;
  formGroup: any;
  public filter: CompositeFilterDescriptor;
  constructor(private customerservice: CustomerService, private router: Router, private toasr: ToastrService) {

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
      this.bindingDirective.rebind();
      this.toasr.warning('Deleted');
    });
    console.log(dataItem.id);
  }

  saveHandler({sender, rowIndex, formGroup}) {
    if (formGroup.valid) {
      const customer = formGroup.value;
      this.customerservice.update(customer.id, customer).subscribe(() => {
        this.bindingDirective.rebind();
        this.toasr.success('Edited');
      });
    }
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
  }

  addnew() {
    this.router.navigate(['/pages/customer/add']).then();
  }

  edit(data) {
    this.router.navigate(['/pages/customer/add', {id: data.id}]).then();
  }
}
