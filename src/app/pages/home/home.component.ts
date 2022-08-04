import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { CharacterService } from 'src/app/services/character.service';
import { ComicService } from 'src/app/services/comic.service';
import { Character, Data } from 'src/app/types/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  characters$: Observable<Character[]>;
  data$: Observable<Data>;
  search: string;
  page: number;
  subscriber: Subscription | undefined;
  comic: Character | any;
  favorites: Array<any>;

  constructor(
    private characterService: CharacterService,
    private comicService: ComicService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.characters$ = characterService.characters$;
    this.data$ = characterService.data$;
    this.favorites = [];
    this.search = '';
    this.page = 0;
  }
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  ngOnInit(): void {
    this.comicService.favorites$.subscribe(
      (favorites: Array<any>) => (this.favorites = favorites)
    );
    this.search = this.activatedRoute.snapshot.queryParams['character'];
    this.page = this.activatedRoute.snapshot.queryParams['page'];
    this.onChangeUrl();
    this.subscriber = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('The URL changed to: ' + event);
        this.search = this.activatedRoute.snapshot.queryParams['character'];
        this.onChangeUrl();
      });
  }

  onChangeUrl() {
    console.log('search:', this.search);
    console.log('page:', this.page);
    if (this.search === undefined && this.page === undefined) {
      this.characterService.get();
    } else if (this.search !== undefined && this.page === undefined) {
      this.characterService.getForName(this.search);
    } else if (this.search === undefined && this.page !== undefined) {
      this.characterService.getForPage(this.page);
    } else if (this.search !== undefined && this.page !== undefined) {
      this.characterService.getForNameAndPage(this.search, this.page);
    } else {
      this.characterService.get();
    }
  }

  getComic(url: string) {
    this.comicService.getWithUrl(url).subscribe((result: any) => {
      this.comicService.comic.next(result?.data?.results[0]);
      this.comicService.showModal.next(true);
    });
  }

  addThreeComicsToFavorites() {
    this.comicService.addThreeComicsToFavorites();
  }
}
