import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { PokemonCatchService } from 'src/app/services/pokemon-catch.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent implements OnInit {

  public hasPokemon: boolean = false;
  @Input() pokemonName: string = "";

  get loading(): boolean {
    return this.pokemonCatchService.loading;
  }

  constructor(
    private trainerService: TrainerService,
    private readonly pokemonCatchService: PokemonCatchService) { }

  ngOnInit(): void {
    this.hasPokemon = this.trainerService.inTrainerPokemon(this.pokemonName);
  }

  onCatchClick(): void {
    // Add pokemon to trainer pokemon
    this.pokemonCatchService.addToTrainerPokemon(this.pokemonName)
    .subscribe({
      next: (response: Trainer) => {
        // console.log("NEXT", response);
        this.hasPokemon = this.trainerService.inTrainerPokemon(this.pokemonName);
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    });


    if (!this.hasPokemon) {
      alert("You caught the pokemon: " + this.pokemonName.charAt(0).toUpperCase() + this.pokemonName.slice(1) + ". Congrats brother!");
    } else {
      alert("You released the pokemon: " + this.pokemonName.charAt(0).toUpperCase() + this.pokemonName.slice(1) + "... Why, brother!");
    }
  }

}
