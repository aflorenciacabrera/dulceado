import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  anio: number;
  nombre: string;
  apellido: string;
  constructor() { 
    this.anio = new Date().getFullYear();
    this.nombre = 'Florencia';
    this.apellido = 'Cabrera';
  }

  ngOnInit() {
  }

}
