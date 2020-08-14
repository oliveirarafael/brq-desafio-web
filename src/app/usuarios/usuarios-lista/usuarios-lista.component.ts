import { Component, OnInit, Input } from '@angular/core';

import { UsuariosService } from '../usuarios.service';
import { Usuario } from '../usuario';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {
  usuarios: Usuario[] = []
  displayedColumns: string[] = ['id', 'email', 'birthDate', 'companyId', 'deletar', 'editar'];
  
  @Input() email:string = '';
  companyId:number = 0;

  constructor(private usuarioService: UsuariosService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.todosUsuarios();
  }

  todosUsuarios(){
    this.usuarioService.listarUsuarios().subscribe(usuarios => this.usuarios = usuarios);
  }

  usuariosPorEmail(){
    this.usuarioService.listarUsuariosPorEmail(this.email).subscribe(
        usuarios => this.usuarios = usuarios, 
        err => {
          const error = err.error;
          if(error.codigo == 404){
            this.usuarios = []
            this.openSnackBar(error.mensagem, "fechar")
          }
        }
      );
  }

  usuariosPorCompany(){
    this.usuarioService.listarUsuariosPorCompanyId(this.companyId).subscribe(
      usuarios => this.usuarios = usuarios,
      err => {
        const error = err.error;
        if(error.codigo == 404){
          this.usuarios = []
          this.openSnackBar(error.mensagem, "fechar")
        }
      }
    );
  }

  deletarUsuario(userId: number){
    this.usuarioService.deletar(userId).subscribe(() => this.todosUsuarios());
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
