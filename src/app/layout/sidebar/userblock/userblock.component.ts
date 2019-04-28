import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { Principal } from 'src/app/core/auth/principal.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    constructor(public userblockService: UserblockService , private principal : Principal) {

        this.user = {
            picture: 'assets/img/user/01.jpg'
        };
    }

    ngOnInit() {
        this.setName();
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

    setName(){
        this.principal.identity().then(result => {
            console.log("result" , result );
            this.user.name = result.name;
        });
      }

}
