<template>
  <Box >
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-7" >{{tarefa.descricao || 'Tarefa sem descrição'}}</div>
      <div class="column is-3">
        {{tarefa.projeto?.nome|| 'N/D'}}
      </div>
      <div class="column">
        <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos"/>
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import ITarefa from "@/interfaces/ITarefa";
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import Box from "./Box.vue";

export default defineComponent({
  name: "TarefaTimer",
  components: { Cronometro, Box },
  emits:['aoTarefaclicada'],
  props: {
    tarefa: {
        type: Object as PropType<ITarefa>,
        required: true
    }
  },
  methods:{
    tarefaClicada():void {
      this.$emit('aoTarefaclicada', this.tarefa)
    }
  }
});
</script>
<style scoped>
.clicavel{
  cursor: pointer;
}
</style>

