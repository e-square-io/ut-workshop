import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';

import { environment } from '../environments/environment';
import { Collection } from './data';
import { toCamelCase } from './utils';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private readonly collectionsSubject$ = new BehaviorSubject<Collection[]>([]);
  private readonly stopPollingSubject$ = new Subject<void>();
  private isPollingStarted = false;

  readonly collections$ = this.collectionsSubject$.asObservable();

  constructor(private readonly http: HttpClient) {}

  startPolling(duration = 3000): void {
    if (this.isPollingStarted) {
      return;
    }

    this.isPollingStarted = true;
    type Response = { collections: Collection[] };

    timer(0, duration)
      .pipe(
        switchMap(() => this.http.get<Response>(`${environment.openseaApi}/collections`)),
        toCamelCase<Response>(),
        tap(res => this.collectionsSubject$.next(res.collections)),
        takeUntil(this.stopPollingSubject$),
      )
      .subscribe();
  }

  stopPolling(): void {
    this.stopPollingSubject$.next();
    this.isPollingStarted = false;
  }
}
