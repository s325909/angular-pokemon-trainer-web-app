import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const { apiTrainersKey, apiTrainers } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatchService {

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  reloadComponent(): void {

    const routeUrl = this.router.url
    if (routeUrl === "/trainer") {

      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.router.onSameUrlNavigation = 'reload'
      this.router.navigate(["/trainer"])
      console.log(this.router.url);
    }
  }

  constructor(
    private readonly http: HttpClient,
    // private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
    private readonly router: Router
  ) { }

  public addToTrainerPokemon(pokemonName: string): Observable<any> {

    if (!this.trainerService.trainer) {
      throw new Error("addToTrainerPokemons: There is no trainer");
    }

    const trainer: Trainer = this.trainerService.trainer;

    let hasPokemon: boolean = false;

    if (this.trainerService.inTrainerPokemon(pokemonName)) {
      hasPokemon = true;
    }


    const headers = new HttpHeaders({
      "content-type": "application/json",
      "x-api-key": apiTrainersKey,
    })

    this._loading = true;


    if (!hasPokemon) {
      trainer.pokemon.push(pokemonName)
    } else {
      // delete trainer.pokemon[trainer.pokemon.findIndex(p => p === pokemonName)];
      trainer.pokemon = trainer.pokemon.filter(p => p !== pokemonName);
    }

    return this.http.patch(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon]
    }, {
      headers
    }
    ).pipe(
      finalize(() => {
        this._loading = false,
          this.reloadComponent()
      })
    );
  }
}
