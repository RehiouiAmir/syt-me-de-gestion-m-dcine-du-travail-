import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { AdministrationService } from './../services/administration.service';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles : any[] = [];
  rolesString : string[];
  employe : any;
  user : any;
  fullname : any;
  source : string;

  constructor(private authService: AuthService,public dialogRef: MatDialogRef<RegisterComponent>,
    private administrationService : AdministrationService,@Inject(MAT_DIALOG_DATA) public data: any) { 
      this.employe = this.data.employe;    
      this.source = this.data.source;    
    }
  
  
  ngOnInit() { 
    this.employe = this.data.employe;
    this.source = this.data.source;        
    this.form.name = this.employe.nom + " " + this.employe.prenom;
    this.fullname = this.employe.nom + " " + this.employe.prenom;
    
    this.administrationService.getUserByEmployeId(this.employe.id).subscribe(
      data => {
        console.log(data) 
        if(data != null) {
          this.form.username = data.username;
          this.form.email = data.email;
          this.form.password = "*********";
          this.form.rolee = data.roles[0];
        }
        this.user = data;      
      },
      error => console.log(error)  
    );
    this.administrationService.getRoles().subscribe(
      data => {
        console.log(data) 
        this.roles = data;      
      },
      error => console.log(error)  
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.form.rolee.name);
    this.rolesString = [this.form.rolee.name];
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.rolesString);

    this.authService.signUpEmploye(this.signupInfo,this.employe.id).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
