import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const { apiTrainers, apiTrainersKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  // Dependency Injection
  constructor(private readonly http: HttpClient) { }

  // Models, HttpClient, Observables, and RxJS operators
  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username)
      .pipe(
        switchMap((trainer: Trainer | undefined) => {
          if (trainer === undefined) { // trainer does not exist
            return this.createTrainer(username);
          }
          return of(trainer);
        })
      );
  }

  // Login

  // Check if trainer exist
  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(
        // RxJS Operators
        map((response: Trainer[]) => response.pop())
      )
  }

  // Create trainer
  private createTrainer(username: string): Observable<Trainer> {
    const trainer = {
      username,
      pokemon: [],
    }

    // API Headers config
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiTrainersKey,
    });

    return this.http.post<Trainer>(apiTrainers, trainer, { headers });
  }

  // IF trainer || Created trainer -> Store trainer
}
