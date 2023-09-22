import { Injectable } from '@angular/core';
import { AdItem } from './ad-item.model';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  async getAdsAsync(): Promise<AdItem[]> {
    const componentsName = ['ChildA'];

    const addItems: AdItem[] = [];

    for (const name of componentsName) {
      const kebaName = name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase();

      const c = await import(`./${kebaName}.component`);

      addItems.push(
        new AdItem(c.default, {
          name: 'ChildA',
          bio: 'Child A component',
        })
      );
    }

    return new Promise<AdItem[]>((resolve) => {
      resolve(addItems);
    });
  }
}
