import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsComponent {
  readonly assets$ = this.assetsService.getAssets();

  constructor(private readonly assetsService: AssetsService) {}
}
