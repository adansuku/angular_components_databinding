import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';



@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css']
})


export class AuthComponent {
  isLoginMode = true
  isLoading = false
  error: String = null
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective

  constructor(
    private auth: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }



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
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    hostViewContainerRef.createComponent(alertComponentFactory)
  }

}
