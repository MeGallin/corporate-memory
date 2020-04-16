import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutesModule } from './routes.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DateTimeComponent } from './shared/date-time/date-time.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ProfileComponent, HeaderComponent, FooterComponent, DateTimeComponent],
  imports: [BrowserModule, RoutesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
