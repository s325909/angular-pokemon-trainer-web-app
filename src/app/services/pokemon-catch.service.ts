import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
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

  constructor(
    private readonly http: HttpClient,
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
  ) { }

  // Get the trainer based on Id

  // Path request with the trainerId and the pokemon

  public addToTrainerPokemon(pokemonName: string): Observable<any> {

    if (!this.trainerService.trainer) {
      throw new Error("addToTrainerPokemons: There is no trainer");
    }

    const trainer: Trainer = this.trainerService.trainer;

    // const pokemon: Pokemon | undefined = this.pokemonCatalogueService.pokemonByName;

    // if (!pokemon) {
    //   throw new Error("addToTrainerPokemons: no pokemon with name: " + pokemonName)
    // }

    // const hasPokemon: Pokemon | undefined = 

    let hasPokemon: boolean = false;

    if (this.trainerService.inTrainerPokemon(pokemonName)) {
      window.confirm("You already caught this Pokemon, Brother! \nWould you like to release it?")
      // throw new Error("addToTrainerPokemons: Pokemon already caught");
      hasPokemon = true;
    }

    // if (this.trainerService.inPokemon(pokemonId)) {
    //   throw new Error("addToTrainerPokemons: Pokemon already caught")
    // }


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
        this._loading = false
      })
    );
  }
}
