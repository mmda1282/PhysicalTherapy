import { bootstrapApplication } from '@angular/platform-browser'; 
import { provideHttpClient } from '@angular/common/http'; // Provide HttpClient 
import { AppComponent } from './app/app.component'; 
import { appConfig } from './app/app.config'; 
 
bootstrapApplication(AppComponent, { 
  providers: [ 
    provideHttpClient(), // Ensure HttpClient is provided here 
    ...appConfig.providers, 
  ], 
}).catch((err) => console.error(err));