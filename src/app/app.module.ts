import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutesModule } from './routes.module';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DateTimeComponent } from './shared/date-time/date-time.component';
import { CallbackComponent } from './components/callback/callback.component';
import { ViewMemoryComponent } from './components/view-memory/view-memory.component';
import { PostMemoryComponent } from './components/post-memory/post-memory.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { MemorySearchPipe } from './pipes/memory-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    DateTimeComponent,
    CallbackComponent,
    ViewMemoryComponent,
    PostMemoryComponent,
    LoadingSpinnerComponent,
    MemorySearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
