import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-ajouter-reorientation-professionnelle',
  templateUrl: './ajouter-reorientation-professionnelle.component.html',
  styleUrls: ['./ajouter-reorientation-professionnelle.component.css']
})
export class AjouterReorientationProfessionnelleComponent implements OnInit {

  private posteTravails : any[]
  
    addGlobalForm: FormGroup;
  
    constructor(public dialogRef: MatDialogRef<AjouterReorientationProfessionnelleComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private formBuilder: FormBuilder,private employeService: EmployeService)
       { }
  
      ngOnInit() {
  
        this.employeService.getAllPosteTravails().subscribe(
          data => {
            console.log(data) 
            this.posteTravails = data;      
          },
          error => console.log(error)  
        );
  
        this.addGlobalForm = this.formBuilder.group({
          posteOccupe: [this.data.posteActuel.posteTravail.designation],
          posteConseilles: [''],
          posteDeconseilles: ['']
        });
    
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
