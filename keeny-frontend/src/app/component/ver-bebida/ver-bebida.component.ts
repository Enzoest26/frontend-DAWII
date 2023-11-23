import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Postre } from 'src/app/modal/Postre';
import { Bebida } from 'src/app/modal/bebida';
import { CarritoService } from 'src/app/service/carrito/carrito.service';
import { BebidaService } from 'src/app/service/mantenimiento/bebida/bebida.service';

@Component({
  selector: 'app-ver-bebida',
  templateUrl: './ver-bebida.component.html',
  styleUrls: ['./ver-bebida.component.css']
})
export class VerBebidaComponent implements OnInit{

  @ViewChild('cantidad') inputRef!: ElementRef;
  @ViewChild('notificacionExito') notificacionExito!: TemplateRef<any>
  @ViewChild('notificacionError') notificacionError!: TemplateRef<any>


  bebida! : Bebida;

  constructor(private activatedRouter : ActivatedRoute, private bebidaService : BebidaService, private carritoService: CarritoService, private snackBar : MatSnackBar){
  }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    this.bebidaService.obtenerPublicoBebidasPorId(id!).subscribe(data => this.bebida = data);
  }


  agregarCarrito(){
    const cantidad = this.inputRef.nativeElement.value;
    let isAdded = this.carritoService.agregarProducto(this.bebida.idBebida, cantidad, this.bebida.precioBebida, this.bebida.descripcionBebida);

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
