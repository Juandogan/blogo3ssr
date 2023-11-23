import { Component, OnInit, Inject, Input } from '@angular/core';
import { CarouselServiceService } from '../../services/carousel-service.service';
import { Swiper } from 'swiper';
import { carouselDataItems } from '../../modelos/dataCarousel';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';


@Component({
  selector: 'app-carousel-revista',
  templateUrl: './carousel-revista.component.html',
  styleUrls: ['./carousel-revista.component.css']
})
export class CarouselRevistaComponent implements OnInit {
  title = 'ng-swiper-demo';
  slideData:any
  carga= false
  @Input('data')  data :  any
  constructor(public dataCarouselRevista:CarouselServiceService, @Inject(PLATFORM_ID) private _platformId: Object) { }

  ngOnInit(): void {


    if (isPlatformBrowser(this._platformId)) {
      this.carga=true
      this.dataCarouselRevista.pedirUsuarios().subscribe(res=>{
        this.slideData = res        
        this.slideData = this.slideData.reverse()
        this.carga=true
       })
      }
      }
   
  }


