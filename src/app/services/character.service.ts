import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Character, Data } from '../types/character';

type Params = {
  limit: number;
  offset?: number;
  ts?: number;
  apikey?: string;
  hash?: string;
  nameStartsWith?: string;
};

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  URL = 'https://gateway.marvel.com/v1/public/characters?';
  private data: BehaviorSubject<Data> = new BehaviorSubject<Data>({});
  data$ = this.data.asObservable();
  private characters: BehaviorSubject<Character[]> = new BehaviorSubject<
    Character[]
  >([]);
  characters$ = this.characters.asObservable();
  private page: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  page$ = this.page.asObservable();

  params: Params;

  constructor(private http: HttpClient) {
    this.params = {
      limit: 10,
      offset: 0,
      ts: 1000,
      apikey: 'c094a14f11fecfb06e17b099ae22a165',
      hash: 'ad5351a48889c062f991af3f30ff9e51',
    };
  }

  get() {
    const urLCompleted =
      this.URL + new HttpParams({ fromObject: { ...this.params } });
    console.log(urLCompleted);
    return this.http.get(urLCompleted).subscribe((result: any) => {
      this.data.next(result?.data);
      this.characters.next(result?.data?.results);
    });
  }

  getForName(nameStartsWith: string) {
    const urLCompleted =
      this.URL +
      new HttpParams({ fromObject: { nameStartsWith, ...this.params } });
    console.log(urLCompleted);
    return this.http.get(urLCompleted).subscribe((result: any) => {
      this.data.next(result?.data);
      this.characters.next(result?.data?.results);
    });
  }

  getForPage(page: number) {
    console.log('service =', 'page:', page);
    const urLCompleted =
      this.URL +
      new HttpParams({
        fromObject: { ...this.params, offset: this.params?.limit * page },
      });
    console.log(urLCompleted);
    return this.http.get(urLCompleted).subscribe((result: any) => {
      this.data.next(result?.data);
      this.characters.next(result?.data?.results);
    });
  }

  getForNameAndPage(nameStartsWith: string, page: number) {
    console.log('service =', 'nameStartsWith:', nameStartsWith);
    console.log('service =', 'page:', page);
    const urLCompleted =
      this.URL +
      new HttpParams({
        fromObject: {
          nameStartsWith,
          ...this.params,
          offset: this.params?.limit * page,
        },
      });
    console.log(urLCompleted);
    return this.http.get(urLCompleted).subscribe((result: any) => {
      this.data.next(result?.data);
      this.characters.next(result?.data?.results);
    });
  }
}
