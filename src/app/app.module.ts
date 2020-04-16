import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RoutesModule } from "./routes.module";

import { AuthService } from "./services/auth.service";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DateTimeComponent } from "./shared/date-time/date-time.component";
import { CallbackComponent } from './components/callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    DateTimeComponent,
    CallbackComponent,
  ],
  imports: [BrowserModule, RoutesModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
