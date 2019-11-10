import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
@Injectable()
export class ServiceComponent {

  // private username = "sidduvenkatapur";
  // private password = "siddudesigner1990";


  constructor(private _http: Http) {
    console.log('Github service started');
  }

  getUserLogin(username: string, password: string) {
    let ht = { headers: new Headers({ 'Authorization': (`Basic ${btoa(`${username}:${password}`)}`) }) };
    return this._http.get("https://api.github.com/user", ht).pipe(map(responce => responce.json()));
  }

  getUserRepoContent(authVar: string, repoName: string) {
    var username = "sidduvenkatapur";
    let ht = { headers: new Headers({ 'Authorization': (`Basic ${authVar}`) }) };
    return this._http.get(`https://api.github.com/repos/${username}/${repoName}/contents`, ht).pipe(map(responce => responce.json()));
  }

  getUserRepo(authVar: string) {
    console.log(authVar);
    let ht = { headers: new Headers({ 'Authorization': (`Basic ${authVar}`) }) };
    return this._http.get("https://api.github.com/user/repos", ht).pipe(map(responce => responce.json()));
  }

  pushContent(data: any) {
    let auth = { headers: new Headers({ 'Authorization': (`Basic ${data.auth}`) }) };
    let body = {
      "message": data.message,
      "committer": {
        "name": data.name,
        "email": data.email
      },
      "content": data.content
    };
console.log("aut push conent",data);

    return this._http.put(`https://api.github.com/repos/${data.username}/${data.repo}/contents/${data.path}`, body, auth).pipe(map(responce => {      
      if (responce.status == 201) {
        return "Successfully pushed"
      } else
        return "Push operation failed"
    }
    ));
  }
}