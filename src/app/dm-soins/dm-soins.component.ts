import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dm-soins',
  templateUrl: './dm-soins.component.html',
  styleUrls: ['./dm-soins.component.css']
})
export class DmSoinsComponent implements OnInit {

  id_employe : number;

  /* Table Structure */
  
  displayedColumns: string[] = ['acte','dateSoins','observation','medecin','infirmier','Action-details','Action-edit','Action-delete'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


 /* Demande Table Structure */
 
  displayedColumnsDemande: string[] = ['typeSoins','dateDemande','medecin','Action-details','Action-add'];
  dataSourceDemande : MatTableDataSource<any>;

  @ViewChild('MatPaginatorDemande') paginatorDemande: MatPaginator;
  @ViewChild('MatSortDemande') sortDemande: MatSort;
  
  constructor(private route: ActivatedRoute,private activitesService : ActivitesMedicalesService,private employeService : EmployeService, public dialog: MatDialog) { 
    this.id_employe = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {

    this.employeService.getAllSoinsByEmployeId(this.id_employe).subscribe(
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
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
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
  

  actes :any [];

  constructor(public dialogRef: MatDialogRef<AjouterSoinsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,private employeService: EmployeService) {}

  ngOnInit() {

    this.employeService.getAllActes().subscribe(
      data => {
        console.log(data) 
        this.actes = data;      
      },
      error => console.log(error)  
    );
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
      this.dialogRef.close(this.data);
      }
  }

}