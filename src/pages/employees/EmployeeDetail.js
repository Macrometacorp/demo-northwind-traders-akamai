import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../components/DetailCard";
import { getEmployeeById } from "../../services";

export function EmployeeDetail() {
  const [employee, setEmployee] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getEmployee = async () => {
      const employee = await getEmployeeById(Number(id));

      const data = [
        { label: "Name", value: employee.name },
        { label: "Postal Code", value: employee.address.postalCode },
        { label: "Title", value: employee.title },
        { label: "Country", value: employee.address.country },
        { label: "Title of Courtesy", value: employee.titleOfCourtesy },
        { label: "Home Phone", value: employee.homePhone },
        { label: "Birth Date", value: employee.birthDate },
        { label: "Extension", value: employee.extension },
        { label: "Hire Date", value: employee.hireDate },
        { label: "Notes", value: employee.notes },
        { label: "Address", value: employee.address.streetLine },
        {
          label: "Reports To",
          value: employee.reportsTo?.name,
          linkTo: employee.reportsTo
            ? `/employees/${employee.reportsTo.id}`
            : null,
        },
        { label: "City", value: employee.address.city },
      ];

      setEmployee(data);
    };
    getEmployee().catch(console.error);
  }, [id]);

  return (
    <DetailCard
      title="Employee Information"
      goBackPath="/employees"
      data={employee}
    />
  );
}
