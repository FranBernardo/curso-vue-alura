<template >
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CronometroTime :tempoEmSegundos="tempoEmSegundos" />
    <Botao :desabilidado="cronometroRodando" icone="fas fa-play" texto="play" @clicado="iniciar"/>
    <Botao :desabilidado="!cronometroRodando" icone="fas fa-stop" texto="stop" @clicado="finalizar"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CronometroTime from "./Cronometro.vue";
import Botao from "./Botoes.vue";

export default defineComponent({
  name: "TemporizadorTime",
  emits: ['aoTemporizadorFinalizado'],
  components:{
    CronometroTime,
    Botao
  },
  data(){
    return{
        tempoEmSegundos: 0,
        cronometro: 0,
        cronometroRodando: false
    }
  },
  
  methods: {
    iniciar(){
        this.cronometroRodando= true
        this.cronometro = setInterval(() => {
            this.tempoEmSegundos += 1 
        }, 1000)
    },
    finalizar(){
        this.cronometroRodando= false
        clearInterval(this.cronometro)
        this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
        this.tempoEmSegundos = 0
    }
  }
});
</script>