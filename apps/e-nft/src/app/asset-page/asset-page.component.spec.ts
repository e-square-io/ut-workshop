import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';

import { createAssetsServiceMock } from '../../../testing';
import { AssetsService } from '../assets.service';
import { AssetPageComponent } from './asset-page.component';

const ADDRESS = '0x123';
const TOKEN_ID = '__TOKEN_ID__';

function createActivatedRoute(): Partial<ActivatedRoute> {
  return {
    paramMap: of(new Map().set('contractAddress', ADDRESS).set('tokenId', TOKEN_ID) as unknown as ParamMap),
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
        { provide: AssetsService, useValue: createAssetsServiceMock() },
        { provide: ActivatedRoute, useValue: createActivatedRoute() },
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

  it('should call getAsset method', () => {
    expect(assetsService.getAsset).toHaveBeenCalledTimes(1);
    expect(assetsService.getAsset).toHaveBeenCalledWith(ADDRESS, TOKEN_ID);
  });
});
