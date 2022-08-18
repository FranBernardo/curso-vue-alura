
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
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name:'FormularioPrincipal',
  components:{
    Temporizador
},
emits:['aoSalvar'],
setup(props, { emit }) {
    const store = useStore(key)
    const descricao = ref("")
    const idProjeto = ref("")
    const projetos = computed(() => store.state.projeto.projetos)
    const finalizarTarefa = (tempoDecorrido: number): void => {
    emit('aoSalvar',{
      duracaoEmSegundos:tempoDecorrido,
      descricao: descricao.value,
      projeto: projetos.value.find(proj => proj.id == idProjeto.value)
    })
    descricao.value = ''

  }
    return {
      descricao,
      idProjeto,
      projetos,
      finalizarTarefa
    }
  },
})
</script>
<style>
.formulario{
  color: var(--texto-primario);
  background-color: var(--bg-primario);
  
}
</style>