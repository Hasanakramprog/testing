import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  private newItem = {};

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
