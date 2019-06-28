import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services imporation 
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-dm-informations-generales',
  templateUrl: './dm-informations-generales.component.html',
  styleUrls: ['./dm-informations-generales.component.css']
})
export class DmInformationsGeneralesComponent implements OnInit {

    id_employe : number;
    employeInfos : any;
    posteActuel : any; 

    constructor(private route: ActivatedRoute, private employeService: EmployeService) {
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
    } 
  
     
    
}
  
    
    
  
