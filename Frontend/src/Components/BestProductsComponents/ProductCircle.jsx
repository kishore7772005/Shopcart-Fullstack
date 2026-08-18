import React from "react";
import { motion } from "framer-motion";

// Update these paths to match your folder structure
import backgroundImage from "../../assets/Animations/Row.png"; 

// Product Imports
import P1 from "../../assets/BestProduct/P1.png";
import P2 from "../../assets/BestProduct/P2.png";
import P3 from "../../assets/BestProduct/P3.png";
import P4 from "../../assets/BestProduct/P4.png";
import P5 from "../../assets/BestProduct/P5.png";
import P6 from "../../assets/BestProduct/P6.png";

const ProductShowcase = () => {
  const leftProducts = [P1, P2, P3];
  const rightProducts = [P4, P5, P6];

  // Professional Glassmorphism Style
  const cardStyle = {
    width: "200px",
    height: "260px",
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    borderRadius: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    marginBottom: "40px",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.4))",
  };

  return (
    <section
      className="product-showcase-section"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 10, 30, 0.75), rgba(10, 10, 30, 0.75)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        color: "#fff",
        padding: "2rem 0"
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center justify-content-lg-around">
          
          {/* LEFT COLUMN: HIDDEN ON SM (d-none), VISIBLE ON MD+ (d-md-flex) */}
          <div className="col-md-3 d-none d-md-flex justify-content-center">
            <div style={{ height: "80vh", overflow: "hidden" }}>
              <motion.div
                animate={{ y: [0, -900] }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="d-flex flex-column"
              >
                {[...leftProducts, ...leftProducts, ...leftProducts].map((img, index) => (
                  <motion.div
                    key={`left-${index}`}
                    style={cardStyle}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      rotate: 2
                    }}
                  >
                    <img src={img} alt="Product Up" style={imageStyle} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* CENTER TEXT AREA: FULL WIDTH ON MOBILE, CENTERED */}
          <div className="col-11 col-sm-10 col-md-5 col-lg-4 text-center py-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div 
                className="d-inline-block px-3 py-1 mb-3 rounded-pill" 
                style={{ background: "rgba(0, 242, 254, 0.2)", color: "#00f2fe", fontSize: "11px", fontWeight: "bold", letterSpacing: "1px" }}
              >
                NEW ARRIVALS 2025
              </div>
              
              <h1 className="display-3 display-md-2 fw-bold mb-4" style={{ letterSpacing: "-2px", lineHeight: "1.1" }}>
                Shopcart <br />
                <span style={{ color: "#5ec27aff", textShadow: "0 0 20px rgba(89, 148, 112, 0.4)" }}>Exclusive</span>
              </h1>
              
              <p className="lead opacity-75 mb-5 mx-auto px-md-3" style={{ maxWidth: "450px", fontSize: "1.1rem" }}>
                Pushing the boundaries of digital style with isometric innovation. Elevate your lifestyle with our premium selection.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-lg px-5 py-3 fw-bold rounded-pill shadow-lg border-0"
                style={{ 
                  background: "linear-gradient(90deg, #5beb62 0%, #4a8952 100%)", 
                  color: "#fff",
                  fontSize: "1rem"
                }}
              >
                SHOP COLLECTION
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: HIDDEN ON SM (d-none), VISIBLE ON MD+ (d-md-flex) */}
          <div className="col-md-3 d-none d-md-flex justify-content-center">
            <div style={{ height: "80vh", overflow: "hidden" }}>
              <motion.div
                animate={{ y: [-900, 0] }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="d-flex flex-column"
              >
                {[...rightProducts, ...rightProducts, ...rightProducts].map((img, index) => (
                  <motion.div
                    key={`right-${index}`}
                    style={cardStyle}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      rotate: -2
                    }}
                  >
                    <img src={img} alt="Product Down" style={imageStyle} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Glow Elements - Fixed for mobile visibility */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "10%",
        width: "60%",
        height: "60%",
        background: "radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1
      }}></div>
    </section>
  );
};

export default ProductShowcase;