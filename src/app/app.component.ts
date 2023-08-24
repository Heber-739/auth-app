import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authApp';


  private authService = inject(AuthService);
  private router = inject(Router)

  public finishAuthCheck = computed<boolean>(()=>{
    if(this.authService.authStatus() === AuthStatus.cheking){
      return false;
    }
    return true;
  })


  public authStatusChangedEffect = effect(()=>{
    switch (this.authService.authStatus()) {
      case AuthStatus.cheking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
        case AuthStatus.notauthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  })

}
