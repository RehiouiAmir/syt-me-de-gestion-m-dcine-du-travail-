import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-ajouter-examen-complementaire',
  templateUrl: './ajouter-examen-complementaire.component.html',
  styleUrls: ['./ajouter-examen-complementaire.component.css']
})
export class AjouterExamenComplementaireComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 

  constructor(public dialogRef: MatDialogRef<AjouterExamenComplementaireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder) { }

    ngOnInit() {
      if(this.data.edit === 'true'){
        var date = new FormControl()
        if(this.data.object.date != null){
          date = new FormControl(new Date(this.data.object.date));                   
        }else{
          date= this.dateAujourdhuit;
        }
        this.addForm = this.formBuilder.group({
          id: [this.data.object.id],
          designation: [this.data.object.designation,Validators.required],
          description: [this.data.object.description], 
          date: [date.value],        
          resultat: [this.data.object.resultat],      
        });
      }else{
        this.addForm = this.formBuilder.group({
          designation: ['',Validators.required],
          description: [''], 
          date: [''],        
          resultat: [''],      
        });
      }
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
