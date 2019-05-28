import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/app/shared/services/category.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NodeClickEvent, TreeItem} from '@progress/kendo-angular-treeview';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(private categoryservice: CategoryService, private toastr: ToastrService) {
  }

  items;
  newItem = {};
  selectedItem;
  parentid;


  flag = false;

  ngOnInit() {
    this.getcategories();
  }

  private getcategories() {
    this.categoryservice.getAll().subscribe(
      (data) => {
        this.items = data;
        console.log(this.items);
      }
    );
  }



  create(form: NgForm) {
    // console.log('create', this.newItem);
    if (form.valid) {
      const item = {
        // @ts-ignore
        name: this.newItem.name,
        parentid: this.parentid
      };
      this.categoryservice.create(item).subscribe(result => {
        // @ts-ignore
        if (result.parentid == null) {
          this.items.push(result);
        } else {
          this.onchildpush(this.items, result);
        }
        this.newItem = {};
        this.getcategories();
        this.toastr.success('Plan Created');
        this.flag = false;
        form.resetForm();
      });
    }
  }



  update(form: NgForm) {
    if (form.valid) {
      this.categoryservice.update(this.selectedItem.id, this.selectedItem).subscribe(result => {
        this.toastr.success('Category Updated');
        this.getcategories();
      });
    }
  }

  delete() {
    this.categoryservice.delete(this.selectedItem.id).subscribe(result => {

      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        if (element.id === this.selectedItem.id) {
          this.items.splice(index, 1);
          this.selectedItem = null;
          break;

        }
      }
      this.getcategories();
      this.toastr.success('Category Deleted');

    });

  }

  onchildpush(items, result) {
    items.filter((item) => {
      if (item.id == result.parentid) {
        item.children.push(result);
        return;
      }
      if (item.children) {
        return this.onchildpush(item.children, result);
      }
    });

  }

  handleSelection($event: TreeItem) {
    const item = $event.dataItem;
    console.log(item.id);
    this.selectedItem = item;
    this.parentid = this.selectedItem.id;
    this.flag = false;
  }

  handleDblClick($event: NodeClickEvent) {
    this.flag = true;
  }
}
