import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
	kind: string,
	idToken: string,
	email: string,
	refreshToken: string,
	expiresIn: string,
	localId: string,
	registered?: string
}
@Injectable({ providedIn: 'root' })

export class AuthService {
	// userSub = new Subject<User>()
	// token: string = null

	userSub = new BehaviorSubject<User>(null)
	private tokenExpirationTimer: any

	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	signup(email: string, password: string) {
		return this.http
			.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3YoGmL0ghJ6sUyQG2GJSGorrNU8YKJCo', {
				email: email,
				password: password,
				returnSecureToken: true
			}).pipe(catchError(this.handleError),
				tap(response => {
					this.handleAuthentication(
						response.email,
						response.localId,
						response.idToken,
						+response.expiresIn
					)
				})
			)
	}

	login(email: string, password: string) {
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3YoGmL0ghJ6sUyQG2GJSGorrNU8YKJCo',
			{
				email: email,
				password: password,
				returnSecureToken: true
			}
		).pipe(catchError(this.handleError), tap(response => {
			this.handleAuthentication(
				response.email,
				response.localId,
				response.idToken,
				+response.expiresIn
			)
		}))
	}

	autologin() {
		const userData: {
			email: string,
			id: string,
			_token: string,
			_tokenExpirationDate: string
		} = JSON.parse(localStorage.getItem('userData'))

		if (!userData) return

		const loadedUser = new User(
			userData.email,
			userData.id,
			userData._token,
			new Date(userData._tokenExpirationDate)
		)

		if (loadedUser.token) {
			this.userSub.next(loadedUser)

			const expirationDuration = new Date(userData._tokenExpirationDate).getTime() * 1000 - new Date().getTime()
			this.autologout(expirationDuration)
		}
	}

	autologout(expirationDuration: number) {
		this.tokenExpirationTimer = setTimeout(() => {
			this.logout()
		}, expirationDuration)
	}

	logout() {
		this.userSub.next(null)
		this.router.navigate(['/auth'])
		localStorage.removeItem('userData')
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer)
		}
	}

	private handleAuthentication(
		email: string,
		userId: string,
		token: string,
		expiresIn: number
	) {
		const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
		const user = new User(email, userId, token, expirationDate)
		this.userSub.next(user)
		this.autologout(expiresIn * 1000)
		localStorage.setItem('userData', JSON.stringify(user))
	}


	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage = "Error"
		console.log(errorRes.error)
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage);
		} else {
			switch (errorRes.error.error.message) {
				case "TOO_MANY_ATTEMPTS_TRY_LATER":
					errorMessage = "Too many attempts try later please"
					break
				case "OPERATION_NOT_ALLOWED":
					errorMessage = ": Operation not allowed."
					break
				case "EMAIL_EXISTS":
					errorMessage = 'This email exist...'
					break
				case "EMAIL_NOT_FOUND":
					errorMessage = 'This email NOT exist...'
					break
				case "INVALID_PASSWORD":
					errorMessage = 'This password is NOT correct...'
					break
				case "USER_DISABLED":
					errorMessage = 'User disabled'

			}
			return throwError(errorMessage)
		}
	}

}