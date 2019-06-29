import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AjouterSoinsComponent } from 'src/app/dm-soins/dm-soins.component';
import { AjouterExamenComplementaireComponent } from 'src/app/ajouter-examen-complementaire/ajouter-examen-complementaire.component';
import { AjouterOrientationMedicaleComponent } from 'src/app/ajouter-orientation-medicale/ajouter-orientation-medicale.component';
import { AjouterOrdonnanceComponent } from 'src/app/ajouter-ordonnance/ajouter-ordonnance.component';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-ajouter-consultation',
  templateUrl: './ajouter-consultation.component.html',
  styleUrls: ['./ajouter-consultation.component.css']
})
export class AjouterConsultationComponent implements OnInit {

  natureConsultations : any[];
  dateAujourdhuit = new FormControl(new Date());  
  firstFormGroup: FormGroup;
  
   /* Table Structure | Médicaments */
   displayedColumnsMedicaments: string[] = ['designation','quantite','posologie','Action-delete'];
   dataSourceMedicament : MatTableDataSource<any>;

   /* Table Structure | Soins */
   displayedColumnsSoins: string[] = ['designation','dateActeSoin','Action-delete'];
   dataSourceSoins : MatTableDataSource<any>;

   /* Table Structure | Orientation médicale */
   displayedColumnsOrientations: string[] = ['specialiste','motifOrientation','dateDemande','Action-edit','Action-delete','Action-pdf'];
   dataSourceOrientations : MatTableDataSource<any>;

    /* Table Structure | Orientation médicale */
    displayedColumnsExamens: string[] = ['designation','dateDemande','description','Action-edit','Action-delete'];
    dataSourceExamens : MatTableDataSource<any>;

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,private employeService: EmployeService) {}

  ngOnInit() {

    this.employeService.getAllNatureConsultations().subscribe(
      data => {
        console.log(data) 
        this.natureConsultations = data;      
      },
      error => console.log(error)  
    );

    this.firstFormGroup = this._formBuilder.group({
      typeConsultation: ['', Validators.required],
      heureArrivee: [this.dateAujourdhuit.value, Validators.required],
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

addExamen() {
  let dialogRef = this.dialog.open(AjouterExamenComplementaireComponent, {
    width: '70%',
    data: {}
  });
 }

 addOrientation() {
  let dialogRef = this.dialog.open(AjouterOrientationMedicaleComponent, {
    width: '70%',
    data: {}
  });
 }
 addOrdonnance() {
  let dialogRef = this.dialog.open(AjouterOrdonnanceComponent, {
    width: '80%',
    data: {}
  });
  dialogRef.afterClosed().subscribe(() => {
    
  });
  }

}