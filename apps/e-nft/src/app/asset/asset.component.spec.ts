import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ASSETS_MOCK } from '../../../testing';
import { Asset } from '../data';
import { AssetComponent } from './asset.component';

describe('AssetComponent', () => {
  const asset = ASSETS_MOCK[0];
  let component: AssetComponent;
  let fixture: ComponentFixture<AssetComponent>;

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

  it('should show the name', () => {
    const nameEl = fixture.debugElement.query(By.css('.name'));
    expect((nameEl.nativeElement as HTMLParagraphElement).textContent).toBe(asset.name);
  });

  it('should construct the correct link', () => {
    const anchorEl = fixture.debugElement.query(By.css('a'));
    expect(anchorEl.attributes['ng-reflect-router-link']).toBe(
      `/asset/${asset.assetContract.address}/${asset.tokenId}`,
    );
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TestHostComponent, AssetComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.asset = asset;
    fixture.detectChanges();
  });

  it('should show the name', () => {
    const nameEl = fixture.debugElement.query(By.css('.name'));
    expect((nameEl.nativeElement as HTMLParagraphElement).textContent).toBe(asset.name);
  });
});
