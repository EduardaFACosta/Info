import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from '../../model/vehicle.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { VehicleApiService } from '../../services/vehicle-api.service';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  vehicles: Vehicle[] = []; // Lista de veículos
  
  displayedColumns: string[] = ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'actions']; // Colunas a serem exibidas pela tabela
  dataSource: MatTableDataSource<Vehicle> = new MatTableDataSource<Vehicle>(); // Entidade que gerencia os dados da tabela

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort();

  constructor(
    private vehiclesService: VehicleApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  ngAfterViewInit() {
    this.setTableConfigs(); // Configura Paginação e Ordenação da tabela
  }

  /**
   * Método que realiza configurações de paginação e ordenação da tabela.
   */
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

  /**
   * Método que busca os dados dos veículos registrados no banco.
   */
  getVehicles() {
    this.vehiclesService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
      this.dataSource = new MatTableDataSource(this.vehicles); //Atualiza os valores da tabela com o this.vehicles
      this.setTableConfigs();
    },
    error => {
        console.log("Ocorreu um erro ao buscar os veículos... Tente novamente mais tarde.");
      }
    );
  }

  /**
   * Método que abre a caixa de dialog de deleção de veículo.
   * 
   * O id do veículo é passado para que a caixa saiba qual veículo deletar e a placa é passada para ser exibida
   * para o usuário.
   * @param id Identificador do veículo a ser excluído
   * @param placa Placa do veículo a ser excluído
   */
  deleteVehicle(id: number, placa: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: id,
        placa: placa,
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result === 'success') {
        this.getVehicles();
      }
    })
  }
}
