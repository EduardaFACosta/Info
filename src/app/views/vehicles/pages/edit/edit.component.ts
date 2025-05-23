import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleApiService } from '../../services/vehicle-api.service';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../model/vehicle.model';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  selectedVehicle: any; // Veículo selecionado para edição

  editForm = new FormGroup( // Formulário que agrega os campos de dados de veículo
    {
      placa: new FormControl('', Validators.required),
      chassi: new FormControl('', Validators.required),
      renavam: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      ano: new FormControl('', Validators.required),
    }
  );

  constructor(
    private vehiclesService: VehicleApiService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Puxa o id do veículo para editar do link
    if (id) { // Se obteve um id chama o método que puxa os dados do veículo
      this.getVehicleById(Number(id));
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
        this.editForm.patchValue({
          placa: this.selectedVehicle.placa,
          chassi: this.selectedVehicle.chassi,
          renavam: this.selectedVehicle.renavam,
          modelo: this.selectedVehicle.modelo,
          marca: this.selectedVehicle.marca,
          ano: this.selectedVehicle.ano
        })
      },
      error => {
        console.log("Ocorreu um erro ao buscar o veículo... Tente novamente mais tarde.");
      });
  }

  /**
   * Método que monta um novo objeto de veículo com os dados de formulário e o atualiza no banco.
   */
  updateVehicle() {
    const vehicleToAdd: Vehicle = { //Cria um objeto do tipo Vehicle com os valores do formulário
      id: this.selectedVehicle.id,
      placa: this.editForm.value['placa'] ?? '',
      chassi: this.editForm.value['chassi'] ?? '',
      renavam: this.editForm.value['renavam'] ?? '',
      modelo: this.editForm.value['modelo'] ?? '',
      marca: this.editForm.value['marca'] ?? '',
      ano: Number(this.editForm.value['ano']),
    }

    this.vehiclesService.updateVehicle(this.selectedVehicle.id, vehicleToAdd).subscribe( //Insere objeto a lista de veículos
      value => {
        console.log("Sucesso! Veículo atualizado na listagem.");
        this.dialog.open(MessageDialogComponent, {
          data: {
            icon: 'success', title: 'Sucesso!', message: "Veículo atualizado na listagem.", redirectToList: true
          }
        });
      },
      error => {
        console.log("Ocorreu um erro ao atualizar o veículo... Tente novamente mais tarde.");
        this.dialog.open(MessageDialogComponent, {
          data: {
            icon: 'error', title: 'Ocorreu um erro!', message: "Tente novamente mais tarde", redirectToList: false
          }
        });
      });
  }
}
