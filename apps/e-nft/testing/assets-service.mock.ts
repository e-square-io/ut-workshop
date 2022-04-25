import { of } from 'rxjs';

import { AssetsService } from '../src/app/assets.service';
import { Asset } from '../src/app/data/asset';

export const ASSETS_MOCK: Asset[] = [
  {
    assetContract: {
      address: '0x123',
    },
    description: 'Asset 1 description',
    id: 1,
    imagePreviewUrl: 'https://image1.preview',
    imageUrl: 'https://image1',
    name: 'Asset 1',
    tokenId: 'token1',
  },
  {
    assetContract: {
      address: '0x456',
    },
    description: 'Asset 2 description',
    id: 2,
    imagePreviewUrl: 'https://image2.preview',
    imageUrl: 'https://image2',
    name: 'Asset 2',
    tokenId: 'token2',
  },
  {
    assetContract: {
      address: '0x789',
    },
    description: 'Asset 3 description',
    id: 3,
    imagePreviewUrl: 'https://image3.preview',
    imageUrl: 'https://image3',
    name: 'Asset 3',
    tokenId: 'token3',
  },
];

type AssetsServiceMock = Partial<Record<keyof AssetsService, jest.Mock<any>>>;
export function createAssetsServiceMock(): AssetsServiceMock {
  return {
    getAssets: jest.fn(() => of(ASSETS_MOCK)),
    getAsset: jest.fn(() => of(ASSETS_MOCK[0])),
  };
}
