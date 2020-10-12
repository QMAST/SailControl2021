import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import { Observable } from 'rxjs/internal/Observable';
import { ExistingState } from './existingState.model';

@Injectable()
export class ExistingStateApiService {
  existingStateURL = `${API_URL}/existingState`
  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  getExistingState(): Observable<ExistingState[]> {
    return this.http
      .get<ExistingState[]>(this.existingStateURL);
  }
  postCommand(command: ExistingState): void {
    console.log(command)
    this.http.post<ExistingState>(this.existingStateURL,command).subscribe(resp => {
      console.log(resp)
    }
    )
  }
}