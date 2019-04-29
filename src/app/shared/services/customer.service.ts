import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from 'src/app/core/constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient : HttpClient ,
    private constantsService : ConstantsService
  ) { }

  resourcePath = this.constantsService.API_ENDPOINT + "customers" ;

  getAll() {
    return this.httpClient.get(this.resourcePath) ;
  }

  create(item){
    return this.httpClient.post(this.resourcePath , item) ;
  }

  update(id , item){
    return this.httpClient.put(this.resourcePath+"/"+id , item) ;
  }
  delete(id){
    return this.httpClient.delete(this.resourcePath+"/"+id) ;
  }
}
