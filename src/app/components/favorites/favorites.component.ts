import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/services/comic.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: Array<any>;

  constructor(private comicService: ComicService) {
    this.favorites = [];
  }

  ngOnInit(): void {
    this.comicService.getFavorites();
    this.comicService.favorites$.subscribe((favorites: Array<any>) => {
      this.favorites = favorites;
    });
  }

  getComic(id: number) {
    this.comicService.getById(id).subscribe((result: any) => {
      this.comicService.comic.next(result?.data?.results[0]);
      this.comicService.showModal.next(true);
    });
  }

  deleteFavorite(id: any) {
    this.comicService.deleteFavorite(id);
  }
}
