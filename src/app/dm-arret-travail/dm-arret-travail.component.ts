import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from 'src/app/services/employe.service';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dm-arret-travail',
  templateUrl: './dm-arret-travail.component.html',
  styleUrls: ['./dm-arret-travail.component.css']
})
export class DmArretTravailComponent implements OnInit {

  private id_employe: number;
  private arreTrvails: any[];
  
    /* Table Structure */
  
    displayedColumns: string[] = ['motif','dateDebut','dateFin','medecin','Action-details','Action-edit','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private route: ActivatedRoute, private employeService: EmployeService, public dialog: MatDialog) { 
      this.id_employe = Number(this.route.snapshot.paramMap.get('id'));
    }
  
    ngOnInit() {
      this.employeService.getAllArretTravailsByEmployeId(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.arreTrvails = data;
          this.dataSource = new MatTableDataSource<any>(this.arreTrvails);
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
      let dialogRef = this.dialog.open(AjouterArretTravailComponent, {
        width: '70%',
        data: {
          id_employe : this.id_employe,
        }
      });
     }
}

@Component({
  selector: 'app-ajouter-arret-travail',
  templateUrl: './ajouter-arret-travail.component.html',
  styleUrls: ['./ajouter-arret-travail.component.css']
})
export class AjouterArretTravailComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  
  accidentTravails : any [] =[];
  
  maladiesProfessionnelles : any []= [];

  maladies: any []= [];
  
  
  
  
  constructor(public dialogRef: MatDialogRef<AjouterArretTravailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, private employeService: EmployeService,) {}

  ngOnInit() {
    this.employeService.getAllAntecedentsAccidentsTravailByEmployeId(this.data.id_employe).subscribe(
      data => {
        console.log(data)
        this.accidentTravails = data;
      },
      error => console.log(error)  
    );

    this.employeService.getAllAntecedentsMaladiesByEmployeId(this.data.id_employe).subscribe(
      data => {
        console.log(data)
        for(let i of data){
          if(i.type ==='Professionnelle') {
            this.maladiesProfessionnelles.push(i);
          }else{
            this.maladies.push(i)
          }
        }
      },
      error => console.log(error)  
    );

    this.addForm = this.formBuilder.group({
      motifArret: ['', Validators.required],
      dateDebut: [this.dateAujourdhuit.value,Validators.required],
      dateFin: ['',Validators.required],
      observation: [''], 
      accident: [''],
      maladie: ['']
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