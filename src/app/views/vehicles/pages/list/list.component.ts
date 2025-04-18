import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from '../../model/vehicle.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { VehicleApiService } from '../../services/vehicle-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'actions'];

  dataSource: MatTableDataSource<Vehicle> = new MatTableDataSource<Vehicle>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort();

  constructor(
    private vehiclesService: VehicleApiService
  ) { }

  ngOnInit(): void {
    this.getVehicles();
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

  getVehicles() {
    this.vehiclesService.getVehicles().subscribe(v => {
      this.vehicles = v;
      this.dataSource = new MatTableDataSource(this.vehicles); //Atualiza os valores da tabela com o this.vehicles
      this.setTableConfigs();
      console.log("Veiculos",this.vehicles);
    },
      error => {
        console.log("Ocorreu um erro ao buscar os veículos... Tente novamente mais tarde.");
      }
    )
  }
}
