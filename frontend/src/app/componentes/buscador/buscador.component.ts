import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscadorObservableService } from '../../services/buscador-observable.service';
import { CrudService } from 'src/app/services/crud.service';



@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  
  @Input('data') data : any  
  nota:any
  filterPost=""
  aux=''
  loader= true
  constructor(private crudService:CrudService ) { }

  ngOnInit(): void {
this.crudService.getArticulos().subscribe(res=>{
  this.nota = res
  console.log(this.nota)
  this.loader = false
})
  }

  cut(value:any){
    if( value) {
    var corte = value.slice(2)
    return corte
  } else
   return value
 };
}
