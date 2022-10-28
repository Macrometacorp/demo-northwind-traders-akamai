import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../components/DetailCard";
import { OrderProducts } from "./OrderProducts";
import { getOrderById } from "../../services";

export function OrderDetail() {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      const order = await getOrderById(Number(id));
      setProducts([...order.products.list]);

      const data = [
        {
          label: "Customer Id",
          value: order.customer.id,
          linkTo: `/customers/${order.customer.id}`,
        },
        { label: "Order Date", value: order.createdAt },
        {
          label: "Ship Name",
          value: order.customer.companyName,
          linkTo: `/customers/${order.customer.id}`,
        },
        { label: "Required Date", value: order.shipping.requiredDate },
        {
          label: "Total Products",
          value: order.products.differentProductCount,
        },
        { label: "Shipped Date", value: order.shipping.shippedDate },
        { label: "Total Quantity", value: order.products.totalQuantity },
        { label: "Ship City", value: order.shipping.city },
        { label: "Total Price", value: `$${order.products.totalPrice}` },
        { label: "Ship Region", value: order.shipping.region },
        { label: "Total Discount", value: `$${order.products.totalDiscount}` },
        { label: "Ship Postal Code", value: order.shipping.postalCode },
        { label: "Ship Via", value: order.shipping.via },
        { label: "Ship Country", value: order.shipping.country },
        { label: "Freight", value: `$${order.shipping.freight}` },
      ];

      setOrder(data);
    };
    getOrder().catch(console.error);
  }, [id]);

  return (
    <>
      <DetailCard title="Order Information" data={order} />
      <OrderProducts data={products} />
    </>
  );
}
