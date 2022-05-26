import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { Asset } from './data';
import { toCamelCase } from './utils';

const OPEN_SEA_API = 'https://api.opensea.io/api/v1';
const DEFAULT_COLLECTION = 'zuzana-breznanikova-art';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  constructor(private readonly http: HttpClient) {}

  getAssets(): Observable<Asset[]> {
    type Response = { assets: Asset[] };
    const params = new HttpParams().set('collection', DEFAULT_COLLECTION);
    return this.http.get<Response>(`${environment.openseaApi}/assets`, { params }).pipe(
      toCamelCase<Response>(),
      map(res => res.assets),
    );
  }

  getAsset(contractAddress: string, tokenId: string): Observable<Asset> {
    return this.http.get(`${OPEN_SEA_API}/asset/${contractAddress}/${tokenId}`).pipe(toCamelCase<Asset>());
  }
}
