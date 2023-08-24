import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)',

      })),
      state('highlight', style({
        backgroundColor: 'yellow',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlight', animate(300))
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)',

      })),
      state('highlight', style({
        backgroundColor: 'green',
        transform: 'translateX(100px) scale(0.5)'
      })),
      transition('normal <=> highlight', animate(300)),
    ])
  ]
})
export class AuthComponent implements OnInit {
  isLoginMode = true
  isLoading = false
  error: String = null

  state = 'normal'
  wildstate: string = 'normal'

  constructor(
    private auth: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
    this.state = this.state == 'highlight' ? 'normal' : 'highlight'
    this.wildstate = this.state == 'highlight' ? 'normal' : 'highlight'

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
function triger(arg0: string, arg1: undefined[]): any {
  throw new Error('Function not implemented.');
}

