import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-accidents-travail',
  templateUrl: './accidents-travail.component.html',
  styleUrls: ['./accidents-travail.component.css']
})
export class AccidentsTravailComponent implements OnInit {

   /* Table Structure */
  
   displayedColumns: string[] = ['code','matricule','numCarteChifa','posteTravail','natureAccident','dateAccident','lieuAccident','medecin','Action-details'];
   dataSource : MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   
   constructor(private activitesService : ActivitesMedicalesService,public dialog: MatDialog) { }
 
   ngOnInit() {
 
     this.activitesService.getAllAccidentTravails().subscribe(
       data => {
         console.log(data)
         this.dataSource = new MatTableDataSource<any>(data);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort; 
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

   // Operation Add, Edit, Delet
   
 add() {
  let dialogRef = this.dialog.open(DeclarerAccidentTravailComponent, {
    width: '70%',
    data: {}
  });
 }
}

@Component({
  selector: 'app-declarer-accident-travail',
  templateUrl: './declarer-accident-travail.component.html',
  styleUrls: ['./declarer-accident-travail.component.css']
  })
  export class DeclarerAccidentTravailComponent implements OnInit {
  
  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  
  
  
  constructor(public dialogRef: MatDialogRef<DeclarerAccidentTravailComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, 
  private formBuilder: FormBuilder) {}
  
  ngOnInit() {
  
  this.addForm = this.formBuilder.group({
    natureAccident: ['', Validators.required],
    dateAccident: [this.dateAujourdhuit.value,Validators.required],
    lieuAccident: ['',Validators.required],
    compteRendu: [''],
    circonstances: ['',Validators.required],
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
    this.dialogRef.close();
    }
  }
  
  }
  