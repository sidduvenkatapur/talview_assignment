import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DatabindingAssignmentComponent } from './databinding-assignment/databinding-assignment.component';
import { ComponentDirective } from './component.directive';
import { GithubComponent } from './github/github.component';
import { ServiceComponent } from './service/service.component';
import {  HttpModule, Http } from '@angular/http';
import { WebcamComponent } from './webcam/webcam.component';
import { WebcamModule } from 'ngx-webcam';
import {FormsModule} from '@angular/forms';
import {  OAuthService } from 'angular-oauth2-oidc';
import {Routes,RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component'
import {ToastrModule} from 'ngx-toastr';
const appRouters:Routes=[
  { path:"", component:LoginComponent},
  { path:"home/:encrypted", component:GithubComponent},
  { path:"webcam/:encrypted", component:WebcamComponent},
  { path:"content/:encrypted", component:ContentComponent}
  
]
@NgModule({
  declarations: [
    AppComponent,    
    ComponentDirective, GithubComponent, ServiceComponent, WebcamComponent, LoginComponent, ContentComponent, HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    WebcamModule,
    FormsModule,
    RouterModule.forRoot(appRouters),
    ToastrModule.forRoot()
  ],
  providers: [ServiceComponent, OAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
