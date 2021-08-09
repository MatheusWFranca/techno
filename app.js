const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
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