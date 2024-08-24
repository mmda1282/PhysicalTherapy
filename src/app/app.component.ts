import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
  
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
  
export class AppComponent {
  title = 'physicaltherapyfront';
}
