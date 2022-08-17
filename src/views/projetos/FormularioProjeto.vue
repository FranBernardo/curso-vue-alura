<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto"> Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "@/store";
import { TipoNoficacao } from "@/interfaces/INotificacao";
import useNotificador from '@/hooks/notificador'
import { CADASTRA_PROJETOS, EDITAR_PROJETOS } from "@/store/tipo-acoes";


export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "FormularioProjeto",
  props: {
    id: {
      type: String,
    },
  },

  

  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (proj) => proj.id == this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  setup() {
    const store = useStore();
    const {notificar} = useNotificador()
    return {
      store,
      notificar
    };
  },

  methods: {
    salvar() {
      if (this.id) {
        this.store.dispatch(EDITAR_PROJETOS, {
          id: this.id,
          nome: this.nomeDoProjeto,
        }).then(() => this.lidarComSucesso());
      } else {
        this.store.dispatch(CADASTRA_PROJETOS, this.nomeDoProjeto)
        .then(() => this.lidarComSucesso());
      }
      
    },
    lidarComSucesso(){
        this.nomeDoProjeto = "";
      this.notificar(TipoNoficacao.SUCESSO, 'sucesso!','tudo ok!')
      this.$router.push("/projetos");
    }
  },
});
</script>
