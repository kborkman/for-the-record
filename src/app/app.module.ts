import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';
import { RecordDetailComponent } from './records/record-detail/record-detail.component';
import { RecordsService } from './shared/records.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddToCollectionComponent } from './add-to-collection/add-to-collection.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailComponent } from './artists/artist-detail/artist-detail.component';
import { HomeComponent } from './home/home.component';
import { ImageGridComponent } from './shared/image-grid/image-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    RecordDetailComponent,
    HeaderComponent,
    FooterComponent,
    AddToCollectionComponent,
    ArtistsComponent,
    ArtistDetailComponent,
    HomeComponent,
    ImageGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [RecordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
