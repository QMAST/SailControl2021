import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import { Observable } from 'rxjs/internal/Observable';
import { sailCommand } from './sailCommand.model';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class SailCommandApiService {
  sailCommandURL = `${API_URL}/sailLogicCommand`
  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  getCommands(): Observable<sailCommand[]> {
    return this.http
      .get<sailCommand[]>(this.sailCommandURL);
  }

  postCommand(command: sailCommand): void {
    console.log(command)
    this.http.post<sailCommand>(this.sailCommandURL,command).subscribe(resp => {
      console.log(resp)
    }
    )
  }
}