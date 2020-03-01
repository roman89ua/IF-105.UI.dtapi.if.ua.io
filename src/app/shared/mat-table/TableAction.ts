import { tableActionsType } from './mat-table.interface';

export class TableAction {
    static getAction(type: tableActionsType,edit:() => void, remove:() => void, route?:() => void) {
        const action = {
            edit,
            remove,
            route
         };
        (action[type])();
    }
}