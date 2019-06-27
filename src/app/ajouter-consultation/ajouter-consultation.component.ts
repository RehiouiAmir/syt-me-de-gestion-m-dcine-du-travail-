import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AjouterSoinsComponent } from 'src/app/dm-soins/dm-soins.component';

@Component({
  selector: 'app-ajouter-consultation',
  templateUrl: './ajouter-consultation.component.html',
  styleUrls: ['./ajouter-consultation.component.css']
})
export class AjouterConsultationComponent implements OnInit {

  dateAujourdhuit = new FormControl(new Date());  
  firstFormGroup: FormGroup;
  
   /* Table Structure | Médicaments */
   displayedColumnsMedicaments: string[] = ['designation','quantite','posologie','Action-delete'];
   dataSourceMedicament : MatTableDataSource<any>;

   /* Table Structure | Soins */
   displayedColumnsSoins: string[] = ['designation','dateActeSoin','Action-delete'];
   dataSourceSoins : MatTableDataSource<any>;

   /* Table Structure | Orientation médicale */
   displayedColumnsOrientations: string[] = ['specialiste','motifOrientation','Action-edit','Action-delete','Action-pdf'];
   dataSourceOrientations : MatTableDataSource<any>;

    /* Table Structure | Orientation médicale */
    displayedColumnsExamens: string[] = ['designation','Action-edit','Action-delete'];
    dataSourceExamens : MatTableDataSource<any>;

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      typeConsultation: ['', Validators.required],
      dateConsultation: [this.dateAujourdhuit.value, Validators.required],
      natureConsultation: ['', Validators.required],
      observation: [''], 
    });
  }

  onSubmitFirst(){
    if (!this.firstFormGroup.invalid){console.log(this.firstFormGroup.value)};
  }

// operation add edit delet 
  addSoins() {
    let dialogRef = this.dialog.open(AjouterSoinsComponent, {
      width: '70%',
      data: {}
    });
   }
}
