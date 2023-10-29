import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators, } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TipoUsuario } from 'src/app/modal/tipo-usuario';
import { Usuario } from 'src/app/modal/usuario';
import { TipousuarioService } from 'src/app/service/mantenimiento/tipousuario/tipousuario.service';
import { UsuarioService } from 'src/app/service/mantenimiento/usuario/usuario.service';
import { PATTERN_ALFABETICO, PATTERN_ALFABETICO_ESPACIO } from 'src/app/util/constantes';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>
  public usuarios!: Usuario[];

  public tiposUsuarios !: TipoUsuario[];

  formModal : any;

  usuarioForm !: FormGroup; 

  submited : Boolean = true;

  constructor(private usuarioService : UsuarioService, private tipoUsuarioService : TipousuarioService, private formBuilder : FormBuilder, private dialog : MatDialog){
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO)]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO)]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      edad: ['', [Validators.required, Validators.max(100)]],
      estado: ['', Validators.required],
      tipoUsuario: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
   
  }

  onClickRegistrar(){
    this.formModal.show();
  }

  onClickAbrirModal(){
    this.dialog.open(this.dialogContent, {width: '500px', height: '800px'})
  }

  onClickCerrar(){
    this.formModal.hide();
  }

  onSubmit(){
    if(this.usuarioForm.invalid)
    {
      this.submited = false;
      return;
    }
    this.submited = true;
  }


  
  
}

