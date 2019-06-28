import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { DeclarerAccidentTravailComponent } from 'src/app/accidents-travail/accidents-travail.component';
import { ViewChild } from '@angular/core';

import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-dm-antecedents',
  templateUrl: './dm-antecedents.component.html',
  styleUrls: ['./dm-antecedents.component.css']
})
export class DmAntecedentsComponent implements OnInit {

  private id_employe: number;
  antecedents : any[];
  accidentsTravail: any[];
  maladies: any[];
   /* Accidents de travail Table Structure */
  
   displayedColumns: string[] = ['designation','dateDebut','dateFin','medecin','Action-details','Action-edit','Action-delete'];
   dataSource : MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

    /* Maladies Table Structure */
 
    displayedColumnsMaladies: string[] = ['type','designation','dateDebut','dateFin','medecin','Action-details','Action-edit','Action-delete'];
    dataSourceMaladies : MatTableDataSource<any>;
  
    @ViewChild('MatPaginatorMaladies') paginatorMaladies: MatPaginator;
    @ViewChild('MatSortMaladies') sortMaladies: MatSort;

    /* Autres antédédetns Table Structure */
 
    displayedColumnsAutres: string[] = ['type','designation','dateDebut','dateFin','medecin','Action-details','Action-edit','Action-delete'];
    dataSourceAutres : MatTableDataSource<any>;
  
    @ViewChild('MatPaginatorAutres') paginatorAutres: MatPaginator;
    @ViewChild('MatSortAutres') sortAutres: MatSort;
  
  constructor(private employeService: EmployeService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.id_employe = Number(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {

    this.employeService.getAllAntecedentsByEmployeId(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.antecedents = data;
        this.dataSourceAutres = new MatTableDataSource<any>(this.antecedents);
        this.dataSourceAutres.paginator = this.paginator;
        this.dataSourceAutres.sort = this.sort;
      },
      error => console.log(error)  
    );

    this.employeService.getAllAntecedentsAccidentsTravailByEmployeId(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.accidentsTravail = data;
        this.dataSourceAutres = new MatTableDataSource<any>(this.accidentsTravail);
        this.dataSourceAutres.paginator = this.paginator;
        this.dataSourceAutres.sort = this.sort;
      },
      error => console.log(error)  
    );

    this.employeService.getAllAntecedentsMaladiesByEmployeId(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.maladies = data;
        this.dataSourceAutres = new MatTableDataSource<any>(this.maladies);
        this.dataSourceAutres.paginator = this.paginator;
        this.dataSourceAutres.sort = this.sort;
      },
      error => console.log(error)  
    );
    
  }


  // Operation Add, Edit, Delet
 
  add() {
    let dialogRef = this.dialog.open(AjouterAntecedentComponent, {
      width: '70%',
      data: {}
    });
   }
}

@Component({
  selector: 'app-ajouter-antecedent',
  templateUrl: './ajouter-antecedent.component.html',
  styleUrls: ['./ajouter-antecedent.component.css']
})
export class AjouterAntecedentComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  
  accidentTravails = [
    {code:'1' ,dateAccident :'02-03-2018' ,lieuAccident : 'intern' ,natureAccident : 'grave'},
    {code:'2' ,dateAccident :'06-03-2019' ,lieuAccident : 'intern' ,natureAccident : 'moyenne'},
    {code:'3' ,dateAccident :'02-11-2017' ,lieuAccident : 'intern' ,natureAccident : 'grave'},
  ]

  maladiesProfessionnelles = [
    {code:'1' ,typeMaladie :'professionnelle' ,designation : 'Otite moyenne' },
    {code:'2' ,typeMaladie :'professionnelle' ,designation : 'Onychomycose' },
    {code:'3' ,typeMaladie :'professionnelle', designation : 'Le mal de gorge' },
  ]

  maladiesGenerale= [
    {code:'1' ,typeMaladie :'Générale' ,designation : 'Otite moyenne' },
    {code:'2' ,typeMaladie :'Générale' ,designation : 'Onychomycose' },
    {code:'3' ,typeMaladie :'Générale' ,designation : 'Le mal de gorge' },
  ]

  maladiesCongenitale= [
    {code:'1' ,typeMaladie :'Congénitale' ,designation : 'Otite moyenne' },
    {code:'2' ,typeMaladie :'Congénitale' ,designation : 'Onychomycose' },
    {code:'3' ,typeMaladie :'Congénitale' ,designation : 'Le mal de gorge' },
  ]
  
  
  constructor(public dialogRef: MatDialogRef<AjouterAntecedentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,public dialog: MatDialog) {}

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      typeAntecedent:  ['', Validators.required],
      designation: ['', Validators.required],
      dateDebut: [this.dateAujourdhuit.value,Validators.required],
      dateFin: [''],
      consequence: [''],
      observation: [''],
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
   // Operation Add, Edit, Delet
   
   add() {
    let dialogRef = this.dialog.open(DeclarerAccidentTravailComponent, {
      width: '50%',
      data: {}
    });
   }

}
