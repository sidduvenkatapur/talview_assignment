import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { ServiceComponent } from '../service/service.component';
import { ActivatedRoute, Router } from "@angular/router";
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {
  constructor(public _serviceComponent: ServiceComponent, private router: ActivatedRoute, private _router: Router) {
    // this._serviceComponent.getUserRepoContent().subscribe(user => {
    //   this.user = user;
    //   console.log(JSON.stringify(this.user));
    // });
  }


  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public message: string;
  public content: string
  public reponame: string;
  public authVar: string;
  public username: string;
  public responseMessage: string;
  
  public videoOptions: MediaTrackConstraints = {
    
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {

    let obj = JSON.parse(this.router.snapshot.paramMap.get('encrypted'));
    this.reponame = obj.reponame;
    this.authVar = obj.auth;
    this.username = obj.username;

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {

    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public pushContentToRepo() {      

    if (!this.message || this.message == "") {
      this.responseMessage = "Please enter the commit message!";
      console.log(this.responseMessage);
      return;
    }    

    let data = {
      "message": this.message,
      "name": "Siddu-Github-App",
      "email": "siddu-github-app@github.com",
      "content": this.webcamImage.imageAsBase64,
      "path": Date.now() + ".jpeg",
      "repo": this.reponame,
      "auth": this.authVar,
      "username": this.username
    };
    
    return this._serviceComponent.pushContent(data).subscribe(message => {      
      this.responseMessage = message;      
      console.log(this.responseMessage);
    }, error => {
      this.responseMessage = "Please enter commit message!!!!!";
      console.log(this.responseMessage);
    },
      () => {

    });
  }



}
