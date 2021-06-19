import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) { }

  getProject(projectId: number){
    return this.http.get(environment.baseURL + "/project/" + projectId);
  }

  getAllProjects() {
    return this.http.get(environment.baseURL + "/project");
  }

  createProject(project : any) {
    const formData: FormData = new FormData();
    if(project?.avatar){
      formData.append('avatar', project.avatar, project.avatar.name); 
    }
    formData.append('name', project.name);   
    formData.append('description', project.description);
    return this.http.post(environment.baseURL + "/project/", formData);
  }

  deleteProject(project : number) {
    return this.http.delete(environment.baseURL + "/project/" + project, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });
  }

  updateProject(projectId: number, project: any){
    const formData: FormData = new FormData();
    if(project?.avatar){
      formData.append('avatar', project.avatar, project.avatar.name); 
    }
    formData.append('name', project.name);   
    formData.append('description', project.description);    
    return this.http.put(environment.baseURL + "/project/" + projectId +
     "/", formData);   
  }

  getProjectImage(url : string){
    return this.http.get(url);
  }

}