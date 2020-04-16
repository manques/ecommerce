import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, OnDestroy {
  searchText;
  sub;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.sub = this.route.queryParams.subscribe( params => {
      this.searchText = params['searchText'];
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
