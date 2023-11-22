import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AutenticadoService } from "../service/autenticado/autenticado.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AuthGrard implements CanActivate {

    constructor(private autenticacionService: AutenticadoService, private router: Router){
        
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let token = localStorage.getItem("token");
        console.log(token);
        /*
        if(state.url.startsWith("/intranet"))
        {
            if(!token)
            {
                return this.router.navigate(["/login"]);
            }
        }
        if(state.url.startsWith("/login"))
        {
            if(token)
            {
                return this.router.navigate(["/intranet"]);
            }
        }*/
        return true;
    }
    
}
