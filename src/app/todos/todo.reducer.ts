import { createReducer, on } from '@ngrx/store';
import { crear, toogle, editar, borrar, toogleAll, limpiar } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje de Ironman'),
    new Todo('Robar escudo del Capitán América'),
];

const _todoReducer = createReducer(initialState,
    on(crear, (state, { texto }) => [...state, new Todo(texto)]),
    on(limpiar, state => state.filter(todo => !todo.completado)),
    on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)),
    on(toogle, (state, { id }) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo;
            }
        });
    }),
    on(editar, (state, { id, texto }) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    texto
                }
            } else {
                return todo;
            }
        });
    }),
    on(toogleAll, (state, { completado }) => {
        return state.map(todo => {
            return {
                ...todo,
                completado
            }
        });
    }),
);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}