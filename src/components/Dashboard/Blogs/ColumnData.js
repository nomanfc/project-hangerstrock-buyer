import moment from "moment";

export const ColumnData = [
  {
    Header: "Title",
    accessor: "title",
  },
  // {
  //   Header: "Description",
  //   accessor: "description",
  // },

  // {
  //   Header: "Original Retail Price",
  //   accessor: 'original_retail_price'
  // },

  // {
  //   Header: "Opening Bid",
  //   accessor: 'opening_bid_amount'
  // },
  {
    Header: "Created at",
    accessor: (d) => moment(`${d.created_at}`).format("ll"),
  },

  {
    Header: "Created By",
    accessor: "created_by",
  },
];
