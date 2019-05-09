import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branch.component.html',
  styleUrls: ['./view-branch.component.scss']
})
export class ViewBranchComponent implements OnInit {
  [x: string]: any;
  sampledata = [{
    'Name': 'ALFKI',
    'Location': 'Lebanon',

  },
    {
      'Name': 'ss',
      'Location': 'Lebanon',


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
      'Name': new FormControl(dataItem.Name),
      'Location': new FormControl(dataItem.Location, Validators.required)
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
