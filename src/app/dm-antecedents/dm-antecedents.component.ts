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
  employeInfos : any = null;
  posteActuel : any = null;  
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

    
    this.employeService.getEmployeById(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.employeInfos = data;
        for(var i in this.employeInfos.employe_posteTravails){
          if (this.employeInfos.employe_posteTravails[i].actuel === true){
            this.posteActuel = this.employeInfos.employe_posteTravails[i];
            console.log(this.posteActuel)
          }
        }
      },
      error => console.log(error)  
    );
    
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
 
  add(edit: any) {
    let dialogRef = this.dialog.open(AjouterAntecedentComponent, {
      width: '70%',
      data: {edit : edit}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        console.log(result)
        //change in backend
        if(result.type != 'Accident de travail' &&
          result.type != 'Maladie congénitale' && 
          result.type != 'Maladie générale' && 
          result.type != 'Maladie professionnelle'){
            this.employeService.creatAntecedentAutre(this.id_employe,result).subscribe(data => {
              this.dataSourceAutres.data.push(data)
              this.dataSourceAutres._updateChangeSubscription() 
            },
            error => console.log(error)); 
          }else if (result.type === 'Accident de travail' ){
            this.employeService.creatAntecedentAccidentTravail(this.id_employe,result.accident.id,result).subscribe(data => {
              this.dataSource.data.push(data)
              this.dataSource._updateChangeSubscription() 
            },
            error => console.log(error));             
          }else {
            this.employeService.creatAntecedentMaladie(this.id_employe,result.maladie.id,result).subscribe(data => {
              this.dataSourceMaladies.data.push(data)
              this.dataSourceMaladies._updateChangeSubscription() 
            },
            error => console.log(error));  
          }
      }
    });
  }
  update(edit: any,object) {  
    let dialogRef = this.dialog.open(AjouterAntecedentComponent, {
      width: '70%',
      data: {edit : edit , object: object}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        console.log(result)
        //change in backend
        if(result.type != 'Accident de travail' &&
          result.type != 'Maladie congénitale' && 
          result.type != 'Maladie générale' && 
          result.type != 'Maladie professionnelle'){
            this.employeService.updateAntecedentAntecedentAutre(this.id_employe,result.id,result).subscribe(data => {
              this.dataSourceAutres.data[this.dataSourceAutres.data.indexOf(object)] = result
              this.dataSourceAutres._updateChangeSubscription() 
            },
            error => console.log(error)); 
          }else if (result.type === 'Accident de travail' ){
            this.employeService.updateAntecedentAccidentTravail(result.id,result).subscribe(data => {
              this.dataSource.data[this.dataSource.data.indexOf(object)] = result
              this.dataSource._updateChangeSubscription() 
            },
            error => console.log(error));             
          }else {
            this.employeService.updateAntecedentMaladiee(result.id,result).subscribe(data => {
              this.dataSourceMaladies.data[this.dataSourceMaladies.data.indexOf(object)] = result
              this.dataSourceMaladies._updateChangeSubscription() 
            },
            error => console.log(error));  
          }
      }
    }); 
  }

  delete(object) {  
        if(object.type != 'Accident de travail' &&
          object.type != 'Maladie congénitale' && 
          object.type != 'Maladie générale' && 
          object.type != 'Maladie professionnelle'){
            console.log(object)
            this.employeService.deleteAntecedentAntecedentAutre(this.id_employe,object.id).subscribe(data => {
              this.dataSourceAutres.data.splice(this.dataSourceAutres.data.indexOf(object),1)
              this.dataSourceAutres._updateChangeSubscription() 
            },
            error => console.log(error)); 
          }else if (object.type === 'Accident de travail' ){
            this.employeService.deleteAntecedentAccidentTravail(object.id).subscribe(data => {
              this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
              this.dataSource._updateChangeSubscription()  
            },
            error => console.log(error));             
          }else {
            this.employeService.deleteAntecedentMaladiee(object.id).subscribe(data => {
              this.dataSourceMaladies.data.splice(this.dataSourceMaladies.data.indexOf(object),1)
              this.dataSourceMaladies._updateChangeSubscription() 
            },
            error => console.log(error));  
          }
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
    private formBuilder: FormBuilder,public dialog: MatDialog,
    private activitesMedicales : ActivitesMedicalesService) {}

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

    if (this.data.edit === 'true'){
      var dateDebut = new FormControl(new Date(this.data.object.dateDebut));  
      var dateFin : any =  new FormControl();
      if(this.data.object.dateFin != null){dateFin = new FormControl(new Date(this.data.object.dateFin));}             
      this.addForm = this.formBuilder.group({
        id: [this.data.object.id],
        type:  [this.data.object.type, Validators.required],
        designation: [this.data.object.designation],
        dateDebut: [dateDebut.value,Validators.required],
        dateFin: [dateFin.value],
        consequence: [this.data.object.consequence],
        observation: [this.data.object.observation],
        accident:[this.data.object.accident],
        maladie: [this.data.object.maladie]
      });
    }else{  
      this.addForm = this.formBuilder.group({
        type:  ['', Validators.required],
        designation: [''],
        dateDebut: [this.dateAujourdhuit.value,Validators.required],
        dateFin: [''],
        consequence: [''],
        observation: [''],
        accident:[''],
        maladie: ['']
      });
    } 
    console.log(this.addForm.value)
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
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
        var id_nature= result.nature;
        result.nature= null;
        console.log(result)        
        this.activitesMedicales.creatAccidentTravail(id_nature,result).subscribe(data => {
          this.accidentTravails.push(data)
        },
        error => console.log(error));
      }
    });
   }

}
