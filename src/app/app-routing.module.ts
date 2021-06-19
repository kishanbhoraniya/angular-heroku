import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: 'project',
    component: ProjectComponent
  },   
  {
    path: 'project/:projectId',
    component: TaskComponent
  },
  {
    path: 'project/:projectId/tasks/:taskId',
    component: TaskComponent
  },  
  { path: "", redirectTo: "/project", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
