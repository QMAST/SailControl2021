import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import { Observable } from 'rxjs/internal/Observable';
import { sailCommand } from './sailCommand.model';

@Injectable()
export class SailCommandApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  getCommands(): Observable<sailCommand[]> {
    return this.http
      .get<sailCommand[]>(`${API_URL}/sailLogicCommand`);
  }
}