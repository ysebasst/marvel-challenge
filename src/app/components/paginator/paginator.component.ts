import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character.service';

type CharacterData = {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: Array<any>;
};

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  data: any;
  pages: number;
  page: number;

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.data = {};
    this.pages = 0;
    this.page = 0;
  }

  ngOnInit(): void {
    this.characterService.data$.subscribe((data: any) => {
      this.data = data;
      this.pages = Math.ceil(data?.total / data?.limit);
      this.page = data?.offset / data?.limit;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  goToPage(page: number) {
    console.log('page:', page);
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.router.navigate(['/search'], { queryParams: { ...params, page } });
      if (params['character']) {
        this.characterService.getForNameAndPage(params['character'], page);
      } else {
        this.characterService.getForPage(page);
      }
    });
  }
}
