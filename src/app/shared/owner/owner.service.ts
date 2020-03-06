import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  public API = '//thawing-chamber-47973.herokuapp.com/';
  public OWNER_API = this.API + '/owners';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    console.log(this.http.get(this.API + '/owners'));
    return this.http.get(this.API + '/owners');
  }

  get(dni: string) {
    console.log(this.http.get(this.OWNER_API + '/' + dni));
    return this.http.get(this.OWNER_API + `/search/findByDni?dni=${dni}`);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      console.log("Actualizando")
      console.log("href", owner.href)
      console.log(owner)
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.OWNER_API, owner);
      console.log("Agregando nuevo")
      console.log(owner)
    }
    return result;
  }

  remove(href: string) {
    console.log("Desde remove: ", href)
    return this.http.delete(href);
  }
}
