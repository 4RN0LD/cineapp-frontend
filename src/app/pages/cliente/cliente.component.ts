import { ClienteDialogoComponent } from './cliente-dialogo/cliente-dialogo.component';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { ClienteService } from './../../_service/cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  dataSource: MatTableDataSource<Cliente>;
  displayedColumns = ['idCliente', 'dni', 'nombres', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private clienteService: ClienteService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clienteService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.clienteService.clienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.clienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(cliente?: Cliente) {
    let cli = cliente != null ? cliente : new Cliente();
    this.dialog.open(ClienteDialogoComponent, {
      width: '250px',
      data: cli
    });
  }

  eliminar(genero: Cliente) {
    this.clienteService.eliminar(genero.idCliente).subscribe(data => {
      this.clienteService.listar().subscribe(medicos => {
        this.clienteService.clienteCambio.next(medicos);
        this.clienteService.mensajeCambio.next("Se elimino");
      });
    });
  }
}
