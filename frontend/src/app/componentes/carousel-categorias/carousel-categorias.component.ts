import { Component, OnInit, Input, AfterViewInit, Inject} from '@angular/core';
import { LoadingObservableService } from '../../services/loading-observable.service';
import { Articulos } from '../../modelos/articulos';
import { CarouselModel } from '../../modelos/userCarousel'
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';



@Component({
  selector: 'app-carousel-categorias',
  templateUrl: './carousel-categorias.component.html',
  styleUrls: ['./carousel-categorias.component.css']
})
export class CarouselCategoriasComponent implements OnInit {
  swipperisActive=false
  @Input() height = 400;
  @Input() isFullScreen = false;
  @Input() items: CarouselModel[] = [];
  @Input('data')  data :  any
  estado = false 
load=false

constructor(@Inject(PLATFORM_ID) private _platformId: Object,){

}
  ngOnInit(): void {
    
  



if (isPlatformBrowser(this._platformId)) {
  this.data = this.data
  console.log(this.data,"*********************")
  this.load = true
  this.swipperisActive = true
 }

   }
  }

