import { Component, OnInit } from '@angular/core';

import { AdItem } from '../data-access/ad-item.model';
import { AdService } from '../data-access/ad.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-ad-banner [ads]="ads"></app-ad-banner>
    </div>
  `,
})
export class AppComponent implements OnInit {
  ads: AdItem[] = [];

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.initData();
  }

  async initData() {
    const componentsName = ['ChildA', 'ChildB', 'ChildC', 'ChildX'];

    this.ads = await this.adService.getAdsAsync(componentsName);
  }
}
