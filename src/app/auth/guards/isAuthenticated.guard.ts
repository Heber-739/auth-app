import { AuthStatus } from './../interfaces/auth-status.enum';
import {  CanActivateFn, Router, } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2'

export const IsAuthenticatedGuard: CanActivateFn = (route,state) => {
  // const url = state.url;
  // localStorage.setItem('url', url) /dashboard

  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.authStatus() === AuthStatus.authenticated){
    return true
  }
  // if(authService.authStatus() === AuthStatus.cheking){
  //   return false
  // }

   router.navigate(['/auth/login']).then(()=>{
        Swal.fire('No esta autenticado', 'Inicie sesion', 'error')
      })
  return false;
}
