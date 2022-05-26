import { ComponentFixture, TestBed } from '@angular/core/testing';

import { createCollectionsServiceMock } from '../../../testing';
import { CollectionsService } from '../collections.service';
import { CollectionsComponent } from './collections.component';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;
  let collectionsService: CollectionsService;
  let startPollingSpy: jest.SpyInstance;
  let stopPollingSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionsComponent],
      providers: [{ provide: CollectionsService, useValue: createCollectionsServiceMock() }],
    }).compileComponents();
    collectionsService = TestBed.inject(CollectionsService);
    startPollingSpy = jest.spyOn(collectionsService, 'startPolling');
    stopPollingSpy = jest.spyOn(collectionsService, 'stopPolling');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start polling during init', () => {
    expect(collectionsService.startPolling).toHaveBeenCalledTimes(1);
  });

  it('should stop polling when destroyed', () => {
    component.ngOnDestroy();
    expect(collectionsService.stopPolling).toHaveBeenCalled();
  });
});
