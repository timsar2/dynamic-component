import { Component, OnInit } from '@angular/core';
import { AdBannerComponent } from '../components/ad-banner/ad-banner.component';
import { AdItem } from '../data-access/ad-item.model';
import { AdService } from '../data-access/ad.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [AdBannerComponent],
  template: `
    <div>
      <app-ad-banner [ads]="ads"></app-ad-banner>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ads: AdItem[] = [];

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.initData();
  }
  async initData() {
    this.ads = await this.adService.getAdsAsync();
  }
}
