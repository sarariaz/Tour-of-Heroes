import { Injectable } from '@angular/core';
import { Power } from './power';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PowersService {

  private powersUrl = 'http://localhost:3000/powers';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

    /** GET powers from the server */
    getPowers (): Observable<Power[]> {
      return this.http.get<Power[]>(this.powersUrl)
       // .pipe(
        //  tap(_ => this.log('fetched heroes')),
       //   catchError(this.handleError<Power[]>('getHeroes', []))
      //  );
    }  

/** POST: add a new POWER to the server */
addPower (power: Power): Observable<Power> {
  return this.http.post<Power>(this.powersUrl, power, this.httpOptions)
  //.pipe(
   // tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
   // catchError(this.handleError<Hero>('addHero'))
 // );
     }
  
    /** DELETE: delete the hero from the server */
    deleteHero (power: Power | number): Observable<Power> {
      const id = typeof power === 'number' ? power : power.id;
      const url = `http://localhost:3000/power/${id}`;
  
      return this.http.delete<Power>(url, this.httpOptions)
     // .pipe(
      //  tap(_ => this.log(`deleted hero id=${id}`)),
      //  catchError(this.handleError<Hero>('deleteHero'))
     // );
    }



};

 
