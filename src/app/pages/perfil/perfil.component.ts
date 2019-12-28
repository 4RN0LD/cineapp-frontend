import { UsuarioService } from 'src/app/_service/usuario.service';
import { ClienteService } from './../../_service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public nombreUsuario: string;
  public roles : string[];
  imagenData: any;
  imagenEstado: boolean = false;

  constructor(private usuarioService : UsuarioService,
    private sanitization: DomSanitizer) { }

  ngOnInit() {
    const helper = new JwtHelperService();

    let token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
    const decodedToken = helper.decodeToken(token.access_token);
    this.nombreUsuario = decodedToken.user_name;
    this.roles = decodedToken.authorities;

    this.usuarioService.listarPorName(decodedToken.user_name).subscribe(data => {
      console.log(data);
      if (data.size > 0) {          
        this.convertir(data);
      }
    });

  }

  convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {      
      let base64 = reader.result;      
      this.setear(base64);
    }
  }

  setear(x: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(x);
    this.imagenEstado = true;
  }

}
