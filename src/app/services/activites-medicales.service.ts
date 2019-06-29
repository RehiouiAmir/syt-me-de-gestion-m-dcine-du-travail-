import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitesMedicalesService {

  constructor(private http: HttpClient) { }

  // Services Consultation

  getAllConsultations() {
    return this.http.get<any[]>(`${environment.baseUrl}/consultations`);
  }

  // Services visiteMedicale

  getAllvisiteMedicales() {
    return this.http.get<any[]>(`${environment.baseUrl}/visiteMedicales`);
  }

  // Services Vaccination

  getAllVaccinations() {
    return this.http.get<any[]>(`${environment.baseUrl}/vaccinations`);
  }

  // Services AccidentTravail

  getAllAccidentTravails() {
    return this.http.get<any[]>(`${environment.baseUrl}/accidents`);
  }

  // Services ArretTravail

  getAllArretTravails() {
    return this.http.get<any[]>(`${environment.baseUrl}/arretTravails`);
  }

  // Services Soin

  getAllSoinss() {
    return this.http.get<any[]>(`${environment.baseUrl}/soinss`);
  }

  getAllSoinsInfirmiers() {
    return this.http.get<any[]>(`${environment.baseUrl}/soinsInfirmiers`);
  }


}
