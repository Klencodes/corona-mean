import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor( private router: Router) { }
  /**
   * Handle HttpReseponse errors.
   * @param error HttpErrorResponse
   * @returns JSON data of error with detail key
   */
  handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      return throwError({detail: 'An error occurred when processing request.'});
    } else if (error.status === 405) {
      return throwError({detail: 'An error occurred when processing request.'});
    }  else if (error.status === 404) {
      return throwError(error.error);
    } else if (error.status === 401) {
      // localStorage.removeItem('token');
      // localStorage.removeItem('user');
      // window.location.href = '/land-page';
      // return throwError({detail: 'Your session has expired. Signing Out'});
    } else if (error.status === 400) {
      return throwError(error.error);
    } else if (error.status > 415) {
      return throwError(error.error);
    }
    return throwError({detail: 'An error occurred when processing request.'});
  }

}
