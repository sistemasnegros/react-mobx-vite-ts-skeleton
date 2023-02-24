import { Button, Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useContextGlobal } from "../../../../commons/infrastructure/ui/hooks/context-global.hook";
import { ProductModelView } from "../view-model/product.view-model";

export const ProductsView = observer((props: any) => {
  const { globalStore } = useContextGlobal();
  const service =
    globalStore.container.get<ProductModelView>("ProductModelView");

  useEffect(() => {
    service.findAll();
  }, []);

  const handlerDelete = (index: number) => service.deleteProduct(index);
  const handlerCreate = () => service.createProduct();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Products</h1>
      <Button onClick={() => handlerCreate()}>create</Button>
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
          <Button danger onClick={() => handlerDelete(index)}>
            delete
          </Button>
        </div>
      ))}
    </div>
  );
});
