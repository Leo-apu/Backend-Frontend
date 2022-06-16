import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasajeComponent } from './components/pasaje/pasaje.component';
import { PasajeFormComponent } from './components/pasaje-form/pasaje-form.component';
import { LibroComponent } from './components/libro/libro.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PasajeComponent,
    PasajeFormComponent,
    LibroComponent,
    TransaccionComponent,
    LibroFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
