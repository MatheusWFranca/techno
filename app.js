const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }
  },
  methods: {
    fetchProdutos() {
      fetch('./api/produtos.json')
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          this.produtos = json
        })
    },
    fetchDescricao(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          this.produto = json
        })
    },
    fecharModal(event) {
      if(event.target === event.currentTarget) {
        this.produto = false
      }
    },
    abrirModal(id) {
      this.fetchDescricao(id)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  },
  created() {
    this.fetchProdutos()
  }
})