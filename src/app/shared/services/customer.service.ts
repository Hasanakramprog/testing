import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from 'src/app/core/constants/constants.service';
import {Observable} from 'rxjs';
import {PaginatedCustomer} from '../../core/models/PaginatedCustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient: HttpClient,
    private constantsService: ConstantsService
  ) {
  }

  resourcePath = this.constantsService.API_ENDPOINT + 'customers';

  getAll(): Observable<PaginatedCustomer> {
    return this.httpClient.get<PaginatedCustomer>(this.resourcePath);
  }

  geturl(url): Observable<PaginatedCustomer> {
    return this.httpClient.get<PaginatedCustomer>(url);
  }

  create(item) {
    return this.httpClient.post(this.resourcePath, item);
  }

  getbyid(id) {
    return this.httpClient.get(this.resourcePath + '/' + id);
  }

  update(id, item) {
    return this.httpClient.put(this.resourcePath + 's/' + id, item);
  }

  delete(id) {
    return this.httpClient.delete(this.resourcePath + '/' + id);
  }
}
