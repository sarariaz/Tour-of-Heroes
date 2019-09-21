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
      
    }  

/** POST: add a new POWER to the server */
addPower (power: Power): Observable<Power> {
  return this.http.post<Power>(this.powersUrl, power, this.httpOptions)
  
     }
  
    /** DELETE: delete the hero from the server */
    deleteHero (power: Power | number): Observable<Power> {
      const id = typeof power === 'number' ? power : power.id;
      const url = `http://localhost:3000/power/${id}`;
  
      return this.http.delete<Power>(url, this.httpOptions)
    
    }
// HEROPOWER TABLE 
    getHeroPowers(id: number): Observable<Power[]> {
      const url = `http://localhost:3000/heropowers/${id}`;
      return this.http.get<Power[]>(url);
    }

    addPowerToHero(data : any): Observable<any> {
      let id = data.heroId;
      let power_id = data.pId;
      console.log(data)
      return this.http.post<any>(`http://localhost:3000/heropowers/${id}/${power_id}` , this.httpOptions)
    }
  
  
    deletePowerFromHeroPower(id : number): Observable<any> {
      return this.http.delete<any>(`http://localhost:3000/heropowers/${id}`, this.httpOptions)
     
    }

   



};

 
