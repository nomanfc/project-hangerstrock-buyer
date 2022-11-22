import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "next/link";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SubjectIcon from "@mui/icons-material/Subject";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
// import { styled } from "@mui/material/styles";
// import { useSelector } from "react-redux";

import { FormControlLabel, FormGroup, Switch, Tooltip } from "@mui/material";

import { useTable, useSortBy, usePagination } from "react-table";
import { ColumnData } from "./ColumnData";
import * as s from "./Table.style.js";

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
  return hDisplay + " " + mDisplay;
}

const defaultValue = [
  {
    title: "No Data",
    category: "No Data",
    bid_count: "No Data",
    max_bid: "No Data",
    bid_ends_in_second: "No Data",
  },
];

const Table = (props) => {
  // const searchDatas = useSelector((state) => state.searchData);
  // const counter = useSelector((state) => state?.count);

  const [tableData, setTableData] = useState(defaultValue);

  const [testTableData, setTestTableData] = useState(defaultValue);

  const [id, setId] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(10000);
  const [dataS, setDataS] = useState();

  const [tableCell, setTableCell] = useState({
    fileName: "",
    fileLink: "",
  });

  const [file, setFile] = useState([]);


  // const navigate = useNavigate();

  var load = true;

  useEffect(() => {
    //   setTestTableData(searchDatas);
  }, []);

  useEffect(() => {
    props.row ? setTableData(props.row) : setTableData(defaultValue);
  }, [props]);

  const handleClick = (data) => () => {};

  const handleOpen = (data) => () => {
    setOpen(true);
    setId(data.row.original.regNo);
  };

  const handleClose = () => {
    setOpen(false);
    setUploadModal(false);
  };

  const deleteHandler = (data) => () => {
    //   deleteOrgs(data.id).then((res) => {
    //     if (res.data.success === 1) {
    //       setReload(reload - 3);
    //       setOpen(false);
    //     }
    //   });
  };

  const editHandler = (data) => () => {
    //   navigate(`/editorg/${data.row.original.regNo}`);
  };

  const detailsHandler = (data) => () => {
    //   navigate(`/orgdetail/${data.row.original.regNo}`);
  };

  const handleVerification = (data) => () => {
    //   navigate(`/verify/${data.row.original.regNo}`);
  };

  const handleUploadModal = (data) => (e) => {
    //   e.preventDefault();
    //   setUploadModal(true);
    //   setId(data.row.original.regNo);
  };

  const handleFileChange = (e) => {
    // console.log(e.target.files[0])
    //   setFile({ [e.target.name]: e.target.files[0] });
  };

  const uploadHandler = (data) => (e) => {};

  const handleDownload = (data) => (e) => {
    e.preventDefault();
    const fileName = data.row.original.fileName;
    fileDownload(fileName).then((response) => {
      // console.log(response);
    });
  };

  const headerColumn = useMemo(() => ColumnData, []);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setPageSize,
  } = useTable(
    {
      columns: headerColumn,
      data: tableData,
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <s.showSize
        style={{ marginBottom: "30px", color: "#599f22", fontWeight: 600 }}
      >
        Rows per page :
        <select
          style={{
            width: "50px",
            padding: "3px",
            marginLeft: "20px",
            color: "#599f22",
            fontWeight: 600,
          }}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize, index) => (
            <option key={index} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </s.showSize>
      <s.table {...getTableProps()}>
        <s.thead>
          {headerGroups.map((headerGroup, index) => (
            <s.tr key={index} {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column, id) => (
                <s.th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={id}
                >
                  <s.span style={{ textAlign: "center" }}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownwardIcon style={{ fontSize: "12px" }} />
                      ) : (
                        <ArrowUpwardIcon style={{ fontSize: "12px" }} />
                      )
                    ) : (
                      <ImportExportIcon style={{ fontSize: "12px" }} />
                    )}
                  </s.span>
                </s.th>
              ))}
              {/* <s.th style={{ textAlign: "center", width: "fit-content" }}>
                ফাইল
              </s.th> */}
              <s.th style={{ textAlign: "center", width: "150px" }}>
                Action
              </s.th>
            </s.tr>
          ))}
        </s.thead>

        {props && props.row ? (
          <s.tbody {...getTableBodyProps()}>
            {page?.map((row, index) => {
              prepareRow(row);
              return (
                <s.tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    return (
                      <s.td
                        key={index}
                        onClick={detailsHandler({ row })}
                        //   style={{ cursor: "pointer" }}
                      >
                        {cell.render("Cell")}
                      </s.td>
                    );
                  })}

                  <s.td>
                    <s.actionCon>
                      <Tooltip title="Remove user" aria-label="remove">
                        <IconButton onClick={props.handleModal({ row })}>
                          <RemoveCircleIcon style={{ color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    </s.actionCon>
                  </s.td>
                </s.tr>
              );
            })}
          </s.tbody>
        ) : null}
      </s.table>

      {props && props.row ? null : (
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

      <s.buttonCon style={{ marginTop: "25px" }}>
        <span style={{ color: "#599f22" }}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        {/* <span style={{ color: "#599f22" }}>
          ।। Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{
              color: "#599f22",
              marginLeft: "10px",
              marginRight: "10px",
              outlineColor: "#599f22",
              paddingLeft:"20px"
            }}
          />
        </span> */}
        <s.navButton
          style={{
            background: !canPreviousPage ? "#DEECD3" : "#599f22",
            color: !canPreviousPage ? "#599f22" : "#DEECD3",
            padding: "5px 10px",
          }}
          onClick={() => gotoPage(0)}
        >
          {"<<"}
        </s.navButton>
        <s.navButton
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{
            background: !canPreviousPage ? "#DEECD3" : "#599f22",
            color: !canPreviousPage ? "#599f22" : "#DEECD3",
            padding: "5px 10px",
          }}
        >
          Previous
        </s.navButton>
        <s.navButton
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{
            background: !canNextPage ? "#DEECD3" : "#599f22",
            color: !canNextPage ? "#599f22" : "#DEECD3",
            padding: "5px 10px",
          }}
        >
          Next
        </s.navButton>
        <s.navButton
          style={{
            background: !canNextPage ? "#DEECD3" : "#599f22",
            color: !canNextPage ? "#599f22" : "#DEECD3",
            padding: "5px 10px",
          }}
          onClick={() => gotoPage(pageCount - 1)}
        >
          {">>"}
        </s.navButton>
      </s.buttonCon>
    </>
  );
};

export default Table;
