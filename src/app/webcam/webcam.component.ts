import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { ServiceComponent } from '../service/service.component';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {
  constructor(public _serviceComponent: ServiceComponent, private router: ActivatedRoute, private _router: Router, private toastr: ToastrService) {
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
  // public AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
  // public REDIRECT_URI = "http://localhost:4200/github-oath";
  // public ENCODED_REDIRECT_URI = encodeURIComponent(this.REDIRECT_URI);
  // public CLIENT_ID = "d98629764485e809be8b";
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
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
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
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
    let data = {
      "message": this.message,
      "name": "Siddu",
      "email": "sidduvenkatapur@github.com",
      "content": this.webcamImage.imageAsBase64,
      "path": Date.now() + ".jpeg",
      "repo": this.reponame,
      "auth": this.authVar,
      "username": this.username
    };
    // console.log(this.message,this.webcamImage.imageAsBase64)

    console.log("data ", data);
    return this._serviceComponent.pushContent(data).subscribe(message => {
      console.log("message from push ", message);

      this.responseMessage = message;
      this.toastr.success(this.responseMessage)


    });
  }



}
