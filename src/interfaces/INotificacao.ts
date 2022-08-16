export enum TipoNoficacao{
    SUCESSO,
    FALHA,
    ATENCAO
}
export interface INotificacao {
    titulo: string
    texto: string
    tipo: TipoNoficacao 
    id: number
}