import { Inject, Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { FirebaseManagerService } from '../firebase-manager.service';
import { Router } from '@angular/router';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let firebaseService= inject(FirebaseManagerService);
  let router= inject(Router);

  let isAuthenticated= firebaseService.isAuthenticated();
  if(isAuthenticated==true){
    return isAuthenticated;
  }else{
    router.navigate(['/login'])
    return false;
  }
};

