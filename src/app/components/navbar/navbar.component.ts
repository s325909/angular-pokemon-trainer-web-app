import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Trainer } from 'src/app/models/trainer.model';
import { LandingPage } from 'src/app/pages/landing/landing.page';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  get trainer(): Trainer | undefined{
    return this.trainerService.trainer;
  }
  
  constructor(
    private readonly trainerService: TrainerService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
  }

  handleLogout(): void {
    if (window.confirm('Are you sure?')) {
      this.trainerService.trainer = undefined;
      sessionStorage.clear();
      this.router.navigateByUrl("/landing");
    }
  }


}
