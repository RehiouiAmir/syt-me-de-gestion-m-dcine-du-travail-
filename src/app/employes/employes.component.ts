import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, ErrorStateMatcher, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Inject } from '@angular/core';

// Services imporation 
import { EmployeService } from '../services/employe.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';




@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {

  private id_employe: number;
  dataTable :  any[];
  posteTravails : any[];
  departements : any[];
  societes : any[];
  sites : any[];

  /* Table Structure */

  displayedColumns: string[] = ['matricule', 'numCarteChifa','dateNaissance', 'sexe','posteTravail','departement',
                               'site','societe','Action-choose'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeService: EmployeService, public dialog: MatDialog) {
   }

  ngOnInit() {
    
    this.employeService.getAllEmployes().subscribe(
      data => {
        console.log(data)
        this.dataTable = data;
        this.dataSource = new MatTableDataSource<any>(this.dataTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)  
    );

    this.employeService.getAllPosteTravails().subscribe(
      data => {
        console.log(data) 
        this.posteTravails = data;      
      },
      error => console.log(error)  
    );

    this.employeService.getAllDepartements().subscribe(
      data => {
        console.log(data) 
        this.departements = data;      
      },
      error => console.log(error)  
    );

    this.employeService.getAllSocietes().subscribe(
      data => {
        console.log(data) 
        this.societes = data;      
      },
      error => console.log(error)  
    );

    this.employeService.getAllSites().subscribe(
      data => {
        console.log(data) 
        this.sites = data;      
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
      let dialogRef = this.dialog.open(AjouterNvEmployeComponent, {
        width: '70%',
        data: {}
      });
    
      dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined){
            console.log(result)
            //change in backend
            this.employeService.createEmploye(result).subscribe(data => {
              this.dataSource.data.push(data)
              this.dataSource._updateChangeSubscription() 
            },
            error => console.log(error));
          }
      });
     }
  
}





/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


// Dialog [Modal Ajouter Nouveau Employe]

@Component({
  selector: 'app-ajouter-nv-employe',
  templateUrl: './ajouter-nv-employe.component.html',
  styleUrls: ['./ajouter-nv-employe.component.css']
})
export class AjouterNvEmployeComponent implements OnInit{

  addForm: FormGroup;
  
  constructor(public dialogRef: MatDialogRef<AjouterNvEmployeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              private formBuilder: FormBuilder,private employeService: EmployeService) {}
  
     //  Email control validator

     emailFormControl = new FormControl('', [
      Validators.email,
    ]);
  
    matcher = new MyErrorStateMatcher();

  ngOnInit() {
    
    this.addForm = this.formBuilder.group({
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      code: ['',Validators.required],
      numeroSecuriteSociale: [''],
      sexe: ['',Validators.required],
      dateNaissance: ['',Validators.required],
      lieuNaissance: ['',Validators.required],
      situationFamiliale: ['',Validators.required],
      groupeSanguin: [''],
      adresse: ['',Validators.required],
      telephone: [''],
      formationScolaire: [''],
      formationProfessionnelle: [''],
      qualification: [''],
      serviceNational: ['',Validators.required],
      travailAntecedent: ['']
    });

    this.addForm.addControl('emailFormControl', this.emailFormControl);
  }
  
  
  onSubmit() {
    if (!this.addForm.invalid){
        this.data = this.addForm.value;
        console.log(this.data)
        this.dialogRef.close(this.data);
      }
  }
    
  // close dialog  ajouter-nv-employe
  onNoClick(): void {
    this.dialogRef.close();
  }

  
}