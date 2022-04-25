import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AssetsService } from './assets.service';

const RESPONSE_MOCK = {
  assets: [
    {
      asset_contract: {
        address: '0x123',
      },
      description: 'Asset 1 description',
      id: 1,
      image_preview_url: 'https://image1.preview',
      image_url: 'https://image1',
      name: 'Asset 1',
      token_id: 'token1',
    },
    {
      asset_contract: {
        address: '0x456',
      },
      description: 'Asset 2 description',
      id: 2,
      image_preview_url: 'https://image2.preview',
      image_url: 'https://image2',
      name: 'Asset 2',
      token_id: 'token2',
    },
    {
      asset_contract: {
        address: '0x789',
      },
      description: 'Asset 3 description',
      id: 3,
      image_preview_url: 'https://image3.preview',
      image_url: 'https://image3',
      name: 'Asset 3',
      token_id: 'token3',
    },
  ],
};

describe('AssetsService', () => {
  let service: AssetsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AssetsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return assets collection', waitForAsync(() => {
    service.getAssets().subscribe(assets => {
      expect(assets.length).toBe(3);
    });

    const expectedUrl = `https://api.opensea.io/api/v1/assets?collection=zuzana-breznanikova-art`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(RESPONSE_MOCK);
    httpTestingController.verify();
  }));
});
