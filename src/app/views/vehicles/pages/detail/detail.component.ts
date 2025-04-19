import { Component, OnInit } from '@angular/core';
import { VehicleApiService } from '../../services/vehicle-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  selectedVehicle : any;

  constructor(
    private vehiclesService: VehicleApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getVehicleById(Number(id));
    }
  }

  getVehicleById(id: number) {
    this.vehiclesService.getVehicleById(id).subscribe(
      value => {
        this.selectedVehicle = value;
      },
      error => {
        console.log("Ocorreu um erro ao buscar o veículo... Tente novamente mais tarde.");
      });
  }

}
