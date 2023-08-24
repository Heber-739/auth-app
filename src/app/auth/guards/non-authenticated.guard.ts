import { inject } from '@angular/core';
import {  CanActivateFn, Router  } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../services/auth.service';

export const NonAuthenticatedGuard: CanActivateFn = (route ,state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.authStatus() === AuthStatus.notauthenticated){
    return true
  }

   router.navigate(['/dashboard']).then(()=>{
        Swal.fire('Ya inició sesion', 'Cerrar sesion si quiere ingresar con otro usuario', 'success')
      })
  return false;

}
