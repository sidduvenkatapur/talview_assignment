import { Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import {Router, ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {
  username: string;
  password: string;
  repo: any[50];
  user: string;
  repos: any;
  repoContents: any;
  authVar: string;
  
  constructor(private _serviceComponent: ServiceComponent, private route : ActivatedRoute,
              private router : Router) {
  }

  ngOnInit () {
    let obj =  JSON.parse(this.route.snapshot.paramMap.get('encrypted'));
    this.authVar = obj.auth;
    this.username = obj.username;
    this.showRepos();
  }
 

public  showRepos() {    
    this._serviceComponent.getUserRepo(this.authVar).subscribe(repos => {
      this.repos = repos;
    });
  }

  public  showReposContent(reponame : string) {  
    
    var obj= {
      auth:this.authVar,
      reponame:reponame,
      username: this.username
    }     
    this.router.navigate(['/content', JSON.stringify(obj)]);
    
    
  } 
}


