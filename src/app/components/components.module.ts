import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { ChartsModule } from 'ng2-charts';

// import { DonaComponent } from './dona/dona.component';
// import { IncrementadorComponent } from './incrementador/incrementador.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';


@NgModule({
  declarations: [
    ModalImagenComponent
  ],
  exports: [
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // ChartsModule
  ]
})
export class ComponentsModule { }
