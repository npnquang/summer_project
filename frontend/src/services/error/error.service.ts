import { Injectable } from '@angular/core';


/**
 * Service for storing and retrieving error messages
 *
 * @export
 * @class ErrorService
 * @typedef {ErrorService}
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  // list of error messages
  errors: string[];

  /**
   * Creates an instance of ErrorService.
   *
   * @constructor
   */
  constructor() {
    this.errors = [];
  }

  /**
   * Return the list of error
   *
   * @returns {string[]}
   */
  getError() {
    return this.errors;
  }

  /**
   * Add an error message to the list
   *
   * @param {string} error
   */
  addError(error: string) {
    this.errors.push(error);
  }

  
  /** Empty the error list */
  flushError() {
    this.errors = [];
  }
}
