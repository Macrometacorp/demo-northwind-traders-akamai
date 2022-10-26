import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../components/DetailCard";
import { getCustomerById } from "../services";

export default function CustomerDetail() {
  const [customer, setCustomer] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getCustomer = async () => {
      const customer = await getCustomerById(Number(id));

      const data = [
        { label: "Company Name", value: customer.companyName },
        { label: "Postal Code", value: customer.postalCode },
        { label: "Contact Name", value: customer.name },
        { label: "Region", value: customer.region },
        { label: "Contact Title", value: customer.title },
        { label: "Country", value: customer.country },
        { label: "Address", value: customer.address },
        { label: "Phone", value: customer.phone },
        { label: "City", value: customer.city },
        { label: "Fax", value: customer.fax },
      ];

      setCustomer(data);
    };
    getCustomer().catch(console.error);
  }, [id]);

  return (
    <DetailCard
      title="Customer Information"
      goBackPath="/customers"
      data={customer}
    />
  );
}
