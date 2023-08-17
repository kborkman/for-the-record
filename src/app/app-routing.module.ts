import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordsComponent } from './records/records.component';
import { RecordDetailComponent } from './records/record-detail/record-detail.component';

const routes: Routes = [
  { path: '', component: RecordsComponent },
  { path: 'records', component: RecordsComponent, children: [] },
  { path: 'records/:id', component: RecordDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
