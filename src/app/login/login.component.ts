import { Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'My-project';
  username: string;
  password: string;
  repo: any[50];
  user: string;
  repos: string;
  encrypted: {};
  constructor(private _serviceComponent: ServiceComponent, private router: Router) {
    this.username = "sidduvenkatapur";
    this.password = "siddudesigner1990";
  }

  public loginWithGitHub() {    
    this._serviceComponent.getUserLogin(this.username, this.password).subscribe(repos => {
      this.encrypted = {
        "auth":  btoa(this.username + ":" + this.password),
        "username": this.username
      }                     
      this.router.navigate(['/home', JSON.stringify(this.encrypted)]);
      console.log(this.encrypted);
      // for (var i = 0; i < repos.length; i++) {
      //  console.log(repos[i].name);
      // }
    });
  }



  ngOnInit() {
    this.username = "sidduvenkatapur";
    this.password = "siddudesigner1990";
  }

}
