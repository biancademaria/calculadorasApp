import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public primeiroValor: number;
  public segundoValor: number;

  public resultado: number;

  constructor() {}

  public soma() {
    this.resultado = this.primeiroValor + this.segundoValor;
  }

  public subtracao() {
    this.resultado = this.primeiroValor - this.segundoValor;
  }

  public multiplicacao() {
    this.resultado = this.primeiroValor * this.segundoValor;
  }

  public divisao() {
    this.resultado = this.primeiroValor / this.segundoValor;
  }

  public limpar() {
    this.primeiroValor = null;
    this.segundoValor = null;
    this.resultado = null;
  }

}
