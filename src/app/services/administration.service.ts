import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }
  
  // Services Employe
  
    ajouterSociete(societe) {
      return this.http.post<any[]>(`${environment.baseUrl}/societe`, societe);
    }

    ajouterAppareil(societe) {
      return this.http.post<any[]>(`${environment.baseUrl}/appareil`, societe);
    }

    ajouterNatureAccident(natureAccident) {
      return this.http.post<any[]>(`${environment.baseUrl}/natureAccident`, natureAccident);
    }

    ajouterNatureConsultation(natureConsultation) {
      return this.http.post<any[]>(`${environment.baseUrl}/natureConsultation`, natureConsultation);
    }

    ajouterMedicament(medicament) {
      return this.http.post<any[]>(`${environment.baseUrl}/medicament`, medicament);
    }

    ajouterMaladie(maladie) {
      return this.http.post<any[]>(`${environment.baseUrl}/maladie`, maladie);
    }

    ajouterSite(id: number,vaccin) {
      return this.http.post<any[]>(`${environment.baseUrl}/societes/`+id+`/siteAffectation`, vaccin);
    }

    ajouterDepartement(id: number,vaccin) {
      return this.http.post<any[]>(`${environment.baseUrl}/siteAffectations/`+id+`/departement`, vaccin);
    }

    ajouterVaccin(vaccin) {
      return this.http.post<any[]>(`${environment.baseUrl}/vaccin`, vaccin);
    }

    ajouterPosteTravail(id: number,posteTravail) {
      return this.http.post<any[]>(`${environment.baseUrl}/departements/`+id+`/posteTravail`, posteTravail);
    }
    // getEmployeById(id: number) {
    //     return this.http.get<any>(`${environment.baseUrl}/employes/`+id);
    // }
  
    // createEmploye(employe) {
    //   return this.http.post(`${environment.baseUrl}/employe`, employe);
    // }

}
