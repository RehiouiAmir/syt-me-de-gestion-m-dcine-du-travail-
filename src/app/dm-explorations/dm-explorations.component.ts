import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivatedRoute } from '@angular/router';
import { AjouterExamenComplementaireComponent } from 'src/app/ajouter-examen-complementaire/ajouter-examen-complementaire.component';
import { AjouterOrientationMedicaleComponent } from 'src/app/ajouter-orientation-medicale/ajouter-orientation-medicale.component';
import { environment } from '../../environments/environment';
import { PopupService } from 'src/app/services/popup.service';
import { DialogsService } from 'src/app/dialogs/dialogs.service';


@Component({
  selector: 'app-dm-explorations',
  templateUrl: './dm-explorations.component.html',
  styleUrls: ['./dm-explorations.component.css']
})
export class DmExplorationsComponent implements OnInit {

  private id_employe: number;
  employeInfos : any = null;
  posteActuel : any = null;
  fileUploUrl : string;   
  imageSource : string;  
  
    /* Table Structure */
  
    displayedColumns: string[] = ['designation','description','resultat','dateResultat','medecin','Action-rapport','Action-edit','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

     /* Réorientation Table Structure */
  
     displayedColumnsOrientation: string[] = ['specialiste','motif','reponse','dateReponse','medecin','Action-edit','Action-delete'];
     dataSourceOrientation : MatTableDataSource<any>;
   
     @ViewChild('MatPaginatorOrientation') paginatorOrientation: MatPaginator;
     @ViewChild('MatSortOrientation') sortOrientation: MatSort;
    
    constructor(private route: ActivatedRoute, private employeService: EmployeService,public dialog: MatDialog,
      private popupService: PopupService,private dialogsService: DialogsService) { 
      this.id_employe = Number(this.route.snapshot.paramMap.get('id'));
    }
  
    ngOnInit() {
      this.fileUploUrl = environment.fileUrl;  
  
      this.employeService.getEmployeById(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.employeInfos = data;
          if(data.file== null){
            this.imageSource = "../../assets/img/pic-user.png";
          } else {
            this.imageSource = environment.fileUrl+data.file.fileName;            
          }
          for(var i in this.employeInfos.employe_posteTravails){
            if (this.employeInfos.employe_posteTravails[i].actuel === true){
              this.posteActuel = this.employeInfos.employe_posteTravails[i];
              console.log(this.posteActuel)
            }
          }
        },
        error => console.log(error)  
      );

      this.employeService.getAllExamenComplementaires(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        },
        error => console.log(error)  
      );

      this.employeService.getAllOrientationMedicales(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.dataSourceOrientation = new MatTableDataSource<any>(data);
          this.dataSourceOrientation.paginator = this.paginatorOrientation;
          this.dataSourceOrientation.sort = this.sortOrientation; 
        },
        error => console.log(error)  
      );

    }
  
    showFileExamen(object) {
      window.open(this.fileUploUrl+object.file.fileName);
    }
  

    // search table
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    applyFilterOrientation(filterValue: string) {
      this.dataSourceOrientation.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSourceOrientation.paginator) {
        this.dataSourceOrientation.paginator.firstPage();
      }
    }

    
 deleteOrientation(object){
  this.dialogsService
  .confirm('Confirmation', 'Voulez-vous vraiment supprimer cette orientation?')
  .subscribe(result => {
    if (result === true){
  //delete from backend
  this.employeService.deleteOrientationMedicales(object.id).subscribe(data => {
    console.log(data)
    this.dataSourceOrientation.data.splice(this.dataSourceOrientation.data.indexOf(object),1)
    this.dataSourceOrientation._updateChangeSubscription()  
    this.popupService.success("L'orientation médicale a été supprimé avec succès");
  },
  error => this.popupService.danger("L'orientation médicale n'a pas été supprimé"));
}
});
}

updateExamen(edit: any,object) {  
  let dialogRef = this.dialog.open(AjouterExamenComplementaireComponent, {
    width: '70%',
    data: {
      edit : edit, object : object,
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
      console.log(result)
      //change in backend
      this.employeService.updateExamen(result.id,result).subscribe(data => {
        this.employeService.getAllExamenComplementaires(this.id_employe).subscribe(
          data => {
            this.popupService.success("L'examen complémentaire a été modifié avec succès");                        
            console.log(data)
            this.dataSource = new MatTableDataSource<any>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort; 
          },
          error => console.log(error)  
        );
      },
      error => this.popupService.danger("L'examen complémentaire n'a pas été modifié")); 
    }
  });
}

updateOrientation(edit: any,object) {  
  let dialogRef = this.dialog.open(AjouterOrientationMedicaleComponent, {
    width: '70%',
    data: {
      edit : edit, object : object,
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
      console.log(result)
      //change in backend
      this.employeService.updateOrientation(result.id,result).subscribe(data => {
        this.employeService.getAllOrientationMedicales(this.id_employe).subscribe(
          data => {
            this.popupService.success("L'orientation médicale a été modifié avec succès");                                    
            console.log(data)
            this.dataSourceOrientation = new MatTableDataSource<any>(data);
            this.dataSourceOrientation.paginator = this.paginatorOrientation;
            this.dataSourceOrientation.sort = this.sortOrientation; 
          },
          error => console.log(error)  
        ); 
      },
      error => this.popupService.danger("L'orientation médicale n'a pas été modifié")); 
    }
  });
}


deleteExamen(object){
  this.dialogsService
  .confirm('Confirmation', 'Voulez-vous vraiment supprimer cet examen?')
  .subscribe(result => {
    if (result === true){
  //delete from backend
  this.employeService.deleteExamenComplementaire(object.id).subscribe(data => {
    console.log(data)
    this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
    this.dataSource._updateChangeSubscription()  
    this.popupService.success("L'examen complémentaire a été supprimé avec succès");
    },
    error => this.popupService.danger("L'examen complémentaire n'a pas été supprimé"));
  }
  });
}
}
