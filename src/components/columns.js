export const COLUMNS = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Maiden Name",
      accessor: "maidenName",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Adress",
      accessor: ({address}) => `${address.address}, ${address.city}, ${address.state}, ${address.stateCode}, ${address.postalCode}, ${address.country}`,
    },
  ];
  