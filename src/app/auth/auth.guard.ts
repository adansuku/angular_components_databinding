import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

	isAuth = false

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | UrlTree {
		return this.authService.currentUser
			.pipe(
				take(1), // to make sure that we take the last user value
				map(user => {
					// return !!user;
					const isAuth = !!user;
					return isAuth ? true : this.router.createUrlTree(['/auth'])
				}),
				tap(isAuth => { // Map give use isAuth or not from authService user
					if (!isAuth) {
						this.router.navigate(['/auth'])
					}
				})
			)
	}
}