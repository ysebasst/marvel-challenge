import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  search: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required]],
    });
  }

  onChange() {
    this.search = this.form.controls['search'].value;
    if (this.search === '') {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigate(['/search'], {
        queryParams: { character: this.search },
      });
    }
  }
}
