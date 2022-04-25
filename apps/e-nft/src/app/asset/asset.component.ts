import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Asset } from '../data';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetComponent {
  @Input() asset?: Asset;
}
