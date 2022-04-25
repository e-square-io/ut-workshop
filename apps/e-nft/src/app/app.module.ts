import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AssetPageComponent } from './asset-page/asset-page.component';
import { AssetComponent } from './asset/asset.component';
import { AssetsComponent } from './assets/assets.component';

const routes: Routes = [
  { path: '', component: AssetsComponent },
  { path: 'asset/:contractAddress/:tokenId', component: AssetPageComponent },
];

@NgModule({
  declarations: [AppComponent, AssetsComponent, AssetComponent, AssetPageComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
