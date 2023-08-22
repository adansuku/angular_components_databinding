import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()

export class AuthIntersectorService implements HttpInterceptor {
	constructor(private authService: AuthService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return this.authService.userSub.pipe(
			take(1),
			exhaustMap(user => {
				if (!user) {
					return next.handle(req)
				} else {
					const clonedRequest = req.clone(
						{
							params: new HttpParams().set('auth', user.token)
						})
					return next.handle(clonedRequest)
				}
			}))
	}
}