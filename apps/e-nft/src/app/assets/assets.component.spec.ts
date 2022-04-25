import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { createAssetsServiceMock, ASSETS_MOCK } from '../../../testing';
import { AssetComponent } from '../asset/asset.component';
import { AssetsService } from '../assets.service';
import { AssetsComponent } from './assets.component';

describe('AssetsComponent', () => {
  let component: AssetsComponent;
  let fixture: ComponentFixture<AssetsComponent>;
  let assetsService: AssetsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AssetsComponent, AssetComponent],
      providers: [{ provide: AssetsService, useValue: createAssetsServiceMock() }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsComponent);
    component = fixture.componentInstance;
    assetsService = TestBed.inject(AssetsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load 3 assets', () => {
    const assetsContainer = fixture.debugElement.query(By.css('.assets'));
    expect(assetsContainer.children?.length).toBe(3);
  });
});
