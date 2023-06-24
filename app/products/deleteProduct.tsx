"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Product = {
  id: number;
  brandId: number;
  title: string;
  price: number;
};

const DeleteProduct = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/products/${product.id}`)
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="h3 font-bold text-lg">
            Are you sure to delete {product.title}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            <button type="button" className="btn btn-primary" onClick={handleDelete}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
