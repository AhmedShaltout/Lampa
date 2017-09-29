import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Task } from '../models/task';
import { User } from '../models/user';

@Injectable()
export class DataEditorService {
  private getTasksURL = '/task-api/get-task';
  private addTaskURL = '/task-api/add-task';
  private updateTaskURL = '/task-api/update-task/';
  private deleteTaskURL = '/task-api/delete-task/';
  private addUserURL = '/user-api/add-user';
  private loginUserURL = '/user-api/login';
  private logoutURL = '/user-api/logout';
  private isLoggedUserURL = '/user-api/isLogged';
  private searchTasksURL = '/task-api/search-task';

  constructor(private _http: Http) { }
  public getTasks() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.getTasksURL, options).
    map((response: Response) => response.json());
  }

  public addTask(task: Task) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.addTaskURL, JSON.stringify(task), options).
    map((response: Response) => response.json());
  }
  public updateTask(task: Task) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.put(this.updateTaskURL + task._id, JSON.stringify(task), options).
    map((response: Response) => response.json());
  }

  public deleteTask(_id: string) {
    return this._http.delete(this.deleteTaskURL + _id).
    map((response: Response) => response.json());
  }

  public isLoggedIn() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.isLoggedUserURL, options).
    map((response: Response) => response.json());
  }
  public login(user: User) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.loginUserURL, JSON.stringify(user), options).
    map((response: Response) => response.json());
  }

  public addUser(user: User) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.addUserURL, JSON.stringify(user), options).
    map((response: Response) => response.json());
  }

  public logOut() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this._http.post(this.logoutURL, options).subscribe();
  }

  public searchForDate(date: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.searchTasksURL, {DATE: date}, options).
    map((response: Response) => response.json());
  }
}

