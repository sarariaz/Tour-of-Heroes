import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Costume } from './costume';


@Injectable({
  providedIn: 'root'
})
export class CostumesService {

  private costumesUrl = 'http://localhost:3000/costumes'; 

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

   // COSTUMES

    /** GET costumes from the server */
    getCostumes (): Observable<Costume[]> {
      return this.http.get<Costume[]>(this.costumesUrl);
      
    } 
 // add a new costume
  addNewCostume (costume: Costume): Observable<Costume> {
  return this.http.post<Costume>(this.costumesUrl, costume, this.httpOptions);
  
     }

  // delete a costume
  delCostume( costume: Costume | number): Observable<Costume> {
    const id = typeof costume === 'number' ? costume : costume.id;
    return this.http.delete<Costume>(`http://localhost:3000/costumes/${id}`, this.httpOptions);
   
  }
 // For HeroCostume Route
  getHeroCostume(id: number): Observable<Costume[]> {
    const url = `http://localhost:3000/herocostume/${id}`;
    return this.http.get<Costume[]>(url);
  }
  // delete a herocostume
  delHeroCostume( id:number): Observable<Costume> {
  //  const id = typeof costume === 'number' ? costume : costume.id;
    return this.http.put<Costume>(`http://localhost:3000/herocostume/${id}`, this.httpOptions);

}

//add costume to particular hero
addCostumeToHero(data){
  let hid = data.heroId;
  let cid = data.cId;
  return this.http.put<any>(`http://localhost:3000/herocostume/${hid}/${cid}`, this.httpOptions)
}



}

