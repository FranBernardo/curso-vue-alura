import { TipoNoficacao } from "@/interfaces/INotificacao"
import { store } from "@/store"

type Notificador = {
    notificar: (tipo: TipoNoficacao, titulo: string, texto:string) => void
}

export default (): Notificador => {
    const notificar = (tipo: TipoNoficacao, titulo: string, texto:string): void => {
        store.commit('NOTIFICAR', {
            titulo,
            texto,
            tipo
        })
    }
    return {
        notificar
    }
}