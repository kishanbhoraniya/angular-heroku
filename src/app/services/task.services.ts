import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) { }

  getTask(projectId: number, taskId: number){
    return this.http.get(environment.baseURL + "/project/" + projectId + "/tasks/" + taskId);
  }

  getAllTasks(projectId: number) {
    return this.http.get(environment.baseURL + "/project/" + projectId + "/tasks/");
  }

  getAllSubTasks(projectId: number, taskId: number) {
    return this.http.get(environment.baseURL + "/project/" + projectId + "/tasks/" + taskId);
  }

  createTask(projectId : number, task: any) {
    return this.http.post(environment.baseURL + "/project/" + projectId + "/tasks/", task, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });
  }

  deleteTask(projectId : number, taskId: number) {
    return this.http.delete(environment.baseURL + "/project/" + projectId + "/tasks/" + taskId, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });
  }

  updateTask(projectId: number, taskId: number, task: any){
    return this.http.put(environment.baseURL + "/project/" + projectId + "/tasks/" + taskId + "/", task,{
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });   
  }

}