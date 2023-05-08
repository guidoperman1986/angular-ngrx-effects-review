import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/usuarios.actions'
import { mergeMap, tap } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { map, catchError } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable()
export class UsuariosEffects {
    constructor(private actions$: Actions, private usuariosService: UsuarioService) { }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            mergeMap(()=>this.usuariosService.getUsers()
                .pipe(
                    map(users => usuariosActions.cargarUsuariosSuccess({usuarios: users})),
                    catchError(err => of(usuariosActions.cargarUsuariosError({payload: err})))
                )
            )
        )
    );
}