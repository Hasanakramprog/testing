import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BehaviorSubject<GridDataResult> {
  public loading: boolean;

  private BASE_URL = 'http://127.0.0.1:8000/api/';

  constructor(
    private http: HttpClient,
    protected tableName: string
  ) {
    super(null);
  }

  public query(state: any): void {
    this.fetch(this.tableName, state)
      .subscribe(x => {
        super.next(x);
      });
  }

  protected fetch(tableName: string, state: any): Observable<GridDataResult> {
    const params = new HttpParams()
      .set('skip', state.skip)
      .set('take', state.take);
    this.loading = true;

    return this.http
      .get(`${this.BASE_URL}${tableName}`, {params})
      .pipe(
        map(response => (<GridDataResult> {
          data: response['data'],
          total: parseInt(response['total'], 10)
        })),
        tap(() => this.loading = false)
      );
  }
}

@Injectable()
export class CustomerService extends DataService {
  constructor(http: HttpClient) {
    super(http, 'customers');
  }
  public queryForname(ProductName: string, state?: any): void {
    this.query(Object.assign({}, state, {
      filter: {
        filters: [{
          field: 'name', operator: 'contains', value: ProductName
        }],
        logic: 'and'
      }
    }));
  }
}

