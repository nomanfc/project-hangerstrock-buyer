import moment from "moment";

export const ColumnData = [
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },

  {
    Header: "Product Condition",
    accessor: "product_condition",
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
    accessor: (d) => moment(`${d.submitted_at}`).format("ll"),
  },

  {
    Header: "Status",
    accessor: (d) => `${d.is_approved === "1" || d.is_approved === 1 ? "Approved" : "Pending"}`,
  },
];
