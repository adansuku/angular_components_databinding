import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: String,
	localId: String
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
			}).pipe(catchError(errorRes => {
				let errorMessage = "Error"
				if (!errorRes.error || !errorRes.error.error) {
					return throwError(errorMessage);
				} else {
					switch (errorRes.error.error.message) {
						case "EMAIL_EXISTS":
							errorMessage = 'This email exist...'
					}
					return throwError(errorMessage)
				}
			}));
	}

}