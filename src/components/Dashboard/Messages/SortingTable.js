import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "next/link";
import Link from "next/link";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SubjectIcon from "@mui/icons-material/Subject";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
  const navigate = useRouter();
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
      initialState: { pageSize: 3 },
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
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
                      <Link
                        href={{
                          pathname: `/supportbox/details`,
                          query: {
                            data: row.original.message, // pass the id
                          },
                        }}
                      >
                        <Tooltip title="See details" aria-label="see details">
                          <IconButton onClick={props.handleApp({ row })}>
                            <SubjectIcon style={{ color: "#599f22" }} />
                          </IconButton>
                        </Tooltip>
                      </Link>

                      <Tooltip title="Remove" aria-label="remove">
                        <IconButton onClick={props.handleDelete({ row })}>
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
            height: "170px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ margin: "auto" }}> No Data Found</span>
        </div>
      )}

      <div style={{ width: "fit-content", margin: "auto" }}>
        <Button
          onClick={() => navigate.push("/supportbox")}
          style={{
            marginTop: "25px",
            color: "#599f22",
            textTransform: "none",
            pading: "10px 20px",
          }}
        >
          View All
        </Button>
      </div>
    </>
  );
};

export default Table;
