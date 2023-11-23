import { Component, OnInit } from '@angular/core';

import {Subject} from 'rxjs';
import { BuscadorObservableService } from '../../services/buscador-observable.service';
import { LoadingObservableService } from '../../services/loading-observable.service';



@Component({
  selector: 'app-barra-negra',
  templateUrl: './barra-negra.component.html',
  styleUrls: ['./barra-negra.component.css']
})
export class BarraNegraComponent implements OnInit {
  
  buscar:any
  existir:any
  buscarMensaje:string = ""
  claseAnima = false;
  estado = false
  public color = "rgb(33,33,33)"

  constructor(
    private oservable:BuscadorObservableService,
    private observableLoading:LoadingObservableService) { }

  ngOnInit(): void {
    
 

      


  }



  pasar(va:any){
    // this.oservable.buscarString$.emit(this.buscar)

  }

  loading(){
    // this.observableLoading.loading$.emit(true)
 }

  filterList(): void {
    // this.searchTerm$.subscribe(term => {
    //   console.log('observa',term)

    // });
  }

}
