import moment from "moment"

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

  {
    Header: "Created at",
    accessor: (d) => moment(`${d.created_at}`).format("llll")
  },

  // {
  //   Header: "Status",
  //   accessor: (d) => `${d.status === "1" || d.status === 1 ? "One" : "Zero"}`,
  // },
];
