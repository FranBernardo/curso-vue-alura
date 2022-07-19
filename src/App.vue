<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral/>
    </div>
    <div class="column is-three-quarter">
      <Formulario @aoSalvar="salvarTarefa"/>
      <div class="lista">
      <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
    </div>
      <Box>
      <p>Nao há tarefas no momento.</p>
      </Box>
    </div>
    
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components//Tarefa.vue'
import ITarefa from './interfaces/ITarefa';
import Box from './components/Box.vue'


export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
},
data (){
  return{
    tarefas: [] as ITarefa[]
  }
},

computed:{
  temTarefa(): boolean {
    return this.tarefas.length <= 0
  }
},
methods:{
  salvarTarefa(tarefa: ITarefa){
    this.tarefas.push(tarefa)
    
    
  }
}
});
</script>

<style>

</style>
