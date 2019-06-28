import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ajouter-orientation-medicale',
  templateUrl: './ajouter-orientation-medicale.component.html',
  styleUrls: ['./ajouter-orientation-medicale.component.css']
})
export class AjouterOrientationMedicaleComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 

  constructor(public dialogRef: MatDialogRef<AjouterOrientationMedicaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder) { }

    ngOnInit() {
      this.addForm = this.formBuilder.group({
        motifOrientation: ['',Validators.required],
        specialiste: ['',Validators.required], 
        dateDemande: [this.dateAujourdhuit.value,Validators.required],
        observations: [''], 
        dateResultat: [''],        
        resultat: [''],      
      });
    }
  
    // close dialog  ajouter-arret-travail
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onSubmit() {
      if (!this.addForm.invalid){
        this.data = this.addForm.value;
        console.log(this.data)
        this.dialogRef.close(this.data);
        }
    }

}
