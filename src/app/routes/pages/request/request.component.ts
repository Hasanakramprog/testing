import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
  }

  listBorrower;
  id;
  newItem = {};
  // tslint:disable-next-line:max-line-length
  listPaymentType: Array<string> = ['Cash', 'Cheque', 'Wire Transfer', 'Online Transfer'];
  listLoanStatus: Array<string> = ['Processing', 'Open', 'Defaulted', 'Denied', 'Pending'];
  listRepaymentCycle: Array<string> = ['Monthly', 'Weekly', 'Bimonthly', 'Biweekly', 'Semi-Annual', 'Yearly', 'Quarterly'];
  filter: any;
  loanReleaseDate: Date;
  uploadSaveUrl: any;
  uploadRemoveUrl: any;
  listItems: any;

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  create(form: NgForm) {
    if (form.valid) {
      console.log('create', this.newItem);
    }
  }

  handleFilterBorrower($event: any) {
    //
  }

  handleFilterItem($event: any) {
    //
  }

}
