
<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="formulario para criar uma nova tarefa."
      >
        <input
          type="text"
          class="input"
          placeholder="qual tarefa deseja incluir?"
          v-model="descricao"
        />
      </div>
            <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name:'FormularioPrincipal',
  components:{
    Temporizador
},
emits:['aoSalvar'],

data(){
  return{
    descricao:'',
    idProjeto: ''
  }
},
setup() {
    const store = useStore(key)
    return {
      projetos: computed(() => store.state.projetos)
    }
  },
methods:{
  finalizarTarefa(tempoDecorrido: number): void {
    this.$emit('aoSalvar',{
      duracaoEmSegundos:tempoDecorrido,
      descricao: this.descricao,
      projeto: this.projetos.find(proj => proj.id == this.idProjeto)
    })
    this.descricao = ''

  },
}
  
})
</script>
<style>
.formulario{
  color: var(--texto-primario);
  background-color: var(--bg-primario);
  
}
</style>