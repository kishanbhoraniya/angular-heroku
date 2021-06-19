import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'ngx-moment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectComponent } from './project/project.component';
import { ProjectService } from './services/project.services';
import { TaskService } from './services/task.services';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TaskComponent } from './task/task.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(), 
    MomentModule,  
  ],
  providers: [
    ProjectService,
    TaskService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
