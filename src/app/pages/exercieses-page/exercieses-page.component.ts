import { Component } from '@angular/core';
import { ExercisesComponent } from '../../components/exercises/exercises.component';

@Component({
  selector: 'app-exercieses-page',
  standalone: true,
  imports: [ExercisesComponent],
  templateUrl: './exercieses-page.component.html',
  styleUrl: './exercieses-page.component.css'
})
export class ExerciesesPageComponent {

}
