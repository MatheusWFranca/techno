const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    carrinhoAtivo: false,
    mensagemAlerta: 'Item adicionado',
    alertaAtivo: false,
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
      if (event.target === event.currentTarget) {
        this.produto = false
      }
    },
    clickForaCarrinho(event) {
      if (event.target === event.currentTarget) {
        this.carrinhoAtivo = false
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
      const { id, nome, preco } = this.produto
      this.carrinho.push({ id, nome, preco })
      this.alerta(`${nome} foi adicionado ao carrinho`)
    },
    removerItem(index) {
      this.carrinho.splice(index, 1)
    },
    checkLocalStorage() {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho)
      }
    },
    checkEstoque() {
      const items = this.carrinho.filter(item => {
        if (item.id === this.produto.id) {
          return true
        }
      })
      this.produto.estoque = this.produto.estoque - items.length
    },
    alerta(mensagem) {
      this.mensagemAlerta = mensagem
      this.alertaAtivo = true
      setTimeout(() => {
        this.alertaAtivo = false
      }, 1500)
    },
    router() {
      const hash = document.location.hash
      if (hash) {
        this.fetchDescricao(hash.replace('#', ''))
      }
    }
  },
  watch: {
    produto() {
      document.title = this.produto.nome || 'Techno'
      const hash = this.produto.id || ''
      history.pushState(null, null, `#${hash}`)
      if (this.produto) {
        this.checkEstoque()
      }
    },
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho)
    }
  },
  created() {
    this.fetchProdutos()
    this.checkLocalStorage()
    this.router()
  }
})