import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ProductServiceIns } from "../services/product.service";

export const ProductsView = observer((props: any) => {
  const service = ProductServiceIns;
  useEffect(() => {
    service.findAll();
  }, []);

  const handlerDelete = (index: number) => service.deleteProduct(index);
  const handlerCreate = () => service.createProduct();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Products</h1>
      <button onClick={() => handlerCreate()}>create</button>
      {service.products.map((product, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img style={{ width: "200px" }} src={product.img} alt="..." />
          <p>{product.name}</p>
          <button onClick={() => handlerDelete(index)}>delete</button>
        </div>
      ))}
    </div>
  );
});
