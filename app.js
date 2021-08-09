const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
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
    }
  },
  created() {
    this.fetchProdutos()
  }
})