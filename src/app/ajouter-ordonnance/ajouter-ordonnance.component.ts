import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-ajouter-ordonnance',
  templateUrl: './ajouter-ordonnance.component.html',
  styleUrls: ['./ajouter-ordonnance.component.css']
})
export class AjouterOrdonnanceComponent implements OnInit {

  medicaments = [
    {designation:'Médicaent 1'},
    {designation:'Médicaent 2'},
    {designation:'Médicaent 3'},
    {designation:'Médicaent 4'},
    {designation:'Médicaent 5'},
    {designation:'Médicaent 6'},
    {designation:'Médicaent 7'},
    {designation:'Médicaent 8'},
  ]

  addGlobalForm: FormGroup;
  addForm: FormGroup;
  prescription: FormArray;
  itemForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 

  constructor(public dialogRef: MatDialogRef<AjouterOrdonnanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, private fb: FormBuilder)
     {
      this.addForm = this.fb.group({
        items: [null, Validators.required],
        items_value: ['no', Validators.required]
      });
  
      this.prescription = this.fb.array([]);
    }

    ngOnInit() {
      this.addGlobalForm = this.formBuilder.group({
        dateOrdonnance: [this.dateAujourdhuit.value,Validators.required],
        observation: [''],      
      });
      this.addForm.get("items_value").setValue("yes");
      this.addForm.addControl('prescription', this.prescription);
      this.addGlobalForm.addControl('prescription', this.prescription);
    }
  
    onAddRow() {
      this.prescription.push(this.createItemFormGroup());
    }
    
    onRemoveRow(rowIndex:number){
      this.prescription.removeAt(rowIndex);
    }
    
    createItemFormGroup(): FormGroup {
      return this.fb.group({
        medicament: ["", Validators.required],
        quantite: [""],
        posologie: [""],        
      });
    }
    
    onSubmit() {
    if (!this.addGlobalForm.invalid){
      this.data = this.addGlobalForm.value;
      console.log(this.data)
      this.dialogRef.close();
      }
    }
    
    // close dialog  ajouter-changement-poste
    onNoClick(): void {
    this.dialogRef.close();
    }
}
