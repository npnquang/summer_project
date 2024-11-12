import { Component } from '@angular/core';
import { ErrorService } from '../../services/error/error.service';

/**
 * Component to show 
 *
 * @export
 * @class InvalidDataComponent
 * @typedef {InvalidDataComponent}
 */
@Component({
  selector: 'app-invalid-data',
  standalone: true,
  imports: [],
  templateUrl: './invalid-data.component.html',
  styleUrl: './invalid-data.component.css'
})
export class InvalidDataComponent {
  errors: string[] = [];

  
  /**
   * Creates an instance of InvalidDataComponent.
   *
   * @constructor
   * @param {ErrorService} errorService
   */
  constructor (private errorService: ErrorService) {
    this.errors = errorService.getError(); // get the list of error from the service to display
    this.errorService.flushError(); // reset the errors list to empty
  }
}
