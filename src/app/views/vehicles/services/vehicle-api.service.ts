import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vehicle } from '../model/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleApiService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000/api';

  /**
   * Método que busca os dados dos veículos registrados no banco.
   * @returns Observable apontando para o retorno http
   */
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl+'/vehicle');
  }

  /**
   * Método que busca os dados do veículo com base no id.
   * @param id Identificador do veículo buscado
   * @returns Observable apontando para o retorno http
   */
  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/vehicle/${id}`);
  }

  /**
   * Método que monta um novo objeto de veículo
   * @param vehicle Novo veículo a ser inserido
   * @returns Observable apontando para o retorno http
   */
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseUrl+'/vehicle', vehicle);
  }

  /**
   * Método que atualiza um objeto de veículo
   * @param vehicle Novo veículo a ser editado
   * @returns Observable apontando para o retorno http
   */
  updateVehicle(id: number, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/vehicle/${id}`, vehicle);
  }

  /**
   * Método que deleta os dados do veículo com base no id.
   * @param id Identificador do veículo a ser deletado
   * @returns Observable apontando para o retorno http
   */
  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/vehicle/${id}`);
  }

  /**
   * Método que busca o maior id do banco.
   * @returns Observable apontando para o retorno http
   */
  getBiggestId(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/biggestId`);
  }
}
