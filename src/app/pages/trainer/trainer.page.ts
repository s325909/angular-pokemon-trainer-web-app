import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  private _caughtPokemon: Pokemon[] = [];

  get trainerPokemon() {
    return this._caughtPokemon;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
  ) { }

  ngOnInit(): void {
    const trainer = this.trainerService.trainer;

    if (trainer) {

      trainer.pokemon.forEach(pokemonName => {
        const pokemon = this.pokemonCatalogueService.pokemonByName(pokemonName.toString())
        if (pokemon) this._caughtPokemon.push(pokemon);
      });
    }
  }

}
