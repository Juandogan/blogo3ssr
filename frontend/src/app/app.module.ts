import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNegraComponent } from './componentes/barra-negra/barra-negra.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { CarouselComponent } from './componentes/carousel/carousel.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { HttpClientModule } from '@angular/common/http';
import { CardMobileComponent } from './componentes/card-mobile/card-mobile.component';
import { CardBajoPortadaComponent } from './componentes/card-bajo-portada/card-bajo-portada.component';
import { Filtrox2Pipe } from './pipes/filtrox2.pipe';
import { CardBajopublix3Component } from './componentes/card-bajopublix3/card-bajopublix3.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ArticuloComponent } from './componentes/articulo/articulo.component';
import { SanetizerPipe } from './pipes/sanetizer.pipe';
import { RouterModule } from '@angular/router';
import { CarouselRevistaComponent } from './componentes/carousel-revista/carousel-revista.component';
import { FooterCardComponent } from './componentes/footer-card/footer-card.component';
import { LateralIntercaladoComponent } from './componentes/lateral-intercalado/lateral-intercalado.component';
import { ComentariosComponent } from './componentes/comentarios/comentarios.component';
import { ArticuloRelacionadoComponent } from './componentes/articulo-relacionado/articulo-relacionado.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { MapasComponent } from './componentes/mapas/mapas.component';
import { GuiaComponent } from './componentes/guia/guia.component';
import { FiltroGuiaPipe } from './componentes/pipes/filtro-guia.pipe';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { TalleresComponent } from './componentes/talleres/talleres.component';
import { SubscripcionComponent } from './componentes/subscripcion/subscripcion.component';
import { EquipoComponent } from './componentes/equipo/equipo.component';
import { BuscarPipe } from './pipes/buscar.pipe';
import { CarouselCategoriasComponent } from './componentes/carousel-categorias/carousel-categorias.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';


// import { environment } from './environments/environment';


@NgModule({
  declarations: [
     
    AppComponent,
    BarraNegraComponent,
    NavbarComponent,
    PrincipalComponent,
    CarouselComponent,
    CardMobileComponent,
    CardBajoPortadaComponent,
    Filtrox2Pipe,
    CardBajopublix3Component,
    FooterComponent,
    ArticuloComponent,
    SanetizerPipe,
    CarouselRevistaComponent,
    FooterCardComponent,
    LateralIntercaladoComponent,
    ComentariosComponent,
    ArticuloRelacionadoComponent,
    CategoriaComponent,
    MapasComponent,
    GuiaComponent,
    FiltroGuiaPipe,
    QuienesSomosComponent,
    TalleresComponent,
    SubscripcionComponent,
    BuscarPipe,
    BuscarPipe,
    CarouselCategoriasComponent,
    BuscadorComponent
    

    
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,  
    RouterModule,
    FormsModule,
    HttpClientModule,
    
       
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AppRoutingModule, provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }
