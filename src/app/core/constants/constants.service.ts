import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {


  public API_ENDPOINT ;
  public UPLOADS_PATH ;

  constructor() {

    if(isDevMode()){
     this.API_ENDPOINT = "http://localhost:8000/api/" ;
     this.UPLOADS_PATH = "http://localhost:8000/uploads/" ;
    }
    else{

      this.API_ENDPOINT =  document.location.origin+"/api/"
      this.UPLOADS_PATH = document.location.origin+"/uploads/" ;
    }

  }


}
