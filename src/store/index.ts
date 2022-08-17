import IProjeto from "@/interfaces/IProjeto";
import {INotificacao } from "@/interfaces/INotificacao";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue'
import { CADASTRA_PROJETOS, EDITAR_PROJETOS, EXCLUIR_PROJETOS, OBTER_PROJETOS } from "./tipo-acoes";
import http from "@/http"
import { DEFINIR_PROJETOS } from './tipo-mutacoes'

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos:[],
        notificacoes: []
        
    },
    mutations:{
        'ADICIONA_PROJETO'(state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        'EDITAR_PROJETO' (state, projeto: IProjeto){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        'EXCLUIR' (state, id: string){
            state.projetos = state.projetos.filter(proj => proj.id !== id)
        },
        [DEFINIR_PROJETOS] (state, projetos: IProjeto[]){
            state.projetos = projetos
        },
        'NOTIFICAR' (state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getDate()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            },3000)
        }
    },

    actions:{
        [OBTER_PROJETOS] ({ commit }) {
           http.get('projetos')
           .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRA_PROJETOS](contexto, nomeDoProjeto: string){
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [EDITAR_PROJETOS](contexto, projeto: IProjeto){
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [EXCLUIR_PROJETOS]({ commit }, id: string){
            return http.delete(`/projetos/${id}`)
            .then(() => commit('EXCLUIR', id))
        }
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}