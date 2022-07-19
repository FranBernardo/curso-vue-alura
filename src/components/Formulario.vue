
<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
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
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name:'FormularioPrincipal',
  components:{
    Temporizador
},
emits:['aoSalvar'],

data(){
  return{
    descricao:''
  }
},
methods:{
  finalizarTarefa(tempoDecorrido: number): void {
    this.$emit('aoSalvar',{
      duracaoEmSegundos:tempoDecorrido,
      descricao: this.descricao
    })
    this.descricao = ''

  }
}
  
})
</script>