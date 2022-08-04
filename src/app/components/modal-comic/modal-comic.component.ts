import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/services/comic.service';

@Component({
  selector: 'app-modal-comic',
  templateUrl: './modal-comic.component.html',
  styleUrls: ['./modal-comic.component.scss'],
})
export class ModalComicComponent implements OnInit {
  showModal: boolean;
  comic: any;
  favorites: any;

  constructor(private comicService: ComicService) {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.comicService.showModal$.subscribe((showModal: boolean) => {
      this.showModal = showModal;
    });
    this.comicService.comic$.subscribe((comic: any) => {
      this.comic = comic;
    });
    this.comicService.favorites$.subscribe((favorites: any) => {
      this.favorites = favorites;
    });
  }

  closeModal() {
    this.comicService.showModal.next(false);
  }

  onFavorites(id: number) {
    const result = this.favorites.find((item: any) => item?.id === id);
    if (result) return result;
    return false;
  }

  addFavorite(favorite: any) {
    this.comicService.addFavorite(favorite);
  }
}
