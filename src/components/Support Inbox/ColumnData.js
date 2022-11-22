import moment from "moment";

export const ColumnData = [
  {
    Header: "Name",
    accessor: (d) => `${d.first_name +" "+ d.last_name}`,
  },
  {
    Header: "Company Name",
    accessor: "company_name",
  },
  {
    Header: "Business Location",
    accessor: "business_location",
  },

  {
    Header: "Phone",
    accessor: "phone",
  },

  // {
  //   Header: "Original Retail Price",
  //   accessor: 'original_retail_price'
  // },

  // {
  //   Header: "Opening Bid",
  //   accessor: 'opening_bid_amount'
  // },
  {
    Header: "Submitted at",
    accessor: (d) => moment(`${d.created_at}`).format("ll"),
  },

  // {
  //   Header: "Status",
  //   accessor: (d) => `${d.is_followed === "1" || d.is_followed === 1 ? "Followed" : "Not Followed"}`,
  // },
];
