import {Directive, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {DataBindingDirective, DataStateChangeEvent, GridComponent} from '@progress/kendo-angular-grid';
import {Subscription} from 'rxjs';
import {CustomerService} from './data.service';

@Directive({
  selector: '[appRemoteBinding]'
})
export class RemoteBindingDirective extends DataBindingDirective implements OnInit, OnDestroy, OnChanges {

  private serviceSubscription: Subscription;

  constructor(private customer: CustomerService, grid: GridComponent) {
    super(grid);
  }

  public ngOnInit(): void {
    this.serviceSubscription = this.customer.subscribe((result) => {
      this.grid.loading = false;
      this.grid.data = result;
      this.notifyDataChange();
    });

    super.ngOnInit();

    this.rebind();
  }

  public ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }

    super.ngOnDestroy();
  }

  public rebind(): void {
    this.grid.loading = true;

    this.customer.query(this.state);
  }
}
