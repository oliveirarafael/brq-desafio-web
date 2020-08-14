import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  birthDate = new FormControl('', [Validators.required]);
  company = new FormControl('', [Validators.required]);
  userId;

  companyIds = [
    {value: 1, viewValue: 1},
    {value: 2, viewValue: 2},
    {value: 5, viewValue: 5},
    {value: 7, viewValue: 7},
    {value: 10, viewValue: 10},
  ];

  constructor(private usuarioService: UsuariosService, 
              private snackBar: MatSnackBar, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.userId;
    
    if(this.userId != null){
      this.usuarioService.getUsuarioPorId(this.userId).subscribe(
        usuario => {
          this.email.setValue(usuario.email)
          this.birthDate.setValue(this.formatarDataHifen(usuario.birthDate))
          this.company.setValue(usuario.companyId)
        }
      )
    }
    
  }

  getErrorMessage() {
    if (this.email.hasError('required') || 
        this.birthDate.hasError('required') ||
        this.company.hasError('required')) {
      return 'Campo obrigatório';
    }

    return this.email.hasError('email') ? 'E-mail não é válido' : '';
  }

  enviar(){
    if(this.userId == null){
      this.salvar()
    }else{
      this.editar()
    }
  }

  salvar(){
    if(!this.email.invalid && !this.company.invalid && !this.birthDate.invalid){
        
        this.usuarioService.salvar(this.getUsuarioForm()).subscribe(() => {
            this.limpar()
            this.openSnackBar("Cadastrado com sucesso", "Fechar")
          }, 
          err => {
            const error = err.error;
            if(error.codigo == 400){
                this.openSnackBar(`${error.mensagem}`, "fechar")
            }
          }
        );
    }
  }

  editar(){
    if(!this.email.invalid && !this.company.invalid && !this.birthDate.invalid){
        
        this.usuarioService.editar(this.userId, this.getUsuarioForm()).subscribe(() => {
            this.limpar()
            this.openSnackBar("Editado com sucesso", "Fechar")
            setTimeout(function(){ window.location.href = "http://localhost:4200"; }, 1000);
            
          }, 
          err => {
            const error = err.error;
            if(error.codigo == 400){
                this.openSnackBar(`${error.campo}: ${error.mensagem}`, "fechar")
            }
          }
        );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  limpar(){
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.birthDate = new FormControl('', [Validators.required]);
    this.company = new FormControl('', [Validators.required]);
  }

  getUsuarioForm(){
    return {
      email: this.email.value,
      birthDate: this.formatarDataBarra(this.birthDate.value),
      companyId: this.company.value, 
    }
  }

  formatarDataBarra(data){
    let partes = data.split('-')
    return `${partes[2]}/${partes[1]}/${partes[0]}` 
  }

  formatarDataHifen(data){
    let partes = data.split('/')
    console.log(partes)
    return `${partes[2]}-${partes[1]}-${partes[0]}` 
  }

}
