import { GeneroDialogoComponent } from './genero-dialogo/genero-dialogo.component';
import { Genero } from './../../_model/genero';
import { GeneroService } from './../../_service/genero.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  cantidad: number = 0;
  dataSource: MatTableDataSource<Genero>;
  displayedColumns: string[] = ['idGenero', 'nombre', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private generoService: GeneroService, private dialog: MatDialog, private snack: MatSnackBar) { }

  ngOnInit() {
    this.generoService.generoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.generoService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    /*this.generoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/

    this.generoService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(genero?: Genero) {
    let gen = genero != null ? genero : new Genero();
    this.dialog.open(GeneroDialogoComponent, {
      width: '250px',
      data: gen
    });
  }

  eliminar(genero: Genero) {
    this.generoService.eliminar(genero.idGenero).subscribe(() => {
      this.generoService.listar().subscribe(data => {
        this.generoService.generoCambio.next(data);
        this.generoService.mensajeCambio.next('SE ELIMINO');
      });
    });
  }

  mostrarMas(e : any){
    this.generoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    });
  }
}
