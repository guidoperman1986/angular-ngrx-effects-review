import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as usuario from '../../store/actions'
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  user!: Usuario;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(({id})=>{
      this.store.dispatch(usuario.cargarUsuario({id}));
    })

    this.store.select('usuario').subscribe(({user})=>{
      this.user = user!
    })
  }

}
