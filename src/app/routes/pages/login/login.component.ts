import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/auth/login.service';
import { EventManager } from 'src/app/shared/services/event-manager';
import { StateStorageService } from 'src/app/core/auth/state-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    valForm: FormGroup;

    submitted;
    showLoginLoader;
    authenticationError;
    errorMessage;

    constructor(public settings: SettingsService, fb: FormBuilder,
        private loginService: LoginService, private eventManager: EventManager,
        private stateStorageService: StateStorageService, private router: Router) {

        this.valForm = fb.group({
            'username': [null, Validators.compose([Validators.required])],
            'password': [null, Validators.required]
        });

    }


    ngOnInit() {

    }

    submitForm($ev, value: any) {

        {
            this.submitted = true;

            if (this.valForm.valid) {
                const val = this.valForm.value;
                this.showLoginLoader = true;
                this.loginService
                    .login({
                        username: val.username,
                        password: val.password,
                        rememberMe: val.rememberMe
                    })
                    .then(() => {
                        this.authenticationError = false;
                        this.showLoginLoader = false;



                        this.eventManager.broadcast({
                            name: 'authenticationSuccess',
                            content: 'Sending Authentication Success'
                        });



                        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                        // since login is succesful, go to stored previousState and clear previousState
                        const redirect = this.stateStorageService.getUrl();
                        if (redirect) {
                            this.stateStorageService.storeUrl(null);
                            this.router.navigate([redirect]);
                        }
                        else {
                            this.router.navigate(['home'])
                        }
                    })
                    .catch((error) => {
                        console.log("Error in Login", error);
                        if (error.error) {
                            this.errorMessage = error.error.message;
                        }
                        this.authenticationError = true;
                        this.showLoginLoader = false;
                    });
            }

        }


    }
}
