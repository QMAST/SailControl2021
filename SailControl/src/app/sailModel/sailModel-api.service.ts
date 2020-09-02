import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import {SailModel} from './sailModel.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SailModelApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  getExams(): Observable<SailModel[]> {
    return this.http
      .get<SailModel[]>(`${API_URL}/sailLogicModel`);
  }
}