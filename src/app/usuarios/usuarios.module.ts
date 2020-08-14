import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UsuariosListaComponent } from "./usuarios-lista/usuarios-lista.component";
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

@NgModule({
  declarations: [
    UsuariosListaComponent,
    UsuariosFormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [
    UsuariosListaComponent, 
  ],
})
export class UsuariosModule { }
