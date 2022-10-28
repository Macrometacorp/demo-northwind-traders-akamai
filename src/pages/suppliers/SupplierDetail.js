import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../components/DetailCard";
import { getSupplierById } from "../../services";

export function SupplierDetail() {
  const [supplier, setSupplier] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getSupplier = async () => {
      const supplier = await getSupplierById(Number(id));

      const data = [
        { label: "Company Name", value: supplier.companyName },
        { label: "Region", value: supplier.region },
        { label: "Contact Name", value: supplier.name },
        { label: "Postal Code", value: supplier.postalCode },
        { label: "Contact Title", value: supplier.title },
        { label: "Country", value: supplier.country },
        { label: "Address", value: supplier.address },
        { label: "Phone", value: supplier.phone },
        { label: "City", value: supplier.city },
      ];

      setSupplier(data);
    };
    getSupplier().catch(console.error);
  }, [id]);

  return (
    <DetailCard
      title="Supplier Information"
      goBackPath="/suppliers"
      data={supplier}
    />
  );
}
