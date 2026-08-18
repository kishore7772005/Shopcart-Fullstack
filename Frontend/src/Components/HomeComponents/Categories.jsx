import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AOS from 'aos'
import 'aos/dist/aos.css'

import ciBag from '../../assets/Category-Images/Bag.png'
import ciBooks from '../../assets/Category-Images/Books.png'
import ciFurniture from '../../assets/Category-Images/Furniture.png'
import ciSneaker from '../../assets/Category-Images/Sneaker.png'
import ciTech from '../../assets/Category-Images/Tech.png'
import ciTravel from '../../assets/Category-Images/Travel.png'

const categories = [
  { title: 'Furniture', img: ciFurniture },
  { title: 'Hand Bag', img: ciBag },
  { title: 'Books', img: ciBooks },
  { title: 'Tech', img: ciTech },
  { title: 'Sneakers', img: ciSneaker },
  { title: 'Travel', img: ciTravel }
]

const Categories = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <section className="categories-section py-5">
      <Container>
        <h2 className="mb-4" data-aos="fade-right">Shop Our Top Categories</h2>
        <Row className="g-4">
          {categories.map((c, idx) => (
            <Col key={idx} xs={12} sm={6} md={4} lg={2}>
              <div 
  className="category-card" 
  role="button"
  data-aos="fade-up"
  data-aos-delay={idx * 100}
>
            <div className="img-wrapper">
              <img src={c.img} alt={c.title} className="category-img" />
            </div>
            <div className="category-info">
              <span className="category-label">Explore</span>
              <h3 className="category-name">{c.title}</h3>
            </div>
          </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Categories