import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PokemonApiService } from 'src/app/_service/pokemon-api.service';
import { PokemonDetails } from 'src/app/_model/pokemonDetails';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  detailPokemon: PokemonDetails;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private pokemonService: PokemonApiService
  ) { }

  ngOnInit(): void {
    console.log("Hola: "+ this.data.name);
    this.pokemonService.getPokemonDetail(this.data.name).subscribe(dat => {
      this.detailPokemon = dat;
      console.log(dat);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  capitalizeFirstLetter(str: string | null): string {
    if (str === null || str === '') {
      return '';
    }
    return "- "+str.charAt(0).toUpperCase() + str.slice(1);
  }

}
