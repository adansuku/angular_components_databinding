import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3YoGmL0ghJ6sUyQG2GJSGorrNU8YKJCo', {
			email: email,
			passowrd: password,
			returnSecureToken: true
		})
	}

}