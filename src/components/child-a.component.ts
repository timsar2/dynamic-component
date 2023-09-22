import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdComponent } from '../data-access/ad.component.interface';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-child-a',
  template: `
    <h1>This is Child A</h1>
    <div class="job-ad">
      <h4>data.headline: {{data.headline}}</h4>
      <p>data.body: {{data.body}}</p>
    </div>
  `,
})
export default class ChildAComponent implements AdComponent {
  @Input() data: any;
}
