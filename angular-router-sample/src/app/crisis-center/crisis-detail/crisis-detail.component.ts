import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Crisis } from '../crisis';
// import { CrisisService } from '../crisis.service';
import { DialogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  // crisis$: Observable<Crisis>;
  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private service: CrisisService
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    // let id = this.route.snapshot.paramMap.get('id');
    // this.crisis$ = this.service.getHero(id);
    
    // this.crisis$ = this.route.paramMap.pipe(
    //   switchMap((param: ParamMap) => 
    //     this.service.getCrisis(param.get('id'))
    //   )
    // );

    this.route.data.subscribe((data: {crisis: Crisis}) => {
      this.editName = data.crisis.name;
      this.crisis = data.crisis;
    });
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.crisis || this.crisis.name == this.editName) {
      return true;
    }

    this.dialogService.confirm('Discard changes?');
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
