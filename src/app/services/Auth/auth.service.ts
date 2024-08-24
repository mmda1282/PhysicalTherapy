import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


 private loggedInUserSubject: BehaviorSubject<boolean>;
  public loggedInUser$: Observable<boolean>;
 
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.loggedInUserSubject = new BehaviorSubject<boolean>(!!token);
    this.loggedInUser$ = this.loggedInUserSubject.asObservable();
  }

  
  login(body:string): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/Account/login`, body);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  setLoggedInState(isLoggedIn: boolean): void {
    this.loggedInUserSubject.next(isLoggedIn);
  }
resetToken(name: string) {
  return this.http.post<any>(`${environment.apiUrl}/api/Account/GenerateResetToken?username=${encodeURIComponent(name)}`,{});
}
  resetPasswprd(body:string) {
     return this.http.post<any>(`${environment.apiUrl}/api/Account/ResetPassword`, body);
  }


}




 

