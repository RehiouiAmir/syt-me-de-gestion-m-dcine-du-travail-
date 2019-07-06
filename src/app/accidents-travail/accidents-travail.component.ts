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
  selector: 'app-accidents-travail',
  templateUrl: './accidents-travail.component.html',
  styleUrls: ['./accidents-travail.component.css']
})
export class AccidentsTravailComponent implements OnInit {

  posteTravails : any[];
  departements : any[];
  societes : any[];
  sites : any[];

   /* Table Structure */
  
   displayedColumns: string[] = ['natureAccident','dateAccident','lieuAccident','circonstance','medecin','Action-details','Action-edit','Action-delete'];
   dataSource : MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   
   constructor(private activitesService : ActivitesMedicalesService,public dialog: MatDialog, 
                private employeService : EmployeService, private activiteMedical : ActivitesMedicalesService ) { }
 
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
   
 add(edit) {
  let dialogRef = this.dialog.open(DeclarerAccidentTravailComponent, {
    width: '70%',
    data: {edit:edit}
  });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
        var id_nature= result.nature;
        result.nature= null;
        console.log(result)        
        this.activitesService.creatAccidentTravail(id_nature,result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
        },
        error => console.log(error));
      }
    });
 }
 update(edit: any,object) {  
  let dialogRef = this.dialog.open(DeclarerAccidentTravailComponent, {
    width: '70%',
    data: {
      edit : edit, object : object,
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
      console.log(result)
      //change in backend
      this.activiteMedical.updateAccidentTravail(result.id,result).subscribe(data => {
        this.activitesService.getAllAccidentTravails().subscribe(
          data => {
            console.log(data)
            this.dataSource = new MatTableDataSource<any>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort; 
          },
          error => console.log(error)  
        ); 
      },
      error => console.log(error)); 
    }
  });
}

delete(object) { 
  //delete from backend
    this.activitesService.deleteAccidentTravail(object.id).subscribe(data => {
      console.log(data)
      this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
      this.dataSource._updateChangeSubscription()  
    },
    error => console.log(error));
}

details(object){
  let dialogRef = this.dialog.open(DetailsAccidentTravailComponent, {
  width: '50%',
  data: {object : object}
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
  natureAccidents : any[] = [];
  
  
  
  constructor(public dialogRef: MatDialogRef<DeclarerAccidentTravailComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, 
  private formBuilder: FormBuilder ,private activitesMedicales : ActivitesMedicalesService) {}
  
  ngOnInit() {

    this.activitesMedicales.getAllNatureAccidents().subscribe(
      data => {
        console.log(data) 
        this.natureAccidents = data;      
      },
      error => console.log(error)  
    );
  
    if(this.data.edit === 'true'){
      var date = new FormControl(new Date(this.data.object.date));        
      this.addForm = this.formBuilder.group({
        id: [this.data.object.id],
        nature: [this.data.object.natureAccident],
        date: [date.value,Validators.required],
        lieu: [this.data.object.lieu,Validators.required],
        compteRendu: [this.data.object.compteRendu],
        circonstance: [this.data.object.circonstance,Validators.required],
      });
    }else{
      this.addForm = this.formBuilder.group({
        nature: [''],
        date: [this.dateAujourdhuit.value,Validators.required],
        lieu: ['',Validators.required],
        compteRendu: [''],
        circonstance: ['',Validators.required],
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
  
  // details 
@Component({
  selector: 'app-details-accident-travail',
  templateUrl: './details-accident-travail.component.html',
  styleUrls: ['./details-accident-travail.component.css']
})
export class DetailsAccidentTravailComponent implements OnInit {
 
  constructor(public dialogRef: MatDialogRef<DetailsAccidentTravailComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() { }

  // close dialog  ajouter-arret-travail
  onNoClick(): void {
    this.dialogRef.close();
  }

}