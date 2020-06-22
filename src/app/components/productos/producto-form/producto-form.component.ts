import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {ProductoModel} from '../../../models/producto.model';
import {ProductoService} from '../../../services/producto.service';
@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
  providers: [AuthService, ProductoService]
})
export class ProductoFormComponent implements OnInit {

    producto : ProductoModel = new ProductoModel();
    file:any;
  // producto = {
  //   titulo: null,
  //   categoria: '',
  //   precio: null,
  //   descripcion: null,
  //   imagenProducto: null
  // };
  loader:Boolean = false;
  catego = [{
    id: '1',
    descripcion: '3D',
  },
  {
    id: '2',
    descripcion: 'Pascua',
  },
  {
    id: '3',
    descripcion: 'Reposteria',
  },
  {
    id: '4',
    descripcion: 'Comida',
  }];

  public page_title: string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private auth: AuthService,
    private _productoService: ProductoService,
  ) {

    this.page_title = 'Formulario de Carga de Productos';
    this.identity = this.auth.getIdentity();
    this.token = this.auth.getToken();

   }

  ngOnInit() {
      // Verificar si hay un usuario logeado
    if(this.identity == null && !this.identity.sub){
      this._router.navigate(["/login"]);
    }else{
      // crear objeto producto
      this.producto = new ProductoModel();    
    }
    
  }
  subiendoando(e){
    this.file = e.target.files;
    console.log(this.file);
    this.producto.imagenProducto = e.target.files[0];
  }
  guardarProduct(forma: NgForm) {
    //  console.log('ngForm', forma);
     console.log('productos por defecto', this.producto);
    // console.log('productos', forma.value);
    // console.log(this._productoService.pruebas());
    console.log('token', this.token);
    this._productoService.create(this.token,this.producto).subscribe(
      response =>{
        console.log("entra"); 
        console.log(response);
        this.producto = response.producto;
        
      },
      error => {
        console.log("No entra error"); 
        console.log(<any>error);
      }
    )
  }


 
  
  


}
