import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private urlExportarExcel = BASE_URL + "/intranet/boleta/exportarExcel";
  private urlListarPorFiltros = BASE_URL + "/intranet/boleta/buscarPorFiltros";


  constructor(private http: HttpClient) { }

  exportarExcel(fechaInicio : string, fechaFin : string, idCliente : string) : Observable<Blob>{

    let params = new HttpParams();

    // Verificamos si cada parámetro es distinto de nulo y los agregamos a params
    if (fechaInicio !== null) {
      params = params.set('fechaInicio', fechaInicio.toString()); // Ajusta el formato según lo necesites
    }

    if (fechaFin !== null) {
      params = params.set('fechaFin', fechaFin.toString()); // Ajusta el formato según lo necesites
    }

    if (idCliente !== null) {
      params = params.set('idCliente', idCliente.toString());
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.urlExportarExcel, {
      headers,
      responseType: 'blob', // Esperamos una respuesta Blob (archivo)
      params // Enviamos los parámetros
    });
  }

  listarBoletasPorFiltros(fechaInicio : string, fechaFin : string, idCliente : string) : Observable<Boleta[]>{
    let params = new HttpParams();

    // Verificamos si cada parámetro es distinto de nulo y los agregamos a params
    if (fechaInicio !== null) {
      params = params.set('fechaInicio', fechaInicio.toString()); // Ajusta el formato según lo necesites
    }

    if (fechaFin !== null) {
      params = params.set('fechaFin', fechaFin.toString()); // Ajusta el formato según lo necesites
    }

    if (idCliente !== null) {
      params = params.set('idCliente', idCliente.toString());
    }
    return this.http.get<Boleta[]>(this.urlListarPorFiltros, {
      params// Enviamos los parámetros
    });
  }

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
