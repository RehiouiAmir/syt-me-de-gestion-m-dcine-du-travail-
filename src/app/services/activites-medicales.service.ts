import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitesMedicalesService {

  constructor(private http: HttpClient) { }

  getAllAppareils() {
    return this.http.get<any[]>(`${environment.baseUrl}/appareils`);
  }

  // Services Consultation

  getAllConsultations() {
    return this.http.get<any[]>(`${environment.baseUrl}/consultations`);
  }

  getAllNatureConsultations(){
    return this.http.get<any[]>(`${environment.baseUrl}/natureConsultations`);    
  }

  // Services visiteMedicale

  getAllvisiteMedicales() {
    return this.http.get<any[]>(`${environment.baseUrl}/visiteMedicales`);
  }

  // Services Vaccination

  getAllVaccis() {
    return this.http.get<any[]>(`${environment.baseUrl}/vaccins`);
  }

  // Services AccidentTravail

  getAllAccidentTravails() {
    return this.http.get<any[]>(`${environment.baseUrl}/accidents`);
  }

  getAllNatureAccidents(){
    return this.http.get<any[]>(`${environment.baseUrl}/natureAccidents`);    
  }

  creatAccidentTravail(id_nature,antecedentMaladie) {
    return this.http.post(`${environment.baseUrl}/accident/`+id_nature, antecedentMaladie);
  }

  updateAccidentTravail(id_accident,accident){
    return this.http.put(`${environment.baseUrl}/accidents/`+id_accident, accident);    
  }

  deleteAccidentTravail(id_accident){
    return this.http.delete(`${environment.baseUrl}/accidents/`+id_accident);    
  }

  // Service Maladies

  getAllMaladies() {
    return this.http.get<any[]>(`${environment.baseUrl}/maladies`);
  }

  getAllMedicaments() {
    return this.http.get<any[]>(`${environment.baseUrl}/medicaments`);
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


  //risque 

  deleteTypeRisque(type_id){
    return this.http.delete(`${environment.baseUrl}/typeRisques/`+type_id);    
  }

  updateTypeRisque(type_id,type){
    return this.http.put(`${environment.baseUrl}/typeRisques/`+type_id,type);    
  }

}
