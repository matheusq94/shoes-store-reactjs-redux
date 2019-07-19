import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MdAddShoppingCart } from 'react-icons/md'

import * as CartActions from '../../store/modules/cart/actions'

import { ProductList } from './styles'

import api from '../../services/api'
import { formatPrice } from '../../util/format'

class Home extends Component {
  state = {
    products: []
  }

  async componentDidMount() {
    //Busca dados da API
    const response = await api.get('/products')

    //Mapeia o array da resposta da API e formata os preços
    //em um novo atributo (priceFormatted)
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }))

    this.setState({ products: data })
  }

  handleAddProduct = product => {
    const { addToCart } = this.props

    addToCart(product)
  }

  render() {
    const { products } = this.state
    const { amount } = this.props
    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={products.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product)}
            >
              <div>
                <MdAddShoppingCart size={16} color={'#fff'} />{' '}
                {amount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    )
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount

    return amount
  }, {})
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
