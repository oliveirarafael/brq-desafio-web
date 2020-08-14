import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

const API = "http://localhost:8080/api/v1"

@Injectable({ providedIn: 'root' })
export class UsuariosService {

    constructor(private http: HttpClient){}


    listarUsuarios(){
        return this.http.get<Usuario[]>(API+"/usuarios");
    }

    getUsuarioPorId(userId: number) {
        return this.http.get<Usuario>(API+"/usuarios/"+userId);
    }

    listarUsuariosPorEmail(email: string) {
        return this.http.get<Usuario[]>(API+"/usuarios/email/"+email);
    }

    listarUsuariosPorCompanyId(companyId: number){
        return this.http.get<Usuario[]>(API+"/usuarios/companies/"+companyId);
    }

    deletar(userId: number){
        return this.http.delete(API+"/usuarios/"+userId);
    }

    salvar(usuario){
        return this.http.post(API+"/usuarios", usuario);
    }

    editar(userId: number, usuario){
        return this.http.put(API+"/usuarios/"+userId, usuario);
    }
}