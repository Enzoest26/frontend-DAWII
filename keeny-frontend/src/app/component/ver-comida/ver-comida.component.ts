import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Comida } from 'src/app/modal/comida';
import { CarritoService } from 'src/app/service/carrito/carrito.service';
import { ComidaService } from 'src/app/service/mantenimiento/comida/comida.service';

@Component({
  selector: 'app-ver-comida',
  templateUrl: './ver-comida.component.html',
  styleUrls: ['./ver-comida.component.css']
})
export class VerComidaComponent implements OnInit{

  @ViewChild('cantidad') inputRef!: ElementRef;
  @ViewChild('notificacionExito') notificacionExito!: TemplateRef<any>
  @ViewChild('notificacionError') notificacionError!: TemplateRef<any>

  comida! : Comida;
  constructor(private activatedRouter : ActivatedRoute, private comidaService : ComidaService, private carritoService: CarritoService, private snackBar : MatSnackBar){
  }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    this.comidaService.obtenerComidaPublico(id!).subscribe(data => this.comida = data);
  }

  agregarCarrito(){
    const cantidad = this.inputRef.nativeElement.value;
    let isAdded = this.carritoService.agregarProducto(this.comida.idComida, Number(cantidad), this.comida.precioComida, this.comida.descComida);

    if(isAdded == false){
      this.snackBar.openFromTemplate(this.notificacionError, {
        duration: 3 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }else{
      this.snackBar.openFromTemplate(this.notificacionExito, {
        duration: 3 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

}
