import { AdministrationService } from './../services/administration.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';
import { EmployeService } from 'src/app/services/employe.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-risques-professionnels',
  templateUrl: './risques-professionnels.component.html',
  styleUrls: ['./risques-professionnels.component.css']
})
export class RisquesProfessionnelsComponent implements OnInit {
  sites : any[];
  
  /* Table Structure */
  
  displayedColumns: string[] = ['designation','medecin','Action-edit','Action-delete'];
  displayedColumnsRisque: string[] = ['designation','medecin','Action-edit','Action-delete'];  
  displayedColumnsPoste: string[] = ['designation','societe','site','departement','medecin','Action-Affecter-Risque'];
  dataSource : MatTableDataSource<any>;
  dataSourceRisque : MatTableDataSource<any>;
  dataSourcePosteTravail : MatTableDataSource<any>;
  typeRisques : any[] = [];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  @ViewChild('MatPaginatorRisque') PaginatorRisque: MatPaginator;
  @ViewChild('MatSortRisque') SortRisque: MatSort;

  @ViewChild('MatPaginatorType') PaginatorType: MatPaginator;
  @ViewChild('MatSortType') SortType: MatSort;
  
  @ViewChild('MatPaginatorPoste') PaginatorPoste: MatPaginator;
  @ViewChild('MatSortPoste') SortPoste: MatSort;

  constructor(private administrationService : AdministrationService,
    private activitesMedicalesService : ActivitesMedicalesService,
    private employeService: EmployeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.administrationService.getTypeRisques().subscribe(
      data => {
        console.log(data)
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.PaginatorType;
        this.dataSource.sort = this.SortType; 
      },
      error => console.log(error)  
    );

    this.administrationService.getRisques().subscribe(
      data => {
        console.log(data)
        this.dataSourceRisque = new MatTableDataSource<any>(data);
        this.dataSourceRisque.paginator = this.PaginatorRisque;
        this.dataSourceRisque.sort = this.SortRisque; 
      },
      error => console.log(error)  
    );

     this.employeService.getAllPosteTravails().subscribe(
       data => {
         console.log(data)
         this.dataSourcePosteTravail = new MatTableDataSource<any>(data);
         this.dataSourcePosteTravail.paginator = this.PaginatorPoste;
         this.dataSourcePosteTravail.sort = this.SortPoste; 
       },
       error => console.log(error)  
     );
  }

  add() {
    let dialogRef = this.dialog.open(AjouterTypeRisqueComponent, {
      width: '30%',
      data: {}
    });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined){
          //change in backend
          this.administrationService.ajouterTypeRisque(result).subscribe(data => {
            this.dataSource.data.push(data)
            this.dataSource._updateChangeSubscription() 
          },
          error => console.log(error));
        }
      });
   }

   addRisqueTypeRisque(typeRisque: any) : void {
    let dialogRef = this.dialog.open(RisquesTypeRisqueComponent, {
      width: '50%',
      data: {typeRisque: typeRisque}
    });
    dialogRef.afterClosed().subscribe();
   }

   addRisque() {
    let dialogRef = this.dialog.open(AjouterRisqueComponent, {
      width: '30%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
       if (result !== undefined){
         //change in backend
         this.administrationService.ajouterRisque(result.typee,result).subscribe(data => {
           this.dataSourceRisque.data.push(data)
           this.dataSourceRisque._updateChangeSubscription() 
         },
         error => console.log(error));
       }
    });
   }

   getRisques(postee: any) : void {
    let dialogRef = this.dialog.open(RisquesPosteComponent, {
      width: '50%',
      data: {postee: postee}
    });
    dialogRef.afterClosed().subscribe();
   }
}


@Component({
  selector: 'app-ajouter-typeRisque',
  templateUrl: './ajouter-typeRisque.component.html',
  styleUrls: ['./ajouter-typeRisque.component.css']
})
export class AjouterTypeRisqueComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  

  vaccins :any [];

  constructor(public dialogRef: MatDialogRef<AjouterTypeRisqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,private employeService: EmployeService,
    private activitesMedicalesService: ActivitesMedicalesService) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      designation: ['',Validators.required],
    });
  }

  // close dialog  ajouter-arret-travail
  onNoClick(): void {
  this.dialogRef.close();
  }
  
  onSubmit() {
  if (!this.addForm.invalid){
    this.data = this.addForm.value;
    this.dialogRef.close(this.data);
    }
  }

}



@Component({
  selector: 'app-risques-typeRisque',
  templateUrl: './risques-typeRisque.component.html',
  styleUrls: ['./risques-typeRisque.component.css']
})
export class RisquesTypeRisqueComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  
  vaccins :any [];
  typeRisque: any;  

    /* Table Structure */
    
    displayedColumns: string[] = ['designation','medecin','Action-edit','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<RisquesTypeRisqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,private employeService: EmployeService,public dialog: MatDialog,
    private administrationService: AdministrationService) {this.typeRisque = data.typeRisque    }

  ngOnInit() {

    this.administrationService.getRisquesByTypeRisque(this.typeRisque.id).subscribe(
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

  add() {
    let dialogRef = this.dialog.open(AjouterRisqueComponent, {
      width: '30%',
      data: {typeRisque: this.typeRisque},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
        this.administrationService.ajouterRisque(this.typeRisque.id,result).subscribe(data => {
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
    selector: 'app-ajouter-risque',
    templateUrl: './ajouter-risque.component.html',
    styleUrls: ['./ajouter-risque.component.css']
  })
  export class AjouterRisqueComponent implements OnInit {
  
    addForm: FormGroup;
    dateAujourdhuit = new FormControl(new Date()); 
    typeRisques : any[] = [];
    typeRisque: any;  
    vaccins :any [];
    constructor(public dialogRef: MatDialogRef<AjouterRisqueComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private formBuilder: FormBuilder,private employeService: EmployeService,
      private activitesMedicalesService: ActivitesMedicalesService,
      private administrationService: AdministrationService) {
        this.typeRisque = data.typeRisque
      }
  
    ngOnInit() {

      this.addForm = this.formBuilder.group({
        designation: ['',Validators.required],
        typee: ['',Validators],
      });

      this.administrationService.getTypeRisques().subscribe(
        data => {
          console.log(data) 
          this.typeRisques = data;      
        },
        error => console.log(error)  
      );
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



// Les Risques du Poste
  
@Component({
  selector: 'app-risques-poste',
  templateUrl: './risques-poste.component.html',
  styleUrls: ['./risques-poste.component.css']
})
export class RisquesPosteComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  
  vaccins :any [];
  postee: any;  

    /* Table Structure */
    
    displayedColumns: string[] = ['designation','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<RisquesPosteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,private employeService: EmployeService,public dialog: MatDialog,
    private activitesMedicalesService: ActivitesMedicalesService,
    private administrationService : AdministrationService) {this.postee = data.postee    }

  ngOnInit() {
    console.log(this.postee);
    this.administrationService.getRisquesByPosteId(this.postee.id).subscribe(
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  add() {
    let dialogRef = this.dialog.open(AffecterRisqueComponent, {
      width: '30%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
         this.administrationService.affecterRisque(this.postee.id,result.risquee.id,result).subscribe(data => {
           this.dataSource.data.push(result.risquee)
           this.dataSource._updateChangeSubscription() 
         },
         error => console.log(error));
      }
    });
   }

}

  // Affecter Risque
  
  @Component({
    selector: 'app-affecter-risque',
    templateUrl: './affecter-risque.component.html',
    styleUrls: ['./affecter-risque.component.css']
  })
  export class AffecterRisqueComponent implements OnInit {
  
    addForm: FormGroup;
    dateAujourdhuit = new FormControl(new Date()); 
    
    risques : any[];    
  
    constructor(public dialogRef: MatDialogRef<AffecterRisqueComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private formBuilder: FormBuilder,private employeService: EmployeService,
      private administrationService: AdministrationService) {}
  
    ngOnInit() {
      this.addForm = this.formBuilder.group({
        risquee: ['',Validators.required]
      });

      this.administrationService.getRisques().subscribe(
        data => {
          console.log(data)
          this.risques = data;
        },
        error => console.log(error)  
      );
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onSubmit() {
      console.log(this.addForm.value);
      if (!this.addForm.invalid){
        this.data = this.addForm.value;
        console.log(this.data)
        this.dialogRef.close(this.data);
      }
    }

}