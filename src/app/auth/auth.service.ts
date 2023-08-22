import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: String,
	localId: String,
	registered?: string
}

@Injectable({ providedIn: 'root' })

export class AuthService {
	constructor(
		private http: HttpClient
	) { }

	signup(email: string, password: string) {
		return this.http
			.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3YoGmL0ghJ6sUyQG2GJSGorrNU8YKJCo', {
				email: email,
				password: password,
				returnSecureToken: true
			}).pipe(catchError(this.handleError))
	}

	login(email: string, password: string) {
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3YoGmL0ghJ6sUyQG2GJSGorrNU8YKJCo',
			{
				email: email,
				password: password,
				returnSecureToken: true
			}
		).pipe(catchError(this.handleError))

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