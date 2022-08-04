import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from '../types/character';
import { CharacterService } from './character.service';

type Params = {
  ts?: number;
  apikey?: string;
  hash?: string;
};

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  params: Params;
  characters$: Observable<Character[]>;
  private favorites: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  favorites$ = this.favorites.asObservable();
  showModal: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  showModal$ = this.showModal.asObservable();
  comic: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  comic$ = this.comic.asObservable();

  constructor(
    private http: HttpClient,
    private characterService: CharacterService
  ) {
    this.characters$ = characterService.characters$;
    this.params = {
      ts: 1000,
      apikey: 'c094a14f11fecfb06e17b099ae22a165',
      hash: 'ad5351a48889c062f991af3f30ff9e51',
    };
  }

  addThreeComicsToFavorites() {
    let allComics: string[] = [];
    this.characters$.subscribe((characters: Character[]) => {
      characters.forEach((character: Character) => {
        character.comics.items.forEach(
          (item: { resourceURI: string; name: string }) => {
            const id = item.resourceURI;
            if (!allComics.includes(id)) allComics = [...allComics, id];
          }
        );
      });
    });
    let randomComicsUrl: string[] = [];
    while (
      randomComicsUrl.length < 3 &&
      randomComicsUrl.length < allComics.length
    ) {
      let randomId = Math.floor(Math.random() * allComics.length);
      let url = allComics[randomId];
      if (!randomComicsUrl.includes(url)) {
        randomComicsUrl.push(url);
        this.getWithUrl(url).subscribe((result: any) => {
          const comic = result?.data?.results[0];
          this.addFavorite(comic);
        });
      }
    }
  }

  addFavorite(favorite: any) {
    const actualFavorites = this.getFavorites();
    if (!actualFavorites.find((item) => item.id === favorite.id)) {
      this.setFavorites([...actualFavorites, favorite]);
      this.getFavorites();
    }
  }

  deleteFavorite(id: any) {
    const actualFavorites = this.getFavorites();
    const newFavorites = actualFavorites.filter(
      (favorite) => favorite.id !== id
    );
    this.setFavorites(newFavorites);
    this.getFavorites();
  }

  getFavorites(): Array<any> {
    if (!localStorage.getItem('favorites')) {
      this.setFavorites();
    }
    this.favorites.next(JSON.parse(localStorage.getItem('favorites') || '[]'));
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  setFavorites(favorites: any = []) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  getWithUrl(url: string) {
    return this.http.get(
      url + '?' + new HttpParams({ fromObject: this.params })
    );
  }

  getById(id: number) {
    return this.http.get(
      'http://gateway.marvel.com/v1/public/comics/' +
        id +
        '?' +
        new HttpParams({ fromObject: this.params })
    );
  }
}
