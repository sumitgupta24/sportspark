import { useState } from "react";
import axios from "axios";
import "./AdminPage.css"; // We'll style this separately

const AdminPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("image", image); // image is from input type="file"

  try {
    const response = await axios.post("http://localhost:4000/api/products/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("✅ Product added:", response.data);
  } catch (error) {
    console.error("❌ Failed to add product:", error);
  }
};

  return (
    <div className="admin-page">
      <h2>📦 Add New Product</h2>
      <form onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
  />
  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    required
  />

  {/* ✅ This is the image input */}
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    required
  />

  <button type="submit">Add Product</button>
</form>
</div>
  );
};

export default AdminPage;
