import axios from "axios";
import { Link } from "react-router-dom";

const ProductTable = ({ products, refresh }) => {
  const token = localStorage.getItem("token");

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;

    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    refresh();
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle mt-3">
        <thead className="table-dark text-center">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="text-center">
                <img
                  src={p.img}
                  alt={p.title}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>

              <td className="fw-semibold">{p.title}</td>

              <td>₹{p.price}</td>

              <td>
                <span
                  className={`badge ${
                    p.stock > 0 ? "bg-success" : "bg-danger"
                  }`}
                >
                  {p.stock}
                </span>
              </td>

              {/* ACTION COLUMN */}
              <td>
                {/* Desktop / Tablet buttons */}
                <div className="d-none d-md-flex justify-content-center gap-2">
                  <Link
                    to={`/edit/${p._id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(p._id)}
                  >
                    Delete
                  </button>
                </div>

                {/* Mobile buttons (stacked) */}
                <div className="d-flex d-md-none flex-column gap-2">
                  <Link
                    to={`/edit/${p._id}`}
                    className="btn btn-warning btn-sm w-100"
                  >
                    Edit
                  </Link>

                  {/* ✅ DELETE BUTTON COMES AFTER (STACKED) */}
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => deleteProduct(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
