export const ColumnData = [
  {
    Header: "Name",
    accessor: (d) => `${d.first_name} ${d.last_name}`,
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },

//   {
//     Header: "Status",
//     accessor: (d) => `${d.status === "1" || d.status === 1 ? "One" : "Zero"}`,
//   },
];
