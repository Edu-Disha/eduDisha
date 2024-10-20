import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OVERVIEW_CONSTANTS } from './constants/overview.constants';
import { environment } from  "../../../../environments/envirnoment";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, GetStartedComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule],
  providers: [
    {
      provide: OVERVIEW_CONSTANTS.ENV_VAR,
      useValue: {
        owner: environment.ownerExp
      }
    },
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
