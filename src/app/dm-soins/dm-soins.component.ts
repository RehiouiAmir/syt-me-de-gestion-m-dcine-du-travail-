import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-dm-soins',
  templateUrl: './dm-soins.component.html',
  styleUrls: ['./dm-soins.component.css']
})
export class DmSoinsComponent implements OnInit {

  /* Table Structure */
  
  displayedColumns: string[] = ['code','typeSoins','dateSoins','medecin','infirmier','Action-details','Action-edit','Action-delete'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


 /* Demande Table Structure */
 
  displayedColumnsDemande: string[] = ['code','typeSoins','dateDemande','medecin','Action-details','Action-add'];
  dataSourceDemande : MatTableDataSource<any>;

  @ViewChild('MatPaginatorDemande') paginatorDemande: MatPaginator;
  @ViewChild('MatSortDemande') sortDemande: MatSort;
  
  constructor(private activitesService : ActivitesMedicalesService, public dialog: MatDialog) { }

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

  // search table
  applyFilterDemande(filterValue: string) {
   this.dataSource.filter = filterValue.trim().toLowerCase();

   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }

 // Operation Add, Edit, Delet
   
 add() {
  let dialogRef = this.dialog.open(AjouterSoinsComponent, {
    width: '70%',
    data: {}
  });
 }

}

// AjouterSoins

@Component({
  selector: 'app-ajouter-soins',
  templateUrl: './ajouter-soins.component.html',
  styleUrls: ['./ajouter-soins.component.css']
})
export class AjouterSoinsComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  

  acts= [
    {designation : 'acte 1' },
    {designation : 'acte 2' },
    {designation : 'acte 3' },
  ]
  

  constructor(public dialogRef: MatDialogRef<AjouterSoinsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      designationActe: ['',Validators.required],
      observation: [''], 
      valide:[false],
      dateActe: [''],      
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