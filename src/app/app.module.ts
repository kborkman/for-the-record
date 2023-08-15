import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';
import { RecordDetailComponent } from './records/record-detail/record-detail.component';
import { RecordsService } from './records/records.service';

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    RecordDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [RecordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
