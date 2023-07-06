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

      constructor(private modalController: ModalController) { }

      calcular() {
        const alturaM = this.altura / 100;
        const log10 = (x: number) => Math.log(x) / Math.log(10);

        this.imc = this.peso / (alturaM * alturaM);

        if (this.sexo == 'Hombre') {
          this.grasaCorporal = 495 / (1.0324 - 0.19077 * log10(this.cintura - this.cuello) + 0.15456 * log10(this.altura)) - 450;
        } else if (this.sexo == 'Mujer') {
          this.grasaCorporal = 495 / (1.29579 - 0.35004 * log10(this.cintura + this.cadera - this.cuello) + 0.221 * log10(this.altura)) - 450;
        }

        this.indiceCinturaAltura = this.cintura / this.altura;

        const pesoIdeal = this.altura - (this.sexo == 'Hombre' ? 100 : 104);
        this.sobrepeso = this.peso - pesoIdeal;

        this.masaCorporalMagra = this.peso - this.grasaCorporal;

        let TMB = 0;

        if (this.sexo == 'Hombre') {
          TMB = 66 + (13.7 * this.peso) + (5 * this.altura) - (6.8 * this.edad);
        } else if (this.sexo == 'Mujer') {
          TMB = 655 + (9.6 * this.peso) + (1.8 * this.altura) - (4.7 * this.edad);
        }

        if (this.actividad == 'Sedentario') {
          this.caloriasMinimas = TMB * 1.2;
        } else if (this.actividad == 'Moderado') {
          this.caloriasMinimas = TMB * 1.55;
        } else if (this.actividad == 'Activo') {
          this.caloriasMinimas = TMB * 1.9;
        }

        this.caloriasPerder = this.caloriasMinimas - 500;
        this.caloriasGanar = this.caloriasMinimas + 500;

        if (this.actividad == 'Sedentario') {
          this.consumoProteinas = this.peso * 0.8;
        } else if (this.actividad == 'Moderado') {
          this.consumoProteinas = this.peso * 1.3;
        } else if (this.actividad == 'Activo') {
          this.consumoProteinas = this.peso * 1.6;
        }
      }

      enPesoIdeal() {
        return Math.abs(this.sobrepeso) <= 1;
      }

      async presentModal() {
        const modal = await this.modalController.create({
          component: ModalComponent,
          componentProps: {
            'title': 'Atención',
            'message': 'Estos resultados son estimaciones basadas en fórmulas estándar. Sin embargo, es importante tener en cuenta que la tasa real de pérdida o ganancia de peso puede variar considerablemente según su composición corporal única, su edad, su sexo y otros factores individuales. Para obtener resultados más precisos y personalizados, se recomienda consultar a un profesional de la salud, como un nutricionista o médico, que pueda realizar un estudio corporal completo y brindarle recomendaciones específicas para su situación particular.'
          }
        });
        return await modal.present();
      }

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
