import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from '../../model/vehicle.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  vehicles: Vehicle[] = [
    {
      id: 0,
      placa: 'ABC1D23',
      chassi: '1f1 6FPSA8 He 6C1581',
      renavam: '22193945321',
      modelo: 'Limousine',
      marca: 'Ford',
      ano: 2009,
    },
    {
      id: 0,
      placa: 'ABC1D23',
      chassi: '1f1 6FPSA8 He 6C1581',
      renavam: '22193945321',
      modelo: 'Limousine',
      marca: 'Ford',
      ano: 2009,
    },
    {
      id: 0,
      placa: 'ABC1D23',
      chassi: '1f1 6FPSA8 He 6C1581',
      renavam: '22193945321',
      modelo: 'Limousine',
      marca: 'Ford',
      ano: 2009,
    },
    {
      id: 0,
      placa: 'ABC1D23',
      chassi: '1f1 6FPSA8 He 6C1581',
      renavam: '22193945321',
      modelo: 'Limousine',
      marca: 'Ford',
      ano: 2009,
    },
  ];
  displayedColumns: string[] = ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'actions'];

  dataSource: MatTableDataSource<Vehicle> = new MatTableDataSource<Vehicle>();
  @ViewChild(MatPaginator, { static: false }) paginator : MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.vehicles); //Atualiza os valores da tabela com o this.vehicles
    this.setTableConfigs();
  }

  ngAfterViewInit() {
    this.setTableConfigs(); // Configura Paginação e Ordenação da tabela
  }

  setTableConfigs() {

    let intl = new MatPaginatorIntl();

    //Configurando a tradução da paginação da tabela, por padrão vem em inglês
    intl.itemsPerPageLabel = 'Items por página:';
    intl.firstPageLabel = 'Primeira página';
    intl.previousPageLabel = 'Página anterior';
    intl.nextPageLabel = 'Próxima página';
    intl.lastPageLabel = 'Última página';

    this.paginator._intl = intl;

    //Atualizando paginação e ordenação da tabela
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
