import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Observable } from 'rxjs';
import { Boleta } from 'src/app/modal/boleta';
import { BASE_URL } from 'src/app/util/constantes';


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private urlListarBoleta = BASE_URL + "/intranet/boleta/listar";

  constructor(private http: HttpClient) { }

  listarBoletas(): Observable<Boleta[]> 
  {
    return this.http.get<Boleta[]>(`${this.urlListarBoleta}`);
  }


  imprimir(encabezado : string[], cuerpo : Array<any>, titulo : string, guardar? : boolean ){
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: 'letter'
    });
    doc.text(titulo, doc.internal.pageSize.width / 2,25,{align: 'center'});
    autoTable(doc, {
      head: [encabezado],
      body: cuerpo,
    })

    if(guardar){
      const hoy = new Date();
      doc.save(hoy.getDate() + hoy.getMonth() + hoy.getFullYear() + hoy.getTime() + '.pdf');
      // doc.save(`${hoy.toISOString()}.pdf`);
    }
    else{

    }
  }
}
