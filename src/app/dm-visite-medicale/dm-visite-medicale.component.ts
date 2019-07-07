import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';


/* Structure Employe Informations Minimal - DIV-Filter */

export interface EmployeInfosMin {
  id: number;
  numCartChifa: number;
  posteTravail: string;
}

/* Structure Select Values */

export interface SelectValue {
  value: string;
  viewValue: string;
} 

@Component({
  selector: 'app-dm-visite-medicale',
  templateUrl: './dm-visite-medicale.component.html',
  styleUrls: ['./dm-visite-medicale.component.css']
})
export class DmVisiteMedicaleComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  imageSource : string;  
  
  id: string;
  
  dateAujourdhuit = new FormControl(new Date());
  
    /* [Exemple] two employes with id=1 & id=2 */
    employesInfosMin : EmployeInfosMin[] = [
      { id:1,numCartChifa: 121827123087,posteTravail: 'CHEF SCE FORMATION'},
      { id:2,numCartChifa: 123456123087,posteTravail: 'ADMINISTRATEUR SYSTEMES CONSOLIDATION'}
    ];
  
    constructor(private route: ActivatedRoute,
                private _formBuilder: FormBuilder,
                private dateAdapter: DateAdapter<Date>) 

    { this.dateAdapter.setLocale('fr'); 
      this.id = this.route.snapshot.paramMap.get('id');}
  
    ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
      this.thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required]
      });
    }
  
    getEmployeInfosMinById() : EmployeInfosMin{
      this.id = this.route.snapshot.paramMap.get('id');
      for(var i in this.employesInfosMin){
        if(this.employesInfosMin[i].id === Number(this.id) )
        return this.employesInfosMin[i];
      }  
    }
  
    employeInfosMin : EmployeInfosMin = this.getEmployeInfosMinById();


      /* Select Values */

  posteTravails: SelectValue[] = [
    {value: 'chef-sce-formation', viewValue: 'CHEF SCE FORMATION'},
    {value: 'administrateur-systeles-consolidation', viewValue: 'ADMINISTRATEUR SYSTEMES CONSOLIDATION'},
    {value: 'charge-gestion-social', viewValue: 'CHARGE GESTION SOCIAL'},
    {value: 'chef-base', viewValue: 'CHARGE GESTION SOCIAL'}    
  ];

}
