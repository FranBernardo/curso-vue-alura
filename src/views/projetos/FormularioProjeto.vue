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
    return {
      store,
    };
  },

  methods: {
    salvar() {
      if (this.id) {
        this.store.commit('EDITAR_PROJETO', {
            id: this.id,
            nome: this.nomeDoProjeto
        })
      } else {
        this.store.commit("ADICIONA_PROJETO", this.nomeDoProjeto);
        
      }
      this.nomeDoProjeto = "";
        this.$router.push("/projetos");
    },
  },
});
</script>
