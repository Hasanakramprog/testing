import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent implements OnInit {
  [x: string]: any;
  sampledata = [{
    'Name': 'ALFKI',
    'quantity': '22',
    'Category': 'Maria Anders',
    'description': 'Sales Representative'
  },
    {
      'Name': 'ss',
      'quantity': '23',
      'Category': 'Maria Anders',
      'description': 'Sales Representative'

    }
  ];
  public gridData: any[] = this.sampledata;

  constructor() {
  }

  ngOnInit() {
  }
  editHandler({sender, rowIndex, dataItem}) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'id': new FormControl(dataItem.id),
      'quantity': new FormControl(dataItem.quantity, Validators.required),
      'Category': new FormControl(dataItem.Category, Validators.required),
      'description': new FormControl(dataItem.description, Validators.required),
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
      for (let index = 0; index < this.gridData.length; index++) {
        const element = this.gridData[index];
        if (element.id === dataItem.id) {
          this.gridData.splice(index, 1);
          break;

        }
      }

    });
    console.log(dataItem.id);
  }

  saveHandler({sender, rowIndex, formGroup}) {
    const customer = formGroup.value;

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
}
