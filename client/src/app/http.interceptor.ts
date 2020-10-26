import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(localStorage.getItem('token') != null) 
    {
       const token =  localStorage.getItem('token');
   
    const headers = new HttpHeaders().set("Authorization", 'Bearer ' + token);

    const AuthRequest = request.clone( { headers: headers});
    return next.handle(AuthRequest)
       }else {
         return next.handle(request);
       }
     

  }
}