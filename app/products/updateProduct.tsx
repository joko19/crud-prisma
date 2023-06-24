"use client";
import { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";

type Product = {
  id: number;
  brandId: number;
  title: string;
  price: number;
};

const UpdateProduct = ({ brands, product}: { brands: Brand[], product:Product }) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [brandId, setBrandId] = useState(product.brandId);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e:SyntheticEvent) => {
    e.preventDefault()
    await axios.patch(`/api/products/${product.id}`, {title, price: Number(price), brandId: Number(brandId)})
    router.refresh()
    setIsOpen(false)
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <div className="h3 font-bold text-lg">Update</div>
          <form onSubmit={handleUpdate}>
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
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">brand</label>
              <select
                className="select select-bordered"
                value={brandId}
                onChange={(e) => setBrandId(Number(e.target.value))}
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

export default UpdateProduct
