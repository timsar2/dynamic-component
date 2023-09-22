import { Injectable } from '@angular/core';

import { AdItem } from './ad-item.model';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  async getAdsAsync(componentsName: string[]): Promise<AdItem[]> {
    return new Promise<AdItem[]>(async (resolve) => {
      const addItems: AdItem[] = await this.getComponentsByName(componentsName);

      resolve(addItems);
    });
  }

  private getComponentsByName(componentsName: string[]): PromiseLike<AdItem[]> {
    return new Promise<AdItem[]>(async (resolve) => {
      const addItems: AdItem[] = []

      for (const name of componentsName) {
        const kebaName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

        const c = await import(`src/components/${kebaName}.component`);

        addItems.push(
          new AdItem(c.default, {
            headline: name,
            body: `${kebaName}.component Loaded`,
          })
        );
      }

      resolve(addItems);
    });
  }

}

