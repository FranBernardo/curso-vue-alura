import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import FormularioProjeto from '../views/projetos/FormularioProjeto.vue'
import Lista from '../views/projetos/Lista.vue'


const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
   {
    path: '/projetos',
    component: Projetos,
    children: [
        {
            path: '',
            name: 'Projetos',
            component: Lista,
        },
        {
            path: 'novo',
            name: 'Novo projeto',
            component: FormularioProjeto
        },
        {
            path: ':id',
            name: 'editar projeto',
            component: FormularioProjeto,
            props: true
        },
    ]
   }
]


const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;