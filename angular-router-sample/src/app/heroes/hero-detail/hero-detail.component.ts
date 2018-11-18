import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) { }

  ngOnInit() {
    // let id = this.route.snapshot.paramMap.get('id');
    // this.hero$ = this.service.getHero(id);
    
    this.hero$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap) => 
        this.service.getHero(param.get('id'))
      )
    );
  }

  gotoHeroes(hero: Hero) {
    let heroId = hero ? hero.id : null;
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
