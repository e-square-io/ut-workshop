import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { CollectionsService } from './collections.service';

type HttpClientMock = Partial<Record<keyof HttpClient, jest.Mock>>;
function createHttpClientMock(): HttpClientMock {
  return {
    get: jest.fn(() => of([])),
  };
}

describe('CollectionsService', () => {
  let service: CollectionsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CollectionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call for collections', fakeAsync(() => {
    service.startPolling(10);
    tick(5);
    service.stopPolling();
    flush();
    const expectedUrl = `https://api.opensea.io/api/v1/collections`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  }));
});

describe('CollectionsService polling', () => {
  let service: CollectionsService;
  let http: HttpClient;
  let httpGetSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: createHttpClientMock() }],
    });
    service = TestBed.inject(CollectionsService);
    http = TestBed.inject(HttpClient);
    httpGetSpy = jest.spyOn(http, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start and stop polling', fakeAsync(() => {
    service.startPolling(10);
    tick(20);
    service.stopPolling();
    flush();
    expect(http.get).toHaveBeenCalledTimes(3);
  }));
});
