import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.model';
import { LandingService } from 'src/app/services/landing.service';

@Component({
  selector: 'app-landing-form',
  templateUrl: './landing-form.component.html',
  styleUrls: ['./landing-form.component.css']
})
export class LandingFormComponent {

  // DI
  constructor(private readonly landingService: LandingService) { }


  public loginSubmit(loginForm: NgForm): void {

    // username
    const { username } = loginForm.value;


    this.landingService.login(username)
      .subscribe({
        next: (trainer: Trainer) => {

        },
        error: () => {

        }
      })
  }

}
