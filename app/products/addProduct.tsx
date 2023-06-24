"use client";
import { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brandId, setBrandId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e:SyntheticEvent) => {
    e.preventDefault()
    await axios.post(`/api/products`, {title, price: Number(price), brandId: Number(brandId)})
    setPrice("")
    setTitle("")
    setBrandId("")
    router.refresh()
    setIsOpen(false)
  }

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add New
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <div className="h3 font-bold text-lg">Add New Product</div>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">brand</label>
              <select
                className="select select-bordered"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
              >
                <option value="" disabled>
                  Select a Brand
                </option>
                {brands.map((brand, index) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
