

/*------ For Displaying Repository content(Files)-------- */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ServiceComponent } from '../service/service.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  reponame: string;
  authVar: string;
  username: string;
  repoContents: any;

  constructor(private router: ActivatedRoute, private _serviceComponent: ServiceComponent, private _router: Router) {    

   }

  ngOnInit() {

    /*-----Building Auth Parameters -----*/
    let obj = JSON.parse(this.router.snapshot.paramMap.get('encrypted'));
    this.reponame = obj.reponame;
    this.authVar = obj.auth;
    this.username = obj.username;

    this.getReposContent();    

  }
 /*-----Displaying Repository Content-----*/

  public getReposContent() {
    this._serviceComponent.getUserRepoContent(this.authVar, this.reponame, this.username).subscribe(repoContents => {
      this.repoContents = repoContents;      
    });
  }

/*----- opening the webcam from repository content list for Capturing image-----*/

  public openWebcam(reponame : string) {   
    var obj= {
      auth:this.authVar,
      reponame:reponame,
      username: this.username
    }     
    this._router.navigate(['/webcam', JSON.stringify(obj)]);
  }
}
