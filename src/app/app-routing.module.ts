import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { UsuariosListaComponent } from './usuarios/usuarios-lista/usuarios-lista.component';

const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { 
    path: 'usuarios', 
    component: UsuariosListaComponent 
  },
  { 
    path: 'usuarios/cadastro', 
    component: UsuariosFormComponent 
  },
  { 
    path: 'usuarios/cadastro/:userId', 
    component: UsuariosFormComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
