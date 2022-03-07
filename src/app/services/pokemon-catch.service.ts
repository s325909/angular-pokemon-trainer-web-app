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

    if (this.trainerService.inTrainerPokemon(pokemonName)) {
      alert("You already caught this Pokemon, Brother!")
      throw new Error("addToTrainerPokemons: Pokemon already caught");
    }

    // if (this.trainerService.inPokemon(pokemonId)) {
    //   throw new Error("addToTrainerPokemons: Pokemon already caught")
    // }


    const headers = new HttpHeaders({
      "content-type": "application/json",
      "x-api-key": apiTrainersKey,
    })

    this._loading = true;

    trainer.pokemon.push(pokemonName)

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
