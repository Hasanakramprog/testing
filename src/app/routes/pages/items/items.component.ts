import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  newItem = {};
  private updateflag = false;

  constructor() {
  }

  ngOnInit() {
  }

  create(form: NgForm) {
    if (!form.invalid) {
      console.log('create', this.newItem);


    }
  }
}

