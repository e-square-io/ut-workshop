import { AssetsService } from '../src/app/assets.service';

type AssetsServiceMock = Partial<Record<keyof AssetsService, jest.Mock>>;

export function createAssetsServiceMock(): AssetsServiceMock {
  return {
    getAsset: jest.fn(),
    getAssets: jest.fn(),
  };
}
