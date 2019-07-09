import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AjouterReorientationProfessionnelleComponent } from 'src/app/ajouter-reorientation-professionnelle/ajouter-reorientation-professionnelle.component';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';
import { AdministrationService } from 'src/app/services/administration.service';

@Component({
  selector: 'app-ajouter-reponse',
  templateUrl: './ajouter-reponse.component.html',
  styleUrls: ['./ajouter-reponse.component.css']
})
export class AjouterReponseComponent implements OnInit {

  private appareils: any[]
  private interrogatoires: any[]
  private posteTravails : any[]
  
    addGlobalForm: FormGroup;
  
    constructor(public dialogRef: MatDialogRef<AjouterReorientationProfessionnelleComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private formBuilder: FormBuilder,private activitesService : ActivitesMedicalesService,
      private employeService: EmployeService,private administrationService : AdministrationService)
       { }
  
      ngOnInit() {
  
        this.employeService.getAllPosteTravails().subscribe(
          data => {
            console.log(data) 
            this.posteTravails = data;      
          },
          error => console.log(error)  
        );
  
        this.activitesService.getAllAppareils().subscribe(
          data => {
            console.log(data)
            this.appareils = data;                  
          },
          error => console.log(error)  
        );

        this.addGlobalForm = this.formBuilder.group({
          posteOccupe: [this.data.posteActuel.posteTravail.designation],
          posteConseilles: [''],
          posteDeconseilles: ['']
        });
    
      }

      InitialiserInterrogatoire(value) {
        this.administrationService.getInterrogatoiresByAppareilId(value).subscribe(
          data => {
            console.log(data)
            this.interrogatoires = data;
          },
          error => console.log(error)  
        );
      }
    
      
      onSubmit() {
      if (!this.addGlobalForm.invalid){
        this.data = this.addGlobalForm.value;
        console.log(this.data)
        this.dialogRef.close(this.data);
        }
      }
      
      // close dialog  ajouter-changement-poste
      onNoClick(): void {
      this.dialogRef.close();
      }

}
