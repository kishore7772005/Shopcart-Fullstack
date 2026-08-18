import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams, useNavigate } from 'react-router-dom'
import { CartContext } from '../../ContextProvider'

import { products, popularProducts, bestProducts, sellingProducts, bestSelling } from '../../assets/Asset'

const DynamicPage = () => {
  const { productId } = useParams()
  const id = Number(productId)
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)

  const allProducts = [
    ...products.map(p => ({ ...p, category: 'deals' })),
    ...popularProducts.map(p => ({ ...p, category: 'popular' })),
    ...bestProducts.map(p => ({ ...p, category: 'best' })),
    ...sellingProducts.map(p => ({ ...p, category: 'selling' })),
    ...bestSelling.map(p => ({ ...p, category: 'bestselling' }))
  ]

  const product = allProducts[id]

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h3>Product not found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Back to Home</button>
      </Container>
    )
  }

  return (
    <section className="dynamic-page py-5">
      <Container>
        <button className="btn btn-outline-dark mb-4" onClick={() => navigate('/')}>← Back</button>

        <Row className="g-5">
          <Col xs={12} md={5}>
            <div className="product-detail-image bg-light rounded-3 p-4 d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
              <img src={product.img} alt={product.title} style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }} />
            </div>
          </Col>

          <Col xs={12} md={7}>
            <div className="product-detail-info">
              <h2>{product.title}</h2>

              <div className="stars text-success mb-3">
                ★★★★★ <span className="text-muted">({product.ratingCount || 121})</span>
              </div>

              <h4 className="text-primary mb-4">{product.price}</h4>

              <p className="text-muted">{product.desc}</p>

              <div className="d-flex gap-3 mb-5">
                <button className="btn btn-dark btn-lg rounded-pill px-5"
                  onClick={() => addToCart({ ...product, id })}>
                  {product.btnText || "Add to Cart"}
                </button>

                <button className="btn btn-outline-dark btn-lg rounded-pill">♡ Wishlist</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default DynamicPage
