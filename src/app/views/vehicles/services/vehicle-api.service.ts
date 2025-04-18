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

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<any>(this.baseUrl, vehicle);
  }

  updateVehicle(id: number, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
