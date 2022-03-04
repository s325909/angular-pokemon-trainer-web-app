import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PokemonCatchService } from 'src/app/services/pokemon-catch.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent implements OnInit {

  @Input() pokemonName: string = "";

  get loading(): boolean {
    return this.pokemonCatchService.loading;
  }

  constructor(private readonly pokemonCatchService: PokemonCatchService) { }

  ngOnInit(): void {
  }

  onCatchClick(): void {
    // Add pokemon to trainer pokemon
    this.pokemonCatchService.addToTrainerPokemon(this.pokemonName)
    .subscribe({
      next: (response: any) => {
        console.log("NEXT", response);
        
        
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    });


    alert("You caught the pokemon: " + this.pokemonName.charAt(0).toUpperCase() + this.pokemonName.slice(1) + ". Congrats brother!")
  }

}
