import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';
import { RecordDetailComponent } from './records/record-detail/record-detail.component';
import { RecordsService } from './shared/records.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddToCollectionComponent } from './add-to-collection/add-to-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    RecordDetailComponent,
    HeaderComponent,
    FooterComponent,
    AddToCollectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [RecordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
