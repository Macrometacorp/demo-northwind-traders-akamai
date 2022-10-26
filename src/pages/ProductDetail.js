import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../components/DetailCard";
import { getProductById } from "../services";

export default function ProductDetail() {
  const [product, setProduct] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(Number(id));

      const data = [
        { label: "Product Name", value: product.name },
        { label: "Units In Stock", value: product.unitsInStock },
        {
          label: "Supplier",
          value: product.supplier.name,
          linkTo: `/suppliers/${product.supplier.id}`,
        },
        { label: "Units In Order", value: product.unitsInOrder },
        { label: "Quantity Per Unit", value: product.quantityPerUnit },
        { label: "Reorder Level", value: product.reorderLevel },
        { label: "Unit Price", value: `$${product.unitPrice}` },
        { label: "Discontinued", value: product.discontinued },
      ];

      setProduct(data);
    };
    getProduct().catch(console.error);
  }, [id]);

  return (
    <DetailCard
      title="Product Information"
      goBackPath="/products"
      data={product}
    />
  );
}
