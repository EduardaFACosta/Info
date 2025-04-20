import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleApiService } from '../../services/vehicle-api.service';
import { Vehicle } from '../../model/vehicle.model';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  id = 0; // Id a ser substituindo pelo maior ID que já existe

  addForm = new FormGroup( // Formulário para agregar os dados do veículo a ser inserido
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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBiggestId();
  }

  /**
   * Método que busca o maior id no banco para poder atribuir um novo id ao novo veículo
   * 
   * Como os ids dessa implementação são incrementais, basta incrementar o valor obtido para gerar
   * um novo id único.
   */
  getBiggestId() {
    this.vehiclesService.getBiggestId().subscribe(value => {
      if (value) {
        this.id = value + 1;
      }
    },
      error => {
        console.log("Ocorreu um erro ao buscar os IDs...");
      }
    );
  }

  /**
   * Método que monta um novo objeto de veículo com os dados de formulário e o inscreve no banco.
   */
  addVehicle() {
    const vehicleToAdd: Vehicle = { //Cria um objeto do tipo Vehicle com os valores do formulário
      id: this.id,
      placa: this.addForm.value['placa'] ?? '',
      chassi: this.addForm.value['chassi'] ?? '',
      renavam: this.addForm.value['renavam'] ?? '',
      modelo: this.addForm.value['modelo'] ?? '',
      marca: this.addForm.value['marca'] ?? '',
      ano: Number(this.addForm.value['ano']),
    }

    this.vehiclesService.addVehicle(vehicleToAdd).subscribe( //Insere objeto a lista de veículos
      value => {
        console.log("Sucesso! Veículo adicionado a listagem.");
        this.dialog.open(MessageDialogComponent, {
          data: {
            icon: 'success', title: 'Sucesso!', message: "Veículo adicionado a listagem.", redirectToList: true
          }
        });
      },
      error => {
        console.log("Ocorreu um erro ao adicionar o veículo... Tente novamente mais tarde.");
        this.dialog.open(MessageDialogComponent, {
          data: {
            icon: 'error', title: 'Ocorreu um erro!', message: "Tente novamente mais tarde", redirectToList: false
          }
        });
      });
  }
}
