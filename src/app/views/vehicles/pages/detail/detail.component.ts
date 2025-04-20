import { Component, OnInit } from '@angular/core';
import { VehicleApiService } from '../../services/vehicle-api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  selectedVehicle: any;

  constructor(
    private vehiclesService: VehicleApiService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getVehicleById(Number(id));
    }
    else {
      this.dialog.open(MessageDialogComponent, {
        data: {
          icon: 'error', title: 'Ocorreu um erro!', message: "Id não indicado, tente novamente com outro Id...", redirectToList: true
        }
      });
    }
  }

  /**
   * Método que busca os dados do veículo com base no id.
   * @param id Identificador do veículo buscado
   */
  getVehicleById(id: number) {
    this.vehiclesService.getVehicleById(id).subscribe(
      value => {
        this.selectedVehicle = value;
      },
      error => {
        console.log("Ocorreu um erro ao buscar o veículo... Tente novamente mais tarde.");
        this.dialog.open(MessageDialogComponent, {
          data: {
            icon: 'error', title: 'Ocorreu um erro!', message: "Item não encontrado, tente novamente mais tarde...", redirectToList: true
          }
        });
      });
  }

}
