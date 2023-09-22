import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AdItem } from '../../data-access/ad-item.model';
import { AdComponent } from '../../data-access/ad.component.interface';
import { AdDirective } from '../../directives/ad.directive';

@Component({
  standalone: true,
  selector: 'app-ad-banner',
  imports: [AdDirective],
  templateUrl: `./ad-banner.component.html`,
})
export class AdBannerComponent implements OnChanges, OnDestroy {
  @Input() ads: AdItem[] = [];

  currentAdIndex = -1;

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;

  private clearTimer: VoidFunction | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ads'].currentValue) {
      this.loadComponent();
      this.getAds();
    }
  }

  ngOnDestroy() {
    this.clearTimer?.();
  }

  loadComponent() {
    if (!this.adHost?.viewContainerRef) {
      return;
    }

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    if (this.ads.length < 1) {
      return;
    }

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
    }, 3000);
    this.clearTimer = () => clearInterval(interval);
  }
}
