import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Cart } from './styles'

import { MdShoppingBasket } from 'react-icons/md'

export default function Header () {
  return (
    <Container>
      <Link to="/">
        <h1>SHOESTORE</h1>
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>3 itens</span>
        </div>
        <MdShoppingBasket size={36} color={'#fff'} />
      </Cart>
    </Container>
  )
}
