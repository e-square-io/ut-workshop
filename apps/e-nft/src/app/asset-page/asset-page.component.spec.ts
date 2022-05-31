import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReplaySubject } from 'rxjs';

import { createAssetsServiceMock } from '../../../testing';
import { AssetsService } from '../assets.service';
import { AssetPageComponent } from './asset-page.component';

const ADDRESS = '0x123';
const TOKEN_ID = 'token';

class ActivatedRouteMock {
  private paramMapSubject = new ReplaySubject<ParamMap>();
  readonly paramMap = this.paramMapSubject.asObservable();

  setParamMap(params: Params): void {
    this.paramMapSubject.next(convertToParamMap(params));
  }
}

describe('AssetPageComponent', () => {
  let component: AssetPageComponent;
  let fixture: ComponentFixture<AssetPageComponent>;
  let assetsService: AssetsService;
  let getAssetSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [RouterTestingModule],
      declarations: [AssetPageComponent],
      providers: [
        { provide: AssetsService, useValue: createAssetsServiceMock() },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPageComponent);
    component = fixture.componentInstance;
    assetsService = TestBed.inject(AssetsService);
    getAssetSpy = jest.spyOn(assetsService, 'getAsset');
    const route = TestBed.inject(ActivatedRoute);
    (route as unknown as ActivatedRouteMock).setParamMap({ contractAddress: ADDRESS, tokenId: TOKEN_ID });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAsset method', () => {
    expect(assetsService.getAsset).toHaveBeenCalled();
    expect(assetsService.getAsset).toHaveBeenCalledTimes(1);
    expect(assetsService.getAsset).toHaveBeenCalledWith(ADDRESS, TOKEN_ID);
  });
});
