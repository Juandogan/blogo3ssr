import { Injectable } from '@angular/core';
import { CarouselModel } from '../modelos/userCarousel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CarouselServiceService {


  anunciantes:CarouselModel[]=[];
  unAnunciante:CarouselModel[]=[];




  //public URL ="http://168.197.50.191/api"
  //public URL ="http://localhost:3000/carousel"
   public URL ="https://www.culturademontania.org.ar/carousel"

  usuario=""

  constructor(private http:HttpClient, private router:Router) {
  

   }

   pedirUsuarios(){
    return this.http.get<any>(this.URL +'/')

   }

   pedirUsuario(x:any){
    return this.http.get<any>(this.URL +'/'+ `/${x}`)
   }

   modify(x:string, anunciante:CarouselModel){
    return this.http.put<any>(this.URL +'/'+ `/${x}`, anunciante)
   }



    eliminarUsuario(x:any){
    return this.http.delete<any>(this.URL + `/${x}`)
   }

 crearAnuncio(user:CarouselModel){
     // this.usuario = user.email
    return this.http.post<any>(this.URL + '/', user)
 }

  // signIn(user:anunciante){
  //   // this.usuario = user.email
  //   return this.http.post<any>(this.URL + '/signin', user)
  // }


  // loggedIn():boolean{

  //   return !!localStorage.getItem('token')
  // }

  // getToken():any{
  //   return localStorage.getItem('token')
  // }
  // logOut(){
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('usuario')
  //   this.router.navigate(['administracion/login'])

  // }

}
