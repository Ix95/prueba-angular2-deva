import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import {
  ContactFormComponent,
  ContactFormModule,
} from './contacto/ContactFormModule';

const appRoutes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'contacto', component: ContactFormComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSortModule,
    ReactiveFormsModule,
    ContactFormModule.forRoot('https://test.com'),
  ],
  declarations: [AppComponent, BienvenidaComponent, ContactFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

export const MY_NUM = new InjectionToken<number>('my_number', {
  providedIn: 'root',
  factory: () => {
    return 20;
  },
});
