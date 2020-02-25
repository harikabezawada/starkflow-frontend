import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  createNote(userdata) {
    console.log(userdata)
  //  var headers_object = new HttpHeaders().append("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmlrYUBnbWFpbC5jb20iLCJuYW1lIjoibW91bmlrYSIsImlhdCI6MTU4MjU0NDEzOCwiZXhwIjoxNTgyNTQ1MDM4fQ.lB2fgI7Mq6CTIESP-BM1v-QKx1aBLqKqn_CPZrsVWXI");
   
//var t='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmlrYUBnbWFpbC5jb20iLCJuYW1lIjoibW91bmlrYSIsImlhdCI6MTU4MjU3ODAzOCwiZXhwIjoxNTgyNTc4OTM4fQ.GbobdJEmtzLIz22MU02EL_uZ0i2v9OdBbfrMsCC7UDY'
    return this.http.post(environment.ApiUrl + '/createNote', userdata).pipe(map(asset => {
      console.log(asset,'res')
      return asset;
    }))
  }
  editNote(userdata) {
    console.log(userdata)

    return this.http.put(environment.ApiUrl + '/editNote', userdata).pipe(map(asset => {
      return asset;
    }))
  }
  getNotes(userdata) {

  
    
    return this.http.post(environment.ApiUrl + '/getNotes', userdata).pipe(map(asset => {
      return asset;
    }))
  }
  deleteNote(userdata) {
    console.log(userdata)

    return this.http.post(environment.ApiUrl + '/deleteNotes', userdata).pipe(map(asset => {
      return asset;
    }))
  } 
  noteById(userdata) {
    console.log(userdata)

    return this.http.post(environment.ApiUrl + '/getNotesById', userdata).pipe(map(asset => {
      return asset;
    }))
  }
  loogedIn(userdata) {
    console.log(userdata)

    return this.http.post(environment.ApiUrl + '/login', userdata).pipe(map(asset => {
      return asset;
    }))
  }
}
