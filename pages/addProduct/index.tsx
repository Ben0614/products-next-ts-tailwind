import React, { useRef } from "react";
import axios from "axios";

function AddProduct() {
  const addFormRef = useRef<HTMLFormElement>(null);
  const addProduct = (e: React.FormEvent) => {
    if (confirm("確定要添加?")) {
      e.preventDefault();
      const fd = new FormData(addFormRef.current!);
      axios.post(
        "http://localhost:3001/product",
        new URLSearchParams(fd as any).toString()
      );

      alert("添加完成");
    }
  };
  return (
    <div>
      <form ref={addFormRef} onSubmit={addProduct}>
        <label htmlFor="Name">商品名稱: </label>
        <input
          className="border border-black rounded-md"
          type="text"
          id="Name"
          name="Name"
        />
        <br />
        <br />
        <label htmlFor="categories">商品類別: </label>
        <input
          className="border border-black rounded-md"
          type="text"
          id="categories"
          name="categories"
        />
        <br />
        <br />
        <button className="bg-gray-200 p-1 rounded-md ml-52">新增</button>
      </form>
    </div>
  );
}

export default AddProduct;
