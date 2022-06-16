import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasajeComponent } from './components/pasaje/pasaje.component';
import { PasajeFormComponent } from './components/pasaje-form/pasaje-form.component';
import { LibroComponent } from './components/libro/libro.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';

const routes: Routes = [
  { path: 'libros' , component: LibroComponent},
  { path: 'libro-form' , component: LibroFormComponent},
  { path: 'transaccion' , component: TransaccionComponent},
  { path: 'pasaje' , component: PasajeComponent},
  { path: 'pasaje-form' , component: PasajeFormComponent},
  { path: 'pasaje-form/:id' , component: PasajeFormComponent},
  { path: '**' , pathMatch: 'full', redirectTo: 'libros'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
