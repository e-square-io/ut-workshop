import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ASSETS_MOCK } from '../../../testing';
import { AppModule } from '../app.module';
import { Asset } from '../data';
import { AssetComponent } from './asset.component';

describe('AssetComponent', () => {
  let component: AssetComponent;
  let fixture: ComponentFixture<AssetComponent>;
  const asset = ASSETS_MOCK[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AssetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetComponent);
    component = fixture.componentInstance;
    component.asset = asset;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set router link', () => {
    const wrapper = fixture.debugElement.query(By.css('.wrapper'));
    expect(wrapper.attributes['ng-reflect-router-link']).toBe(`/asset/${asset.assetContract.address}/${asset.tokenId}`);
  });
});

describe('AssetComponent with Test host', () => {
  @Component({
    template: `<app-asset [asset]="asset"></app-asset>`,
  })
  class TestHostComponent {
    @Input() asset?: Asset;
  }

  const asset = ASSETS_MOCK[0];
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TestHostComponent, AssetComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.asset = asset;
    fixture.detectChanges();
  });

  it('should set router link', () => {
    const wrapper = fixture.debugElement.query(By.css('.wrapper'));
    expect(wrapper.attributes['ng-reflect-router-link']).toBe(`/asset/${asset.assetContract.address}/${asset.tokenId}`);
  });
});
