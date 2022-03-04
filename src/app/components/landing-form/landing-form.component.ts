import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.model';
import { LandingService } from 'src/app/services/landing.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-landing-form',
  templateUrl: './landing-form.component.html',
  styleUrls: ['./landing-form.component.css']
})
export class LandingFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  // DI
  constructor(
    private readonly landingService: LandingService,
    private readonly trainerService: TrainerService,
  ) { }


  public loginSubmit(loginForm: NgForm): void {

    // username
    const { username } = loginForm.value;


    this.landingService.login(username)
      .subscribe({
        next: (trainer: Trainer) => {
          // redirect to trainer page
          this.trainerService.trainer = trainer;
          this.login.emit();
        },
        error: () => {
          // Handle that locally.
        }
      })
  }

}
