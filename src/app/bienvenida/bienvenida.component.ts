import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css'],
})
export class BienvenidaComponent implements OnInit {
  constructor(public jsonService: JsonService) {}
  // constructor() {}
  json: any;
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
    this.jsonService.getJson().subscribe((data) => {
      this.json = data;
      // console.log(this.json[0]);

      this.dataSource = new MatTableDataSource<Pelicula>(this.json);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  columnas: string[] = ['title', 'year'];
}

export class Pelicula {
  constructor(public title: string, public year: number) {}
}
