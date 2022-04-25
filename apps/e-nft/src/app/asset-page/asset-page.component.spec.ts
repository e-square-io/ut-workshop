import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AssetsService } from '../assets.service';
import { AssetPageComponent } from './asset-page.component';

const ADDRESS = '0x123';
const TOKEN_ID = 'token123';

function createActivatedRouteMock(): Partial<ActivatedRoute> {
  return {
    paramMap: of(new Map().set('contractAddress', ADDRESS).set('tokenId', TOKEN_ID) as unknown as ParamMap),
  };
}
type AssetsServiceMock = Partial<Record<keyof AssetsService, jest.Mock<any>>>;
function createAssetsServiceMock(): AssetsServiceMock {
  return {
    getAsset: jest.fn(),
  };
}

describe('AssetPageComponent', () => {
  let component: AssetPageComponent;
  let fixture: ComponentFixture<AssetPageComponent>;
  let assetsService: AssetsService;
  let getAssetSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: createActivatedRouteMock() },
        { provide: AssetsService, useValue: createAssetsServiceMock() },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPageComponent);
    component = fixture.componentInstance;
    assetsService = TestBed.inject(AssetsService);
    getAssetSpy = jest.spyOn(assetsService, 'getAsset');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAsset once', () => {
    expect(assetsService.getAsset).toHaveBeenCalledTimes(1);
  });

  it('should call getAsset with address and token id', () => {
    expect(assetsService.getAsset).toHaveBeenCalledWith(ADDRESS, TOKEN_ID);
  });
});
