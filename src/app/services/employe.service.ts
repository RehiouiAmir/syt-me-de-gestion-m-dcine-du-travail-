import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

// Services Employe

  getAllEmployes() {
    return this.http.get<any[]>(`${environment.baseUrl}/employes`);
  }

  getEmployeById(id: number) {
      return this.http.get<any>(`${environment.baseUrl}/employe/`+id);
  }

  createEmploye(employe) {
    return this.http.post(`${environment.baseUrl}/employe/create`, employe);
  }

  // Service Poste de travail
  
  getAllPosteTravails() {
    return this.http.get<any[]>(`${environment.baseUrl}/postetravails`);
  }


  //Service Accident de travail

  getAllAccidentTravailsEmploye(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}//`+id_employe);
  }

  getAccidentTravailEmploye(id: number) {
    return this.http.get<any>(`${environment.baseUrl}`);
  }

  creatAccidentTravail(accidentTravail) {
    return this.http.post(`${environment.baseUrl}/accidenttravail/creat`, accidentTravail);
  }

  //Service Arret de travail

  getAllArretTravailsEmploye(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}//`+id_employe);
  }

  getArretTravailEmploye(id: number) {
    return this.http.get<any>(`${environment.baseUrl}`);
  }

  creatArretTravail(arretAccident) {
    return this.http.post(`${environment.baseUrl}/arrettravail/creat`, arretAccident);
  }

  //Service changelent de poste

  getAllchangementPostesEmploye(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}//`+id_employe);
  }

  getChangementPosteEmploye(id: number) {
    return this.http.get<any>(`${environment.baseUrl}`);
  }

  creatChangmentPoste(changementPoste) {
    return this.http.post(`${environment.baseUrl}//creat`, changementPoste);
  }
}
