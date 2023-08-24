import { Component, inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
private authService = inject(AuthService);
private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    email:['asd@dsdf.com',[Validators.required, Validators.email]],
    password:['heber739',[Validators.required, Validators.minLength(6)]]
  })


  login(){
    if(this.loginForm.invalid) return;
    const {email,password}=this.loginForm.value;
    this.authService.login(email,password).subscribe({
      next:()=> this.router.navigate(['/dashboard']),
      error:(message)=> Swal.fire('Error',message,'error')
    })
  }
}
