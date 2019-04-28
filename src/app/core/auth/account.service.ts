import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { ConstantsService } from '../constants/constants.service';



@Injectable({ providedIn: 'root' })
export class AccountService {
    constructor(private http: HttpClient , private constants : ConstantsService) {}

    get() {
        return this.http.get(this.constants.API_ENDPOINT + 'auth/me');
    }

   

}
