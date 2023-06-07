import React from 'react'
import Container from './Container'
import Card from './Card'
import { useSelector } from 'react-redux'
export default function Product() {
    const state = useSelector(state => state.products)
    const Map = (element) => {
        return <Card img={element.img} title={element.name} desc={element.desc} actual_price={element.actual_price} disc_price={element.disc_price} key={element.id} id={element.id} />
    }
    const elements = state.map(
        (product) => Map(product)
    )
    return (
        <Container>
            {elements}
        </Container>
    )
}