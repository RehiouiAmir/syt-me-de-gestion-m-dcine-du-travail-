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
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';

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
  
   displayedColumns: string[] = ['natureAccident','lieu','dateDebut','dateFin','consequence','medecin','Action-details','Action-edit','Action-delete'];
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
        this.dataSourceAutres.paginator = this.paginatorAutres;
        this.dataSourceAutres.sort = this.sortAutres;
      },
      error => console.log(error)  
    );

    this.employeService.getAllAntecedentsAccidentsTravailByEmployeId(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.accidentsTravail = data;
        this.dataSource = new MatTableDataSource<any>(this.accidentsTravail);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)  
    );

    this.employeService.getAllAntecedentsMaladiesByEmployeId(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.maladies = data;
        this.dataSourceMaladies = new MatTableDataSource<any>(this.maladies);
        this.dataSourceMaladies.paginator = this.paginatorMaladies;
        this.dataSourceMaladies.sort = this.sortMaladies;
      },
      error => console.log(error)  
    );
    
  }

  
  // search table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterMaladies(filterValue: string) {
    this.dataSourceMaladies.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMaladies.paginator) {
      this.dataSourceMaladies.paginator.firstPage();
    }
  }

  applyFilterAutres(filterValue: string) {
    this.dataSourceAutres.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAutres.paginator) {
      this.dataSourceAutres.paginator.firstPage();
    }
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
  
  accidentTravails : any [] =[];

  maladiesProfessionnelles : any []= [];

  maladiesGenerale: any [] = [];

  maladiesCongenitale: any [] =[];
  
  
  constructor(public dialogRef: MatDialogRef<AjouterAntecedentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,public dialog: MatDialog,private activitesMedicales : ActivitesMedicalesService) {}

  ngOnInit() {

    this.activitesMedicales.getAllAccidentTravails().subscribe(
      data => {
        console.log(data) 
        this.accidentTravails = data;      
      },
      error => console.log(error)  
    );

    this.activitesMedicales.getAllMaladies().subscribe(
      data => {
        console.log(data) 
        for(let i of data){
          if(i.type ==='Professionnelle') {
            this.maladiesProfessionnelles.push(i);
          }else if(i.type ==='Congénétale'){
            this.maladiesCongenitale.push(i)
          }else{
            this.maladiesGenerale.push(i)
          }
        }
      },
      error => console.log(error)  
    );

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
