import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent implements OnInit {

  @Input() pokemonName: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onCatchClick(): void {
    alert("You caught the pokemon: " + this.pokemonName + ". Congrats brother!")
  }

}
