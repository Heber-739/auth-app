import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export default class DashboardComponent {

  private authService = inject(AuthService)
  public user = computed(()=>this.authService.currentUser())

  // get user(){
  //   return this.authService.currentUser();
  // }

  onLogout(){
    this.authService.logout()
  }

}
