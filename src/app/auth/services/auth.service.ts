import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User, } from '../interfaces';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(){
    this.checkAuthStatus().subscribe(console.log)
  }

private readonly url:string = env.baseUrl;
private http = inject(HttpClient);

private _currentUser = signal<User|null>(null);
private _authStatus = signal<AuthStatus>(AuthStatus.cheking);

public currentUser = computed(()=>this._currentUser())
public authStatus = computed(()=>this._authStatus())

private setAuth(user:User, token:string):boolean{
  this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
}


login(email:string,password:string):Observable<boolean>{
return this.http.post<LoginResponse>(`${this.url}/auth/login`,{email,password}).pipe(
  map(({user,token})=> this.setAuth(user,token)),
  catchError(err =>  throwError(()=> err.error.message)))
}

checkAuthStatus():Observable<boolean>{
  const url = `${this.url}/auth/check-token`;
  const token = localStorage.getItem('token');
  if(!token) {
    this.logout()
    return of(false)
  }

  const headers = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)

  return this.http.get<CheckTokenResponse>(url,{headers}).pipe(
    map(({user,token})=> this.setAuth(user,token)),
    catchError(()=>{
      this._authStatus.set(AuthStatus.notauthenticated)
      return of(false)
    })
  )
}
logout(){
  localStorage.removeItem('token');
  this._currentUser.set(null)
    this._authStatus.set(AuthStatus.notauthenticated)
}

}
