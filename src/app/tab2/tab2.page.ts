import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = '';
  public resultado: string;

  private ponto = false; //é falsa porque ainda não se tem um ponto na tela. Se eu não levo a variável para ou tro lugar, ou seja, se ela for ser usada só aqui, é permitido deixá-la como privada. 

  private operacoes = ['+', '-', '*', '/']; //array!!

  constructor(public alertController: AlertController) { } // leva todas as funções do alertController para dentro da variável estabelecida, permitindo o uso de todas as suas funções e métodos. 

  public adicionarNumero(valor: string) {
    if(this.resultado) { //se o resultado estiver preenchido,
      this.apagarTudo(); //chama-se o método de apagar tudo para que a calculadora seja limpa.
    }
    this.calculo = this.calculo + valor
  }

  public adicionarPonto() {
    if (this.ponto) { //se for verdadeiro,
      return; //o método é parado, impedindo de se executar qualquer operação
    } //se for falso, 
    this.calculo += "."
    this.ponto = true;
  }

  public adicionarOperacao(operador: string) {
    if(this.resultado) { //método para continuar fazendo a conta usando o último resultado obtido
      this.calculo = this.resultado.toString();
      this.resultado = null;
    }

    const ultimo = this.calculo.slice(-1);
    if (this.operacoes.indexOf(ultimo) > -1) { //procura dentro do array o que foi passado no parâmetro. 
      return;
    }
    this.calculo += operador;
    this.ponto = false; //ao começar um novo número, será possível usar o ponto novamente. 
  }

  //método para apagar todos os números adicionados nos campos
  public apagarTudo() {
    this.calculo = ''; //apaga o que está escrito no cálculo
    this.resultado = null; //apaga o que está escrito no resultado
    this.ponto = false; //a variável será zerada ao ser limpa 
  }

  // método para apagar o último algarismo ou operador digitado
  public apagarUltimo() {
    const ultimo = this.calculo.slice(-1); //testa para ver se o último algarismo/operador é um ponto.
    if (ultimo == '.') {
      this.ponto = false;
    }

    this.calculo = this.calculo.slice(0, -1); //extrair partes de um texto: pega tudo que está dentro da variável cálculo, mas desconsidera o último caractere.
  }

  public calcularResultado() { //ao clicar no botão de '='
    try {
      this.resultado = evaluate(this.calculo); //o evaluate é chamado e ele irá calcular os valores colocados.
    } catch (e) { //se der erro, ao invés de fechar o programa inesperadamente, ele irá exibir uma mensagem.
      this.resultado = '';
      this.presentAlert('HOUVE UM ERRO!', 'O cálculo é inválido! Por falor, verifique os números e operadores inseridos.'); //('MENSAGEM DO HEADER', 'MENSAGEM')
    }
  }

  async presentAlert(titulo: string, mensagem: string) { //adicionar um alerta
    const alert = await this.alertController.create({
      header: titulo, //título do alerta
      message: mensagem, //mensagem do alerta
      buttons: ['OK']
    });

    await alert.present();
  }

}
