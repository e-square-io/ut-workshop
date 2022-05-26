import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';

import { CollectionsService } from '../collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsComponent implements OnInit, OnDestroy {
  collections$ = this.collectionsService.collections$;

  constructor(private readonly collectionsService: CollectionsService) {}

  ngOnInit(): void {
    this.collectionsService.startPolling(30000);
  }

  ngOnDestroy(): void {
    this.collectionsService.stopPolling();
  }
}
