import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdItem } from 'src/data-access/ad-item.model';
import { AdService } from 'src/data-access/ad.service';
import { AdDirective } from 'src/directives/ad.directive';
import { AdBannerComponent } from '../ad-banner/ad-banner.component';

@Component({
  standalone: true,
  selector: 'app-Parent',
  imports: [CommonModule, AdDirective, AdBannerComponent],
  template: `<div>
              <app-ad-banner [ads]="ads"></app-ad-banner>
            </div>`
})
export class ParentComponent implements OnInit {
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
