import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, throwError } from 'rxjs';

import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-asset-page',
  templateUrl: './asset-page.component.html',
  styleUrls: ['./asset-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetPageComponent {
  asset$ = this.route.paramMap.pipe(
    switchMap(params => {
      const contractAddress = params.get('contractAddress')?.trim();
      const tokenId = params.get('tokenId')?.trim();

      if (!contractAddress || !tokenId) {
        return throwError(() => 'Bad contract address or token ID');
      }
      return this.assetsService.getAsset(contractAddress, tokenId);
    }),
  );

  constructor(private readonly route: ActivatedRoute, private readonly assetsService: AssetsService) {}
}
