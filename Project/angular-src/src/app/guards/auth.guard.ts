import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { AuthService } from "app/services/auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
