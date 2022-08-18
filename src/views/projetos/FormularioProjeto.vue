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
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "@/store";
import { TipoNoficacao } from "@/interfaces/INotificacao";
import useNotificador from '@/hooks/notificador'
import { CADASTRA_PROJETOS, EDITAR_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";


export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "FormularioProjeto",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const {notificar} = useNotificador()
    const router = useRouter()

    const nomeDoProjeto = ref("")
    if(props.id){
  const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

     const salvar = () => {
      if (props.id) {
        store.dispatch(EDITAR_PROJETOS, {
          id: props.id,
          nome: nomeDoProjeto.value,
        }).then(() => lidarComSucesso());
      } else {
        store.dispatch(CADASTRA_PROJETOS, nomeDoProjeto.value)
        .then(() => lidarComSucesso());
      }
      
    }
   const lidarComSucesso = () => {
        nomeDoProjeto.value = "";
      notificar(TipoNoficacao.SUCESSO, 'sucesso!','tudo ok!')
      router.push("/projetos");
    }
    
    return {
      nomeDoProjeto,
      salvar,
      lidarComSucesso
    };
  },

  methods: {
   
    
  },
});
</script>
