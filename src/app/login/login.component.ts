
/*----- For Login with GitHub with  Basic Authentication-----*/

import { Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import { Router, ActivatedRoute} from "@angular/router";


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
  responseMessage: string;
  constructor(private _serviceComponent: ServiceComponent, private router: Router, private _router : ActivatedRoute) {

  }
/*----- Login with Authentication -----*/
  public loginWithGitHub() {
    
    if (!this.username || !this.password) {
        this.responseMessage = "Please enter the credentials";
        return;
    }
    

    this._serviceComponent.getUserLogin(this.username, this.password).subscribe(resp => {
        
      if (resp.status == 200) {
       
        this.username  = JSON.parse(resp["_body"]).login;        
        this.encrypted = {
          "auth": btoa(this.username + ":" + this.password),
          "username": this.username
        }
        this.router.navigate(['/home', JSON.stringify(this.encrypted)]);
      }
    }, error => {
      this.responseMessage = "Login Failed, Please try again";
    },
      () => {

      });
  }

  ngOnInit() {
    let logout = this._router.snapshot.paramMap.get("logout");
    if (logout) {
      this.username = null;
      this.password = null;
    }
  }

}
