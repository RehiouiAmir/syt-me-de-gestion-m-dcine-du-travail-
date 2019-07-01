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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ajouter-consultation',
  templateUrl: './ajouter-consultation.component.html',
  styleUrls: ['./ajouter-consultation.component.css']
})
export class AjouterConsultationComponent implements OnInit {

  private id_employe: number;
  natureConsultations : any[];
  dateAujourdhuit = new FormControl(new Date());  
  firstFormGroup: FormGroup;
  private consultation: any;
  
   /* Table Structure | Médicaments */
   displayedColumnsMedicaments: string[] = ['designation','quantite','posologie','Action-delete'];
   dataSourceMedicaments : MatTableDataSource<any>;

   /* Table Structure | Soins */
   displayedColumnsSoins: string[] = ['designation','etatActe','dateActeSoin','observation','Action-delete'];
   dataSourceSoins : MatTableDataSource<any>;

   /* Table Structure | Orientation médicale */
   displayedColumnsOrientations: string[] = ['specialiste','motifOrientation','Action-edit','Action-delete','Action-pdf'];
   dataSourceOrientations : MatTableDataSource<any>;

    /* Table Structure | Orientation médicale */
    displayedColumnsExamens: string[] = ['designation','description','resultat','Action-delete'];
    dataSourceExamens : MatTableDataSource<any>;

  constructor(private route: ActivatedRoute,private _formBuilder: FormBuilder,
              public dialog: MatDialog,private employeService: EmployeService) {
                this.id_employe = Number(this.route.snapshot.paramMap.get('id'));                
              }

  ngOnInit() {

    this.employeService.getAllNatureConsultations().subscribe(
      data => {
        console.log(data) 
        this.natureConsultations = data;      
      },
      error => console.log(error)  
    );

    this.firstFormGroup = this._formBuilder.group({
      type: ['', Validators.required],
      heureArrivee: [this.dateAujourdhuit.value, Validators.required],
      natureConsultation: ['', Validators.required],
      conclusionMedicale: [''],
      conclusionProfessionnelle: [''],
      observation: [''], 
    });
  }

  onSubmitFirst(){
    if (!this.firstFormGroup.invalid){ 
      this.employeService.creatConsultation(this.id_employe,this.firstFormGroup.value).subscribe(result =>{
        console.log(result)      
       this.consultation =result;
       this.employeService.getConsultationByConsultationId(this.consultation.id).subscribe(
        data => {
          this.dataSourceSoins = new MatTableDataSource<any>(data['soins']);
          this.dataSourceExamens = new MatTableDataSource<any>(data['examenComplementaires']);
          this.dataSourceOrientations = new MatTableDataSource<any>(data['orientationMedicales']); 
          this.dataSourceMedicaments = new MatTableDataSource<any>([]);                    
        },
       error => console.log(error));
      },
      error => console.log(error));
    }
    
  }

// operation add edit delet 
  addSoins() {
    let dialogRef = this.dialog.open(AjouterSoinsComponent, {
      width: '70%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined){
          console.log(result)
          //change in backend
            this.employeService.creatActeSoins(this.consultation.id,result.idActe,result).subscribe(data => {
              console.log(data);
            this.consultation.soins= data
            this.dataSourceSoins.data.push(data)
            this.dataSourceSoins._updateChangeSubscription() 
          },
          error => console.log(error));
        }
    });
   }

addExamen() {
  let dialogRef = this.dialog.open(AjouterExamenComplementaireComponent, {
    width: '70%',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        console.log(result)
        //change in backend
          this.employeService.creatExamenComplementaire(this.consultation.id,result).subscribe(data => {
            console.log(data);
          this.consultation.examenComplementaires= data
          this.dataSourceExamens.data.push(data)
          this.dataSourceExamens._updateChangeSubscription() 
        },
        error => console.log(error));
      }
  });
 }

 addOrientation() {
  let dialogRef = this.dialog.open(AjouterOrientationMedicaleComponent, {
    width: '70%',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        console.log(result)
        //change in backend
          this.employeService.creatOrientationMedicale(this.consultation.id,result).subscribe(data => {
            console.log(data);
          this.consultation.orientationMedicales= data
          this.dataSourceOrientations.data.push(data)
          this.dataSourceOrientations._updateChangeSubscription() 
        },
        error => console.log(error));
      }
  });
 }
 addOrdonnance() {
  let dialogRef = this.dialog.open(AjouterOrdonnanceComponent, {
    width: '80%',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
          this.employeService.creatOrdonnance(this.consultation.id,result).subscribe(data => {
            this.consultation.ordonnance= data
            for (var i in result.prescription){
              var medicamentsPer= result.prescription[i].medicamentsPer
              this.employeService.creatPrescription(this.consultation.ordonnance.id,medicamentsPer,result.prescription[i]).subscribe(data => {
                this.consultation.ordonnance.prescriptions= data    
                this.dataSourceMedicaments.data.push(data)
                this.dataSourceMedicaments._updateChangeSubscription() 
                },
                error => console.log(error));
            }
        },
        error => console.log(error));
      }
  });
  }

}