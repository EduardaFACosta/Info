import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehicleApiService } from '../../services/vehicle-api.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, placa: string },
    private vehiclesService: VehicleApiService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private dialog: MatDialog
  ) { }

  deleteVehicle() {
    this.vehiclesService.deleteVehicle(this.data.id).subscribe( //Insere objeto a lista de veículos
      value => {
        console.log("Sucesso! Veículo deletado da listagem.");
        this.dialogRef.close('success');
        this.dialog.open(MessageDialogComponent, {
          data: {
            icon: 'success', title: 'Sucesso!', message: "Veículo deletado da listagem.", redirectToList: true
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
