import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AdministrationService } from 'src/app/services/administration.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dm-employe',
  templateUrl: './dm-employe.component.html',
  styleUrls: ['./dm-employe.component.css']
})
export class DmEmployeComponent implements OnInit {

  id : string ;
  user : any; 
  roleUser : string =''; 
  medecinInfo : any;
  imageSource : string;
  posteActuel : any;
  
  

  constructor(private route: ActivatedRoute,private tokenStorage: TokenStorageService,
              private breakpointObserver: BreakpointObserver,
              private administrationService : AdministrationService,) { 
    this.id = this.route.snapshot.paramMap.get('id');  
  }

  
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.administrationService.getUserByUsername(this.tokenStorage.getUsername()).subscribe(
        data => {
          this.user = data;
          this.roleUser = data.roles[0].name;
          console.log(this.user.roles[0]);
          this.administrationService.getEmployeByUserId(data.id).subscribe(
            data => {
              this.medecinInfo = data;
              console.log(this.medecinInfo);
              if(data.file== null){
                this.imageSource = "../../assets/img/pic-user.png";
              } else {
                this.imageSource = environment.fileUrl+data.file.fileName;            
              }
              for(var i in data.employe_posteTravails){
                if (data.employe_posteTravails[i].actuel === true){
                  this.posteActuel = data.employe_posteTravails[i];
                }
              }
            },
            error => console.log(error)  
          );
        },
        error => console.log(error)  
      );
    }  
  }

}
