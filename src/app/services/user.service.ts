import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(environment.baseURL + "/user");
  }

}