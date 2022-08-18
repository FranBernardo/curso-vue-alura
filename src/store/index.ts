
import {INotificacao } from "@/interfaces/INotificacao";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue'
import { CADASTRA_TAREFAS, OBTER_TAREFAS, EDITAR_TAREFA } from "./tipo-acoes";
import http from "@/http"
import { ADICIONA_TAREFAS, DEFINIR_TAREFAS, EDITA_TAREFAS } from './tipo-mutacoes'
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulo/projeto";

export interface Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas:[],
        notificacoes: [],
        projeto: {
            projetos:[]
        }
        
    },
    mutations:{
        [DEFINIR_TAREFAS] (state, tarefas: ITarefa[]){
            state.tarefas = tarefas
        },
        'NOTIFICAR' (state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getDate()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            },3000)
        },
        [ADICIONA_TAREFAS](state, tarefa: ITarefa){
            state.tarefas.push(tarefa)
        },
        [EDITA_TAREFAS] (state, tarefa: ITarefa){
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
    },

    actions:{
        
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
            .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
         },
         [CADASTRA_TAREFAS]({commit}, tarefa: ITarefa){
            return http.post('/tarefas', tarefa)
            .then(resposta => commit(ADICIONA_TAREFAS, resposta.data))
        },
        [EDITAR_TAREFA]({commit}, tarefa: ITarefa){
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
            .then(()=> commit(EDITA_TAREFAS, tarefa))

        },
    },
    modules:{
        projeto
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}