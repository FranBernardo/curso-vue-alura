import { TipoNoficacao } from "@/interfaces/INotificacao";
import { store } from "@/store";

export const nofiticarcaoMinixs = {
    methods: {
        notificar(tipo: TipoNoficacao, titulo: string, texto:string) {
            store.commit("NOTIFICAR", {
              titulo,
              texto,
              tipo
            });
          },
    }
}