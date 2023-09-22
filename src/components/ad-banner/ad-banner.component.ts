import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AdItem } from '../../data-access/ad-item.model';
import { AdComponent } from '../../data-access/ad.component.interface';
import { AdDirective } from '../../directives/ad.directive';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ad-banner',
  imports: [CommonModule, AdDirective],
  templateUrl: `./ad-banner.component.html`,
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[] = [];

  currentAdIndex = -1;

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;

  private clearTimer: VoidFunction | undefined;

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    this.clearTimer?.();
  }

  loadComponent() {
    if (!this.adHost?.viewContainerRef || this.ads.length < 1) {
      return;
    }

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const componentRef = viewContainerRef.createComponent<AdComponent>(
      adItem.component
    );

    componentRef.instance.data = adItem.data;
  }

  getAds() {
    const interval = setInterval(() => {
      this.loadComponent();
    }, 2000);
    this.clearTimer = () => clearInterval(interval);
  }
}
