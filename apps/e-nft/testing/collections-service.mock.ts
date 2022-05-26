import { Observable, ReplaySubject } from 'rxjs';

import { CollectionsService } from '../src/app/collections.service';

type CollectionsServiceMock = Partial<Record<keyof CollectionsService, jest.Mock | Observable<any>>>;
export function createCollectionsServiceMock(): CollectionsServiceMock {
  return {
    collections$: new ReplaySubject(),
    startPolling: jest.fn(),
    stopPolling: jest.fn(),
  };
}
