import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const API_URL = "/32963742/James/api/v1";

// HTTP Header option
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


/**
 * Backend Service to handle CRUD operations
 *
 * @export
 * @class BackendService
 * @typedef {BackendService}
 */
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  
  /**
   * Creates an instance of BackendService.
   *
   * @constructor
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) { }

  
  /**
   * Send a GET request to get all drivers
   *
   * @returns {*}
   */
  getDrivers() {
    return this.http.get(API_URL + '/driver');
  }

  
  /**
   * Send a POST request to insert a new driver
   *
   * @param {*} driver
   * @returns {*}
   */
  addDriver(driver: any) {
    return this.http.post(API_URL + "/driver/add", driver, httpOptions);
  }

  
  /**
   * Send a DELETE request to delete a driver using their ID
   *
   * @param {*} id
   * @returns {*}
   */
  deleteDriver(id: any) {
    const params = new HttpParams()
      .set('id', id);
    return this.http.delete(API_URL + "/driver/delete", { params });
  }

  
  /**
   * Send a PUT request to update a driver using their ID
   *
   * @param {*} updateInfo
   * @returns {*}
   */
  updateDriver(updateInfo: any) {
    return this.http.put(API_URL + '/driver/update', updateInfo, httpOptions);
  }


  getPackages() {
    return this.http.get(API_URL + "/package");
  }


  addPackge(packageInfo: any) {
    return this.http.post(API_URL + "/package/add", packageInfo, httpOptions);
  }


  deletePackage(id: any) {
    const params = new HttpParams()
      .set('id', id);
    return this.http.delete(API_URL + "/package/delete", { params });
  }

  
  updatePackage(updateInfo: any) {
    return this.http.put(API_URL + '/package/update', updateInfo, httpOptions);
  }


  getStats() {
    return this.http.get(API_URL + "/stats");
  }
}
