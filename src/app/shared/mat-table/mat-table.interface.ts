export enum tableActionsType {
    Edit = 'edit',
    Remove = 'remove',
    Route = 'route',
}
export interface Column {
    columnDef: string;
    header: string;
    actions?: ActionButtons[];
}
export interface ActionButtons {
    type: tableActionsType;
    icon: string;
    matTooltip: string;
    aria_label?: string;
    route?: string;
}
