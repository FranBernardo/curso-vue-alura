<template>
  <Formulario @aoSalvar="salvarTarefa" />
  <div class="lista">
    <Box v-if="temTarefa">
      <p>Nao há tarefas no momento.</p>
    </Box>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaclicada="selecionarTarefa"
    />
    <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar tarefa</p>
          <button
            @click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa"> Descrição</label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoDaTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="editarTarefa" class="button is-success">Salvar</button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components//Tarefa.vue";

import Box from "../components/Box.vue";
import { useStore } from "@/store";
import {
  CADASTRA_TAREFAS,
  EDITAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tarefas",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },

  computed: {
    temTarefa(): boolean {
      return this.tarefas.length <= 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRA_TAREFAS, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      return (this.tarefaSelecionada = tarefa);
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    editarTarefa():void {
      this.store.dispatch(EDITAR_TAREFA, this.tarefaSelecionada
      ).then(() => {
        this.fecharModal()
      })
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      store,
      tarefas: computed(() => store.state.tarefas),
    };
  },
});
</script>
