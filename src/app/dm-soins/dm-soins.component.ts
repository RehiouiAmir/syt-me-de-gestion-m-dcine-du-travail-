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
  employeInfos : any = null;
  posteActuel : any = null;  

  /* Table Structure */
  
  displayedColumns: string[] = ['acte','dateSoins','etat','observation','medecin','infirmier','Action-details','Action-edit','Action-delete'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


 /* Demande Table Structure */
 
  displayedColumnsDemande: string[] = ['acte','dateSoins','observation','infirmier','Action-delete'];
  dataSourceDemande : MatTableDataSource<any>;

  @ViewChild('MatPaginatorDemande') paginatorDemande: MatPaginator;
  @ViewChild('MatSortDemande') sortDemande: MatSort;
  
  constructor(private route: ActivatedRoute,private activitesService : ActivitesMedicalesService,private employeService : EmployeService, public dialog: MatDialog) { 
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

    this.employeService.getAllSoinsByEmployeId(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
      },
      error => console.log(error)  
    );

    this.employeService.getAllSoinsInfirmierByEmployeId(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.dataSourceDemande = new MatTableDataSource<any>(data);
        this.dataSourceDemande.paginator = this.paginatorDemande;
        this.dataSourceDemande.sort = this.sortDemande; 
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
  let dialogRef = this.dialog.open(AjouterSoinsInfirmierComponent, {
    width: '70%',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
      console.log(result)
      //change in backend
      this.employeService.creatSoinsInfirmier(this.id_employe,result.idActe,result).subscribe(data => {
        this.dataSourceDemande.data.push(data)
        this.dataSourceDemande._updateChangeSubscription() 
      },
      error => console.log(error));
    }
});
 }

 update(edit: any,object) {  
  let dialogRef = this.dialog.open(AjouterSoinsComponent, {
    width: '70%',
    data: {
      id_employe : this.id_employe,
      edit : edit, object : object,
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
      console.log(result)
      //change in backend
      this.employeService.updateSoins(result.id,result).subscribe(data => {
        this.dataSource.data[this.dataSource.data.indexOf(object)] = result
        this.dataSource._updateChangeSubscription()   
      },
      error => console.log(error)); 
    }
  });
}

 delete(object) { 
  //delete from backend
    this.employeService.deleteSoins(object.id).subscribe(data => {
      console.log(data)
      this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
      this.dataSource._updateChangeSubscription()  

    },
    error => console.log(error));
}

delelteInfirmier(object) { 
  //delete from backend
    this.employeService.deleteSoinsInfirmier(object.id).subscribe(data => {
      console.log(data)
      this.dataSourceDemande.data.splice(this.dataSourceDemande.data.indexOf(object),1)
      this.dataSourceDemande._updateChangeSubscription()  

    },
    error => console.log(error));
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
    if(this.data.edit === 'true'){
      var date : any =  new FormControl();
      if(this.data.object.date != null){date = new FormControl(new Date(this.data.object.date));}
      else{date = this.dateAujourdhuit}  
      this.addForm = this.formBuilder.group({
        id : [this.data.object.id],
        acte: [this.data.object.acte,Validators.required],
        observation: [this.data.object.observation], 
        etat:[this.data.object.etat],
        date: [''],      
      });
    }else{
      this.addForm = this.formBuilder.group({
        idActe: ['',Validators.required],
        observation: [''], 
        etat:[false],
        date: [''],      
      });
    }
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

// AjouterSoins Infirmier

@Component({
  selector: 'app-ajouter-soins-infirmier',
  templateUrl: './ajouter-soins-infirmier.component.html',
  styleUrls: ['./ajouter-soins-infirmier.component.css']
})
export class AjouterSoinsInfirmierComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  

  actes :any [];

  constructor(public dialogRef: MatDialogRef<AjouterSoinsInfirmierComponent>,
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
      idActe: ['',Validators.required],
      observation: [''], 
      date: [this.dateAujourdhuit.value,Validators.required ],      
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