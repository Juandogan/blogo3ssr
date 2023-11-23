import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResolveNotaService } from './services/resolve-nota.service';
import { ArticuloComponent } from './componentes/articulo/articulo.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { MapasComponent } from './componentes/mapas/mapas.component';
import { SubscripcionComponent } from './componentes/subscripcion/subscripcion.component';
import { EntrenamientosComponent } from './componentes/entrenamientos/entrenamientos.component';
import { EquipoComponent } from './componentes/equipo/equipo.component';
import { TalleresComponent } from './componentes/talleres/talleres.component';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent },
  {path:'articulo/:_id', component: ArticuloComponent},
  {path:'categoria/:_id', component:  CategoriaComponent},
  {path:'mapas', component: MapasComponent },
  
{ path: 'subscripcion',  component: SubscripcionComponent},
{ path: 'entrenamiento',  component: EntrenamientosComponent},
{ path: 'equipo',  component: EquipoComponent},
{ path: 'talleres',  component: TalleresComponent},
{ path: 'quienes',  component: QuienesSomosComponent},
{ path: 'buscador',  component: BuscadorComponent},
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: "enabled",
       initialNavigation: 'enabledBlocking',
          })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
