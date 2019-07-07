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
    addForm: FormGroup;
    addForm2: FormGroup;    
    posteCon: FormArray;
    posteDec: FormArray;    
    itemForm: FormGroup;
  
    constructor(public dialogRef: MatDialogRef<AjouterReorientationProfessionnelleComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private formBuilder: FormBuilder, private fb: FormBuilder,private fb2: FormBuilder,private employeService: EmployeService)
       {
        this.addForm = this.fb.group({
          items: [null, Validators.required],
          items_value: ['no', Validators.required]
        });
    
        this.posteCon = this.fb.array([]);

        this.addForm2 = this.fb2.group({
          items: [null, Validators.required],
          items_value: ['no', Validators.required]
        });
    
        this.posteDec = this.fb2.array([]);
      }
  
      ngOnInit() {
  
        this.employeService.getAllPosteTravails().subscribe(
          data => {
            console.log(data) 
            this.posteTravails = data;      
          },
          error => console.log(error)  
        );
  
        this.addGlobalForm = this.formBuilder.group({
          posteOccupe: [this.data.posteActuel],
          posteConseilles: [''],
          posteDeconseilles: ['']
        });
        this.addForm.get("items_value").setValue("yes");
        this.addForm.addControl('posteCon', this.posteCon);
        this.addGlobalForm.addControl('posteCon', this.posteCon);
        this.addForm2.addControl('posteDec', this.posteCon);
        this.addGlobalForm.addControl('posteDec', this.posteCon);
      }
    
      onAddRow() {
        this.posteCon.push(this.createItemFormGroup());
      }
      
      onRemoveRow(rowIndex:number){
        this.posteCon.removeAt(rowIndex);
      }
      
      createItemFormGroup(): FormGroup {
        return this.fb.group({
          posteT: ["", Validators.required],       
        });
      }

      onAddRow2() {
        this.posteDec.push(this.createItemFormGroup2());
      }
      
      onRemoveRow2(rowIndex:number){
        this.posteDec.removeAt(rowIndex);
      }
      
      createItemFormGroup2(): FormGroup {
        return this.fb2.group({
          posteT: ["", Validators.required],       
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
