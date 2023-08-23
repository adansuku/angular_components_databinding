import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    private router: Router
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
        console.log(response)
        this.router.navigate(['/recipes'])
        this.isLoading = false
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false
      }
    )

    form.reset()
  }

  onHandleError() {
    this.error = null
  }


}
