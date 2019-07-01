import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-ajouter-ordonnance',
  templateUrl: './ajouter-ordonnance.component.html',
  styleUrls: ['./ajouter-ordonnance.component.css']
})
export class AjouterOrdonnanceComponent implements OnInit {

  private medicaments : any[]

  addGlobalForm: FormGroup;
  addForm: FormGroup;
  prescription: FormArray;
  itemForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AjouterOrdonnanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, private fb: FormBuilder,private employeService: EmployeService)
     {
      this.addForm = this.fb.group({
        items: [null, Validators.required],
        items_value: ['no', Validators.required]
      });
  
      this.prescription = this.fb.array([]);
    }

    ngOnInit() {

      this.employeService.getAllMedicaments().subscribe(
        data => {
          console.log(data) 
          this.medicaments = data;      
        },
        error => console.log(error)  
      );

      this.addGlobalForm = this.formBuilder.group({
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
        medicamentsPer: ["", Validators.required],
        quantite: [""],
        posage: [""],        
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
