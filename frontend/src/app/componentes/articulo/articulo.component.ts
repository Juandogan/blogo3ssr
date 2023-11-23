import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { CrudAnuncioService } from 'src/app/services/crud-anuncio.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css'],

  // encapsulation: ViewEncapsulation.None,

})
export class ArticuloComponent implements OnInit {
  id:any
  loader = true
  loader2 = false
nota:any
dataRelacionado:any
anuncios:any

  constructor(private rutaActiva: ActivatedRoute, 
    private crudService:CrudService, private anunciosService:CrudAnuncioService,
    private crudAnuncio:CrudAnuncioService) {
  this.id = this.rutaActiva.snapshot.params
 
  }


  ngOnInit(): void {
   this.crudService.getOneArticulo(this.id._id).subscribe(res=>{
    this.nota = res
    
    console.log(this.nota.categoria)
    this.crudService.getCategorias(this.nota.categoria).subscribe(res=>{
      var aux = res     
      this.dataRelacionado = this.randomNoRepeat(aux);  
      this.loader2=true
      this.crudAnuncio.pedirUsuarios().subscribe(res=>{
        this.anuncios = res
        this.loader = false
        
      })
      
    });
   })




  }

  
 randomNoRepeat(arr:any){

  console.log(arr)
  
  
    let newArr = [];
    while(arr.length > 0) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      let randomElement = arr[randomIndex];
      newArr.push(randomElement);
      arr.splice(randomIndex, 1);
    }
    return newArr;
  }

  saltos2(data: string) {
    var aux2 = data.split('<h2 style="margin-left:0px;text-align:justify;">').join(`<h2 style=" font-weight: 700; 
  line-height: 32px;
  letter-spacing: -1px;
  font-size:25px!important;
  color:orange;
  margin-bottom:15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
   `)

 


    aux2 =  aux2 = data.split('<figcaption>').join(`<figcaption style="  
         
    font-size:15px!important;
    margin-bottom:15px;
    text-align:center!important;
    color:rgb(68, 68, 68);
    
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
     `)
 
    

    aux2 = aux2.split('<h3').join(`<h3 style="font-weight: 400; line-height: 30px;letter-spacing: 0px;font-size:22px;color:orange;margin-bottom:10px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"`)

 
                                    aux2 = aux2.split('<p').join(`<p style="font-weight: 400;margin-top:-10px;font-size: 18px; line-height: 28px; color:rgb(68, 68, 68);text-align:justify; text-justify:inter-character;"`)
                            
                                    aux2 =  aux2.split('<h1>').join(`<h1 style=" font-weight: 700; 
                                    line-height: 32px;
                                    letter-spacing: -1px;
                                    font-size:29px!important;
                                    color:orange!important;
                                    margin-bottom:15px;
                                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                                     `)
                                    aux2 =  aux2.split('<h2>').join(`<h2 style=" font-weight: 700; 
                                    line-height: 32px;
                                    letter-spacing: -1px;
                                    font-size:29px!important;
                                    color:orange!important;
                                    margin-bottom:15px;
                                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                                     `)
    // aux2 = aux2.split('<strong').join('<strong style="font-size:14px;  font-weight: 800;"')
    // aux2 = aux2.split('</p></strong>').join('</p></b>')

    // <img style="width:100%; margin-top:10px" src="http://168.197.50.191/upload/_BTJMOy-ce0StAhwmUC8V_AN.jpg">




    aux2 = aux2.split('<img').join('<img style="width:100%!important; margin-top:10px; margin-bottom:10px"')


    aux2 = aux2.split('https://www.youtube.com/watch?v=').join('https://www.youtube.com/embed/')
    aux2 = aux2.split(' ,').join(', ')
    aux2 = aux2.split(' .').join('. ')
    aux2 = aux2.split('<figure class="media"><oembed url="').join('<iframe width="100%" height="515" src="')
    aux2 = aux2.split('<h4>').join('<h4 style="text-align:center!important; font-size:15px!important; margin-top:-10px!important; margin-bottom:30px!important;">')
    aux2 = aux2.split('"></oembed></figure>').join('" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
    aux2 = aux2.split('<a ').join('<a target="_blank"')
    aux2 = aux2.split('style="margin-left:0px;text-align:center;"').join('style="text-align:center!important; font-size:15px!important; margin-top:-10px!important; margin-bottom:30px!important;"')
    aux2 = aux2.split('style="text-align:center!important;"').join('style="text-align:center!important; font-size:15px!important; margin-top:-10px!important; margin-bottom:30px!important;"')
    aux2 = aux2.split('<figure ').join('<figure style="width:100%!important" ')
      
    //regla pie de foto3




    //regla pie de foto1



     aux2 = aux2.split('</a></p><p style="margin-left:0px;text-align:center;"><strong>')
     .join('</a></p><p style="margin-left:0px;text-align:center;"><div style="text-align:center!important;"><strong>')      
       aux2 = aux2.split('</strong>').join('</strong></div>')
//regla pie de foto2
       aux2 = aux2.split('</a><strong>').join('</a><div style="text-align:center!important;"><strong>')      
         aux2 = aux2.split('</strong>').join('</strong></div>')









     
     //</a></p><p style="margin-left:0px;text-align:center;"><strong>
 

    var aux2 = aux2.split('<h2 style="margin-left:0px;text-align:justify;"').join(`<h2 style=" font-weight: 700; 
    line-height: 32px;
    letter-spacing: -1px;
    font-size:25px!important;
    color:orange;
    margin-bottom:19px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
     `)
     var aux2 = aux2.split('<h1 style="margin-left:0px;text-align:justify;"').join(`<h1 style=" font-weight: 700; 
     line-height: 32px;
     letter-spacing: -1px;
     font-size:25px!important;
     color:orange;
     margin-bottom:19px;
     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
      `)

      aux2 = aux2.split('jpg"></p><p style="font-weight: 400;margin-top:-10px;font-size: 18px; line-height: 28px; color:rgb(68, 68, 68);text-align:justify; text-justify:inter-character;" style="text-align:center!important; font-size:15px!important; margin-top:-10px!important; margin-bottom:30px!important;"><strong>')
.join('jpg"></p><div style="text-align:center!important;margin-top:-10px"><strong>')      
aux2 = aux2.split('</strong>').join('</strong></div>')

aux2 = aux2.split('alt=""></a></p><p style="font-weight: 400;margin-top:-10px;font-size: 18px; line-height: 28px; color:rgb(68, 68, 68);text-align:justify; text-justify:inter-character;" style="text-align:center!important; font-size:15px!important; margin-top:-10px!important; margin-bottom:30px!important;"><strong>')
.join('alt=""></a></p><p style="font-weight: 400;margin-top:-10px;font-size: 18px; line-height: 28px; color:rgb(68, 68, 68);text-align:justify; text-justify:inter-character;" style="text-align:center!important; font-size:15px!important; margin-top:-10px!important; margin-bottom:30px!important;"><div style="text-align:center!important;margin-top:-10px"><strong>')      
aux2 = aux2.split('</strong>').join('</strong></div>')

aux2 = aux2.split('jpg"></a></p><p style="font-weight: 400;margin-top:-10px;font-size: 18px; line-height: 28px; color:rgb(68, 68, 68);text-align:justify; text-justify:inter-character;" style="text-align:center!important; font-size:15px!important; margin-top:-10px!important; margin-bottom:30px!important;"><strong>"><strong>')
.join('jpg"></a></p><p style="font-weight: 400;margin-top:-10px;font-size: 18px; line-height: 28px; color:rgb(68, 68, 68);text-align:justify; text-justify:inter-character;" style="text-align:center!important; font-size:15px!important; margin-top:-10px!important; margin-bottom:30px!important;"><div style="text-align:center!important;margin-top:-10px"><strong>')      
aux2 = aux2.split('</strong>').join('</strong></div>')



aux2 = aux2.split('jpg"></a></p><p style="font-weight: 400;margin-top:-10px;font-size: 18px; line-height: 28px; color:rgb(68, 68, 68);text-align:justify; text-justify:inter-character;" style="text-align:center!important; font-size:15px!important; margin-top:-10px!important; margin-bottom:30px!important;"><strong>')
.join('jpg"></a></p><p style="font-weight: 400;margin-top:-10px;font-size: 18px; line-height: 28px; color:rgb(68, 68, 68);text-align:justify; text-justify:inter-character;" style="text-align:center!important; font-size:15px!important; margin-top:-10px!important; margin-bottom:30px!important;"><div style="text-align:center!important;margin-top:-10px"><strong>')      
aux2 = aux2.split('</strong>').join('</strong></div>')


//  aux2 = aux2.split('https://www.culturademontania.org.ar/').join('https://old.culturademontania.org.ar/')
//  aux2 = aux2.split('http://191.101.18.184:3000/').join('https://www.culturademontania.org.ar/')
//  aux2 = aux2.split('https://old.culturademontania.org.ar/ccam/').join('https://www.culturademontania.org.ar/ccam/') 
   
   


 aux2 = aux2.split('https://www.culturademontania.org.ar/').join('https://old.culturademontania.org.ar/')
 aux2 = aux2.split('https://culturademontania.org.ar/').join('https://old.culturademontania.org.ar/')
 aux2 = aux2.split('http://www.culturademontania.org.ar/').join('https://old.culturademontania.org.ar/')
 aux2 = aux2.split('http://191.101.18.184:3000/').join('https://www.culturademontania.org.ar/')
 aux2 = aux2.split('https://old.culturademontania.org.ar/ccam/').join('https://www.culturademontania.org.ar/ccam/') 
 aux2 = aux2.split('http://old.culturademontania.org.ar/ccam/').join('https://www.culturademontania.org.ar/ccam/') 
 aux2 = aux2.split('https://old.culturademontania.org.ar/articulo/').join('https://www.culturademontania.org.ar/articulo/') 
 aux2 = aux2.split('http://old.culturademontania.org.ar/articulo/').join('https://www.culturademontania.org.ar/articulo/') 







      // console.log(aux2)
    
    return (aux2)
  }

}
