import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true
  isLoading = false
  error: String = null

  constructor(
    private auth: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return

    const email = form.value.email
    const password = form.value.password

    let authObs: Observable<AuthResponseData>
    this.isLoading = true

    if (this.isLoginMode) {
      authObs = this.auth.login(email, password)
    } else {
      authObs = this.auth.signup(email, password)
    }

    authObs.subscribe(
      response => {
        this.router.navigate(['/recipes'])
        this.isLoading = false
      },
      errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false
      }
    )

    form.reset()
  }

  onHandleError() {
    this.error = null
  }

  private showErrorAlert(message: String) {
    // cons alertComp = new AlertComponent() // it doesn´t work with angular
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    )
  }

}
