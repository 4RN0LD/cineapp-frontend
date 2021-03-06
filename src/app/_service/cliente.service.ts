import { Subject } from 'rxjs';
import { Cliente } from './../_model/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  clienteCambio = new Subject<Cliente[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/clientes`;  
  
  constructor(private http: HttpClient) { }

  listarPorId(id: number) {
    return this.http.get(`${this.url}/${id}`, {
      responseType: 'blob'
    });
  }

  listar() {
    return this.http.get<Cliente[]>(this.url);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  registrar(cliente: Cliente, file?: File) {

    let formdata: FormData = new FormData();
    formdata.append('file', file);

    const comidaBlob = new Blob([JSON.stringify(cliente)], { type: "application/json" });
    formdata.append('comida', comidaBlob);

    return this.http.post(`${this.url}`, formdata);

  }

  modificar(cliente: Cliente, file?: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    const comidaBlob = new Blob([JSON.stringify(cliente)], { type: "application/json" });
    formdata.append('comida', comidaBlob);

    return this.http.put(`${this.url}`, formdata);
  }
}
