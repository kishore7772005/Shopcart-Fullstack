import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Assets
import Cardimg from "../../assets/PopularImages/Pp1.png";
import Headimg from "../../assets/BestSellingImages/BS2.png";
import ThirdImg from "../../assets/PopularImages/Pp3.png";
import ModelImg from "../../assets/NewImages/Model.png"; 
import NewArrivalImg from "../../assets/NewImages/NewArrival.png"; 
import FullPageBg from "../../assets/NewImages/NewBg.png"; 

const New = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  const pageStyle = {
    background: `linear-gradient(rgba(248, 249, 250, 0.95), rgba(248, 249, 250, 0.95)), url(${FullPageBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    paddingTop: "80px",
    fontFamily: "'Inter', sans-serif"
  };

  return (
    <div style={pageStyle}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

          .main-title {
            font-weight: 800;
            color: #1a1a1a;
            letter-spacing: -2px;
            line-height: 1.1;
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.7) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            border-radius: 24px !important;
          }

          .product-card {
            border-radius: 20px;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            background: #fff;
            overflow: hidden;
            border: 1px solid #f0f0f0;
          }

          .product-card:hover {
            box-shadow: 0 30px 60px rgba(0,0,0,0.12);
            border-color: #ff6b70;
          }

          .img-container {
            background: #f8f9fa;
            padding: 30px;
            height: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .category-btn {
            background: #fff;
            border: 1px solid #e0e0e0;
            padding: 16px;
            border-radius: 16px;
            font-weight: 600;
            color: #1a1a1a;
            transition: 0.3s;
            text-decoration: none;
            display: block;
            text-align: center;
          }

          .hero-badge {
            background: #ff6b70;
            color: white;
            font-size: 0.75rem;
            font-weight: 800;
            padding: 8px 20px;
            border-radius: 50px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .shop-now-btn {
            background: #1a1a1a;
            color: white;
            padding: 18px 40px;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: 0.3s;
          }

          .shop-now-btn:hover {
            background: #ff6b70;
            color: white;
            transform: scale(1.05);
          }

          /* Floating Animation */
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          .floating { animation: float 4s ease-in-out infinite; }
        `}
      </style>

      {/* 1. HERO BANNER */}
      <div className="container mt-4 mb-5">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="row align-items-center g-0 glass-card shadow-lg overflow-hidden"
        >
          <div className="col-md-6 p-5" data-aos="fade-right">
            <div className="hero-badge mb-4">Summer Collection 2025</div>
            <h1 className="display-3 main-title mb-4">
              Premium Gear <br /> for <span style={{color: '#ff6b70'}}>Moderns.</span>
            </h1>
            <p className="text-muted fs-5 mb-5 lh-lg">
              Experience the fusion of high-performance tech and minimalist aesthetics. 
              Designed for those who demand more from their daily essentials.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="shop-now-btn">Browse Collection</Link>
            </motion.div>
          </div>
          <div className="col-md-6 p-4" data-aos="zoom-in" data-aos-delay="200">
            <motion.img 
              src={NewArrivalImg} 
              className="w-100 rounded-4 shadow" 
              style={{ height: "500px", objectFit: "cover" }} 
              alt="Banner"
              whileHover={{ scale: 1.02 }}
            />
          </div>
        </motion.div>
      </div>

      {/* 2. TOP PICKS GRID */}
      <div className="container py-5">
        <div className="text-center mb-5" data-aos="fade-up">
          <h6 className="text-danger fw-bold text-uppercase mb-2">Editor's Choice</h6>
          <h2 className="display-5 fw-bold">Trending Products</h2>
          <div className="mx-auto" style={{ width: "60px", height: "4px", background: "#ff6b70", borderRadius: "10px" }}></div>
        </div>

        <div className="row g-4">
          {[
            { img: Cardimg, title: "Studio Wireless Max", price: "$299.00", id: "3" },
            { img: Headimg, title: "Series X Smart Watch", price: "$199.00", id: "4" },
            { img: ThirdImg, title: "Noise Cancelling Buds", price: "$149.00", id: "6" }
          ].map((item, index) => (
            <div className="col-md-4" key={index} data-aos="fade-up" data-aos-delay={index * 200}>
              <motion.div 
                className="product-card"
                whileHover={{ y: -15 }}
              >
                <div className="img-container position-relative">
                  <motion.img 
                    src={item.img} 
                    alt={item.title} 
                    className="img-fluid floating" 
                    style={{ maxHeight: "220px" }}
                  />
                </div>
                <div className="p-4 border-top bg-white">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold m-0 text-dark mb-1">{item.title}</h5>
                      <p className="small text-muted mb-0">Limited Edition</p>
                    </div>
                    <span className="fs-5 fw-bold" style={{color: '#ff6b70'}}>{item.price}</span>
                  </div>
                  <Link to={`/product/${item.id}`} className="btn btn-dark w-100 fw-bold py-3 rounded-3 shadow-sm">
                    View Product
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CATEGORY SELECTOR */}
      <div className="container py-5">
        <div className="row g-4">
          {["Electronics", "Fashion", "Home Decor", "Accessories"].map((cat, i) => (
            <div className="col-6 col-md-3" key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/" className="category-btn glass-card shadow-sm">{cat}</Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SPOTLIGHT SECTION */}
      <div className="container mb-5 py-5">
        <div className="glass-card shadow-lg overflow-hidden border-0">
          <div className="row g-0 align-items-center">
            <div className="col-md-5" data-aos="fade-right">
              <img src={ModelImg} className="w-100" style={{ height: "600px", objectFit: "cover" }} alt="Model" />
            </div>
            <div className="col-md-7 p-5" data-aos="fade-left">
              <h2 className="display-4 fw-bold mb-4">The Style Guide <br /> <span style={{color: '#ff6b70'}}>Winter '25</span></h2>
              <p className="text-muted fs-5 mb-5 lh-base">
                Explore our curated lookbook featuring this week's most wanted pieces. Designed for comfort, built for performance.
              </p>
              
              <div className="row g-4 mb-5">
                {[
                  { icon: "🚚", text: "Free Express Shipping" },
                  { icon: "🔄", text: "30-Day Free Returns" },
                  { icon: "🛡️", text: "2-Year Extended Warranty" }
                ].map((feature, index) => (
                  <div className="col-sm-6 col-md-12 col-lg-6 d-flex align-items-center" key={index}>
                    <div className="fs-3 me-3">{feature.icon}</div>
                    <div className="fw-bold text-dark">{feature.text}</div>
                  </div>
                ))}
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="btn btn-dark btn-lg px-5 py-3 rounded-3"
              >
                Read Full Lookbook
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-5 border-top bg-white mt-5">
        <div className="container">
          <h4 className="fw-bold mb-4">SHOP CART</h4>
          <div className="d-flex justify-content-center gap-4 mb-4 text-muted">
            <Link to="/" className="text-decoration-none text-reset">Shop</Link>
            <Link to="/" className="text-decoration-none text-reset">Journal</Link>
            <Link to="/" className="text-decoration-none text-reset">About</Link>
            <Link to="/" className="text-decoration-none text-reset">Contact</Link>
          </div>
          <p className="text-muted mb-0 small fw-bold text-uppercase opacity-50">
            © 2025 SHOP CART — LUXURY MINIMALIST ESSENTIALS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default New;