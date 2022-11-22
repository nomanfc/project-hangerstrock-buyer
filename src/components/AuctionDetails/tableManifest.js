import React, { useEffect, useState, useCallback } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { get_auction_details_by_aid } from "../../http_requests/httpreq";

const TableManifest = (props) => {
  return (
    <Table>
      <Thead>
        <Tr style={{ fontSize: "13px" }}>
          <Th>Category</Th>
          <Th>Description</Th>
          <Th>Condition</Th>
          <Th>Qty</Th>
          <Th>Retail Per Unit</Th>
          <Th>Total Retail</Th>
          <Th>Unit Per Cost</Th>
          <Th>Manufacturer</Th>
          <Th>Model</Th>
          <Th>Mobile Grading</Th>
        </Tr>
      </Thead>

      <Tbody>
        {props?.dataTable?.map((data, index) => (
          <Tr key={index} style={{ fontSize: "12px", fontWeight: "400" }}>
            <Td>{data?.category}</Td>
            <Td>{data?.description}</Td>
            <Td>{data?.product_condition || "---"}</Td>
            <Td>{data?.quantity}</Td>
            <Td>{data?.retail_per_unit}</Td>
            <Td>{data?.total_retail}</Td>
            <Td>{data?.unit_per_cost}</Td>
            <Td>{data?.manufacturer}</Td>
            <Td>{data?.model}</Td>
            <Td>{data?.mobile_grading || "---"}</Td>
          </Tr>
        ))}
      </Tbody>

      {props && props.dataTable ? null : (
        <div
          style={{
            color: "gray",
            border: "1px solid #F8F8F8",
            height: "200px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ margin: "auto" }}> No Data Found</span>
        </div>
      )}
    </Table>
  );
};

export default TableManifest;
