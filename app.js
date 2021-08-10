const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }
  },
  computed: {
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach((item) => {
          total += item.preco
        })
      }
      return total
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
    },
    adicionarItem() {
      this.produto.estoque--
      const {id, nome, preco} = this.produto
      this.carrinho.push({id, nome, preco})
    },
    removerItem(index) {
      this.carrinho.splice(index, 1)
    },
    checkLocalStorage() {
      if(window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho)
      }
    }
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho)
    }
  },
  created() {
    this.fetchProdutos()
    this.checkLocalStorage()
  }
})