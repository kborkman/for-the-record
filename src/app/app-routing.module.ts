import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordsComponent } from './records/records.component';
import { RecordDetailComponent } from './records/record-detail/record-detail.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailComponent } from './artists/artist-detail/artist-detail.component';

const routes: Routes = [
  { path: '', component: RecordsComponent },
  { path: 'records', component: RecordsComponent, children: [] },
  { path: 'records/:id', component: RecordDetailComponent },
  { path: 'artists', component: ArtistsComponent, children: [] },
  { path: 'artists/:id', component: ArtistDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
