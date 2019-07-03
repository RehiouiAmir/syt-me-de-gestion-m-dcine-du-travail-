import { ActivitesMedicalesService } from './../services/activites-medicales.service';
import { AdministrationService } from './../services/administration.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {

  displayedColumns: string[] = ['etat','date','effectuePar','duree','Action-convocation'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /* Maladies Table Structure */

  displayedColumnsMaladies: string[] = ['date','dureeRetard','Action-convocation'];
  dataSourceMaladies : MatTableDataSource<any>;

  @ViewChild('MatPaginatorMaladies') paginatorMaladies: MatPaginator;
  @ViewChild('MatSortMaladies') sortMaladies: MatSort;

  /* Autres antédédetns Table Structure */

  displayedColumnsAutres: string[] = ['type','designation','dateDebut','dateFin','medecin','Action-details','Action-edit','Action-delete'];
  dataSourceAutres : MatTableDataSource<any>;

  @ViewChild('MatPaginatorAutres') paginatorAutres: MatPaginator;
  @ViewChild('MatSortAutres') sortAutres: MatSort;

  calendrierVaccinal: any;  
  

  constructor(private formBuilder: FormBuilder,private employeService: EmployeService,
             private administrationService : AdministrationService,public dialog: MatDialog) { }

  ngOnInit() {

    this.employeService.getAllInjections().subscribe(
      data => {
        console.log(data)
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
      },
      error => console.log(error)  
    );

    this.employeService.getAllVisiteProgrammees().subscribe(
      data => {
        console.log(data)
        this.dataSourceMaladies = new MatTableDataSource<any>(data);
        this.dataSourceMaladies.paginator = this.paginatorMaladies;
        this.dataSourceMaladies.sort = this.sortMaladies; 
      },
      error => console.log(error)  
    );
  }

  convoquerEmployeInjection(injection) {
    let dialogRef = this.dialog.open(ConvoquerEmployeComponent, {
      width: '30%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(injection);
       if (result !== undefined){
         //change in backend

         console.log(result);
        this.administrationService.convoquerEmployeInjection(injection.id,result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
        },
        error => console.log(error));
       }
    });
   }

   convoquerEmployeVisiteProgrammee(visiteProgrammee) {
    let dialogRef = this.dialog.open(ConvoquerEmployeComponent, {
      width: '30%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(visiteProgrammee);
       if (result !== undefined){
         //change in backend

         console.log(result);
        this.administrationService.convoquerEmployeVisiteProgrammee(visiteProgrammee.id,result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
        },
        error => console.log(error));
       }
    });
   }

}


  // Ajouter Risque
  
  @Component({
    selector: 'app-convoquer-employe',
    templateUrl: './convoquer-employe.component.html',
    styleUrls: ['./convoquer-employe.component.css']
  })
  export class ConvoquerEmployeComponent implements OnInit {
  
    addForm: FormGroup;
    dateAujourdhuit = new FormControl(new Date()); 
    typeRisques : any[] = [];
    typeRisque: any;  
    vaccins :any [];
    constructor(public dialogRef: MatDialogRef<ConvoquerEmployeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private formBuilder: FormBuilder,private employeService: EmployeService,
      private activitesMedicalesService: ActivitesMedicalesService,
      private administrationService: AdministrationService) {
        this.typeRisque = data.typeRisque
      }
  
    ngOnInit() {
      this.addForm = this.formBuilder.group({
        objet: ['',Validators.required],
        contenu: ['',Validators.required],
        date: [this.dateAujourdhuit.value,Validators.required],
      });
    }
  
    // close dialog 
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