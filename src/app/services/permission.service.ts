import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { FirebaseManagerService } from './firebase-manager.service';

@Injectable({
  providedIn: 'root'
})
class UserToken {}
export class PermissionService {
  constructor( private firebase: FirebaseManagerService ) { }

  async canActivate(currentUser: UserToken, userId: string): Promise<boolean> {
    return await this.firebase.isAuthenticated();
  }
  canMatch(currentUser: UserToken): boolean {
    return true;
  }


}

export const canActivateTeam: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let service= inject(PermissionService);
  let result= await service.canActivate(inject(UserToken), route.params['id']);
  return result;
};

