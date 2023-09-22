import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <a routerLink="/parent">Show Parent Component</a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent { }
