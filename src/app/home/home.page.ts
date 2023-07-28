import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  edad: number = 0;
  altura: number = 0;
  peso: number = 0;
  cintura: number = 0;
  cuello: number = 0;
  cadera: number = 0;
  sexo: string = '';
  actividad: string = '';
  imc: number = 0;
  grasaCorporal: number = 0;
  indiceCinturaAltura: number = 0;
  sobrepeso: number = 0;
  caloriasMinimas: number = 0;
  caloriasPerder: number = 0;
  caloriasGanar: number = 0;
  consumoProteinas: number = 0;
  masaCorporalMagra: number = 0;
  TMB: number = 0;

  constructor(private modalController: ModalController) { }

  calcular() {

    const peso = this.peso;
    const altura = this.altura;
    const cuello = this.cuello;
    const cintura = this.cintura;
    const cadera = this.cadera;
    const alturaM = altura / 100;
    const log10 = (x: number) => Math.log(x) / Math.log(10);


    // Cálculo del IMC
    this.imc = peso / (alturaM * alturaM);
    if (this.sexo == 'Hombre') {
      this.grasaCorporal = 495 / (1.0324 - 0.19077 * log10(cintura - cuello) + 0.15456 * log10(altura)) - 450;
    } else if (this.sexo == 'Mujer') {
      this.grasaCorporal = 495 / (1.29579 - 0.35004 * log10(cintura + cadera - cuello) + 0.221 * log10(altura)) - 450;
    }

    // Índice cintura/altura
    this.indiceCinturaAltura = cintura / altura;

    // Peso ideal según estatura
    const pesoIdeal = altura - (this.sexo == 'Hombre' ? 100 : 104);
    this.sobrepeso = peso - pesoIdeal;

    // Cálculo de masa magra
    this.masaCorporalMagra = peso - (peso * this.grasaCorporal / 100);

    // Cálculo del TMB
    if (this.sexo == 'Hombre') {
      this.TMB = 66 + (13.7 * peso) + (5 * altura) - (6.8 * this.edad);
    } else if (this.sexo == 'Mujer') {
      this.TMB = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * this.edad);
    }

    // Cálculos del TMB y consumo de proteína según la actividad física
    if (this.actividad == 'Sedentario') {
      this.caloriasMinimas = this.TMB * 1.2;
      this.consumoProteinas = peso * 0.8;
  } else if (this.actividad == 'Ligero') {
      this.caloriasMinimas = this.TMB * 1.375;
      this.consumoProteinas = peso * 1.1;
  } else if (this.actividad == 'Moderado') {
      this.caloriasMinimas = this.TMB * 1.55;
      this.consumoProteinas = peso * 1.3;
  } else if (this.actividad == 'Intenso') {
      this.caloriasMinimas = this.TMB * 1.725;
      this.consumoProteinas = peso * 1.5;
  } else if (this.actividad == 'MuyIntenso') {
      this.caloriasMinimas = this.TMB * 1.9;
      this.consumoProteinas = peso * 1.7;
  } 
  }

  // Cálculo para determinar el peso ideal según estatura
  enPesoIdeal() {
    return Math.abs(this.sobrepeso) <= 1;
  }

  // Modal de advertencia
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
    });
    return await modal.present();
  }

// Todos los valores vuelven a 0
  borrar() {
    this.edad = 0;
    this.altura = 0;
    this.peso = 0;
    this.cintura = 0;
    this.cuello = 0;
    this.cadera = 0;
    this.sexo = '';
    this.actividad = '';
    this.imc = 0;
    this.grasaCorporal = 0;
    this.indiceCinturaAltura = 0;
    this.sobrepeso = 0;
    this.caloriasMinimas = 0;
    this.caloriasPerder = 0;
    this.caloriasGanar = 0;
    this.consumoProteinas = 0;
    this.masaCorporalMagra = 0;
  }
}
