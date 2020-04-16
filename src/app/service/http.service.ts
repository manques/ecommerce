import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn:  'root'
})

export class HttpService {
  baseUrl = 'http://localhost:8000';
  options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': ''
    })
  };
  constructor(private http: HttpClient) {}

   // get header
   getHeaders() {
    this.options.headers = this.options.headers.set('Authorization', window.localStorage.getItem('token') || '');
  }

  // http post request
  post(path, data) {
    this.getHeaders();
    console.log(`${this.baseUrl}${path}`);
    console.log(data);
    console.log(this.options);
    return this.http.post(`${this.baseUrl}${path}`, data, this.options);
  }
  // post file type data
    postFile(path, data) {
      return this.http.post(`${this.baseUrl}${path}`, data);
    }

  // http get request
  get(path) {
    this.getHeaders();
    return this.http.get(`${this.baseUrl}${path}`, this.options);
  }

  // update
  patch(path, data) {
    return this.http.patch(`${this.baseUrl}${path}`, data, this.options);
  }

  // delete product by id
  delete(path) {
    this.getHeaders();
    return this.http.delete(`${this.baseUrl}${path}`, this.options);
  }
}
