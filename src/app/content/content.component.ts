import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ServiceComponent } from '../service/service.component';
// import { }
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

  constructor(private router: ActivatedRoute, private _serviceComponent: ServiceComponent, private _router: Router) { }

  ngOnInit() {

    let obj = JSON.parse(this.router.snapshot.paramMap.get('encrypted'));
    this.reponame = obj.reponame;
    this.authVar = obj.auth;
    this.username = obj.username;

    this.getReposContent();

  }

  public getReposContent() {
    this._serviceComponent.getUserRepoContent(this.authVar, this.reponame).subscribe(repoContents => {
      this.repoContents = repoContents;      
      for (var i = 0; i < repoContents.length; i++) {
        console.log(repoContents[i].name);
      }
    });
  }

  public openWebcam(reponame : string) {   
    var obj= {
      auth:this.authVar,
      reponame:reponame,
      username: this.username
    }     
    this._router.navigate(['/webcam', JSON.stringify(obj)]);
  }
}
