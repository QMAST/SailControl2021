import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import { Observable } from 'rxjs/internal/Observable';
import { ExistingState } from './existingState.model';

@Injectable()
export class ExistingStateApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  getExistingState(): Observable<ExistingState[]> {
    return this.http
      .get<ExistingState[]>(`${API_URL}/existingState`);
  }
}