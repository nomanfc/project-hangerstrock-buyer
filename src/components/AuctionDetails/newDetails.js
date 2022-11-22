import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ReactImageMagnify from "react-image-magnify";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StarIcon from "@mui/icons-material/Star";
import GavelIcon from "@mui/icons-material/Gavel";
import LoginIcon from "@mui/icons-material/Login";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "@mui/material/Modal";
// import Accordion from "react-bootstrap/Accordion";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  get_auction_details_by_aid,
  post_bid,
  get_app_settings,
} from "../../http_requests/httpreq.js";

import TableManifest from "./tableManifest";
import { useUserContext } from "../../contexts/UserContext";

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

//modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "fit-content",
  border: "none",
  bgcolor: "background.paper",
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px`,
  p: 4,
};

const AuctionDetail = (props) => {
  const router = useRouter();
  const { user, logout } = useUserContext();
  const [windowWidth, setWindowWidth] = useState(1900);
  const [details, setDetails] = useState();
  const [settings, setSettings] = useState();
  const [bid_data, setBidData] = useState({
    user_id: user?.id,
    auction_id: router.query.id,
  });

  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [expanded2, setExpanded2] = React.useState("panel2");
  const handleChange2 = (panel) => (event, newExpanded) => {
    setExpanded2(newExpanded ? panel : false);
  };

  const [expanded3, setExpanded3] = React.useState("panel3");
  const handleChange3 = (panel) => (event, newExpanded) => {
    setExpanded3(newExpanded ? panel : false);
  };

  const [bidSuccessMsg, setBidSuccessMsg] = useState(false);
  const [bidButton, setBidButton] = useState(false);
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //get auctions details
  const fetchData = useCallback(async () => {
    const data = await get_auction_details_by_aid(router.query.id);
    setDetails(data.data.data);

    const dataSettings = await get_app_settings();
    setSettings(dataSettings.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  //   useEffect(()=>{
  //     get_auction_details_by_aid(router.query.id).then((res)=>{
  //         setDetails(data.data.data);
  //          setImage(data.data.data.media_files[0].file_key);
  //     });
  //   },[])

  const handleBidChange = (e) => {
    setBidData({ ...bid_data, [e.target.name]: e.target.value });

    if (
      details?.product_details?.bid_ends_in_second !== null &&
      details?.product_details?.bid_ends_in_second > 0
    ) {
      if (details?.bidder_details.length) {
        if (
          e.target.value >=
          parseInt(details?.product_details?.max_bid) +
            parseInt(settings?.bid_interval)
        ) {
          fetchData();
          setBidButton(true);
        }

        if (
          e.target.value <
          parseInt(details?.product_details?.max_bid) +
            parseInt(settings?.bid_interval)
        ) {
          fetchData();
          setBidButton(false);
        }
      }

      if (!details?.bidder_details.length) {
        if (
          e.target.value >= parseInt(details?.bid_details?.opening_bid_amount)
        ) {
          fetchData();
          setBidButton(true);
        }

        if (
          e.target.value < parseInt(details?.bid_details?.opening_bid_amount)
        ) {
          fetchData();
          setBidButton(false);
        }
      }
    }
  };

  const handleBidSubmit = () => {
    if (user === null) {
      window.alert("Please login to post bid");
      setTimeout(() => {
        // navigate("/buyerlogin");
      }, 500);
    }

    if (user && user.token) {
      post_bid(bid_data).then((res) => {
        if (res.data.success === 1) {
          setBidSuccessMsg(true);
          fetchData();
          setBidButton(false);
          setTimeout(() => {
            setBidSuccessMsg(false);
          }, 2000);
        }
      });
    }
  };

  const handleImageChange = (data) => () => {
    setImage(data.data.file_key);
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchData();
  //   }, 1000);
  // });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={`https://main.hangerstock.com/api/auction/media/file/${image}`}
            onClick={handleOpen}
            style={{
              height: "400px",
              width: "100%",
              objectFit: "fill",
              cursor: "pointer",
            }}
          />
        </Box>
      </Modal>

      <div style={{ marginBottom: "150px", fontWeight: 700 }}>
        <div
          style={{
            width: windowWidth < 1200 ? "100%" : "95%",
            margin: "auto",
            height: "fit-content",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{ marginBottom: "25px", cursor: "pointer" }}
              onClick={() => router.back()}
            >
              <IoArrowBackSharp
                style={{
                  color: "#599f22",
                  fontSize: "25px",
                }}
              />
            </div>
          </div>
          <div
            style={{
              fontWeight: 600,
              fontSize: "25px",
              borderBottom: "0.5px solid #D3D3D3",
              paddingBottom: "15px",
              color: "#636363",
            }}
          >
            {" "}
            {details?.product_details?.title}
          </div>

          <div
            style={{
              height: "fit-content",
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0px",
              flexDirection: windowWidth < 1200 ? "column" : "row",
            }}
          >
            <div
              style={{
                height: "fit-content",
                width: "100%",
                display: "flex",
                alignItems: "center",
                color: "#808080",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "fit-content",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    padding: "10px 20px",
                    width: "100%",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    background: "#BDD9A7",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "15%",
                      marginRight: "50px",
                    }}
                  >
                    <LocalShippingIcon style={{ color: "#808080" }} />
                    <span style={{ marginLeft: "5px", color: "#808080" }}>
                      {details?.product_details?.quantity + " " + "Units"}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      marginRight: "50px",
                    }}
                  >
                    <GavelIcon style={{ color: "#808080" }} />
                    <span style={{ marginLeft: "5px", color: "#808080" }}>
                      {details?.product_details?.bid_count + " " + "Bids"}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      marginRight: "50px",
                    }}
                  >
                    <StarIcon style={{ color: "#808080" }} />
                    <span style={{ marginLeft: "5px", color: "#808080" }}>
                      {details?.product_details?.product_condition}
                    </span>
                  </div>
                </div>

                <div style={{ marginLeft: "15%" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "fit-content",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "50px",
                      marginBottom: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                        textAlign: "right",
                      }}
                    >
                      Current Bid:
                    </div>

                    <div
                      style={{
                        width: "50%",
                        fontWeight: "600",
                        color: "#444444",
                      }}
                    >
                      {details?.bidder_details.length
                        ? parseInt(
                            details?.product_details?.max_bid
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                        : parseInt(
                            details?.bid_details?.opening_bid_amount
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}

                      <span
                        style={{
                          fontSize: "15px",
                          color: "#599f22",
                          marginLeft: "15px",
                          cursor: "pointer",
                        }}
                      ></span>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "fit-content",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                        textAlign: "right",
                      }}
                    >
                      Additional Charges:
                    </div>

                    <div
                      style={{
                        width: "50%",
                      }}
                    >
                      <span style={{ fontWeight: "600", color: "#444444" }}>
                        + $ {settings?.hanger_stock_fee}{" "}
                      </span>{" "}
                      <span>Hanger Stock Fee</span>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "fit-content",
                      alignItems: "center",
                      marginBottom: "10px",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                      }}
                    ></div>

                    <div
                      style={{
                        width: "50%",
                      }}
                    >
                      <span style={{ fontWeight: "600", color: "#444444" }}>
                        + $ {details?.shipping_details?.shipping_cost}{" "}
                      </span>{" "}
                      <span>Shipping cost</span>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "fit-content",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                        textAlign: "right",
                        display: details?.bidder_details.length
                          ? "block"
                          : "none",
                      }}
                    >
                      Avg. Cost Per Unit:
                    </div>

                    <div
                      style={{
                        width: "50%",
                        fontWeight: "600",
                        color: "#444444",
                        display: details?.bidder_details.length
                          ? "block"
                          : "none",
                      }}
                    >
                      {(
                        details?.product_details?.max_bid /
                        details?.product_details?.quantity
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "fit-content",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                        textAlign: "right",
                      }}
                    >
                      Closes in:
                    </div>

                    <div
                      style={{
                        width: "50%",
                        color: "#444444",
                        fontWeight: "600",
                      }}
                    >
                      {details?.product_details?.bid_ends_in_second !== null &&
                      details?.product_details?.bid_ends_in_second > 0 ? (
                        secondsToHms(
                          details?.product_details?.bid_ends_in_second
                        )
                      ) : (
                        <span style={{ color: "red" }}>Bid Closed</span>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "fit-content",
                      display: "flex",

                      marginBottom: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                        textAlign: "right",
                      }}
                    >
                      Close Date:
                    </div>

                    <div
                      style={{
                        width: "50%",
                      }}
                    >
                      {details?.product_details?.bid_ends_in_second !== null &&
                      details?.product_details?.bid_ends_in_second > 0 ? (
                        moment(details?.bid_details?.closed_at).format("LLLL")
                      ) : (
                        <span style={{ color: "orange" }}>Date Expired</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "35px",
              display: user === null ? "none" : "block",
            }}
          >
            <div style={{ width: "100%", margin: "auto" }}>
              <div
                style={{
                  fontWeight: 700,
                  color: "#599f22",
                  fontSize: "25px",
                  paddingTop: "25px",
                }}
              >
                Auction Details
              </div>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ background: "#DEECD3" }}
                >
                  <Typography>Product Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",

                      margin: "15px auto auto auto",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Category
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.product_details?.category}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Cosmetic condtion
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.product_details?.cosmetic_condition}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "98%",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Product condition
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.product_details?.product_condition}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Inventory type
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.product_details?.inventory_type}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Quantity
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.product_details?.quantity}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Packing details
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.product_details?.packaging_details}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Original Reatail Price
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.product_details?.original_retail_price}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Description
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.product_details?.description}
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded2 === "panel2"}
                onChange={handleChange2("panel2")}
                style={{ marginTop: "20px" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ background: "#DEECD3" }}
                >
                  <Typography>Manifest</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableManifest dataTable={details?.manifest_details} />
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded3 === "panel3"}
                onChange={handleChange3("panel3")}
                style={{ marginTop: "20px" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ background: "#DEECD3" }}
                >
                  <Typography>Shipping Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",

                      margin: "15px auto auto auto",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Shipping Type
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.shipping_details?.shipping_type}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Shipping Cost
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.shipping_details?.shipping_cost}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Ship From
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.shipping_details?.ship_from}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Ship To
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.shipping_details?.ship_to}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Freight Type
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.shipping_details?.freight_name}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "98%",
                      marginTop: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px auto auto auto",
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      Shipping Notes
                    </div>
                    :
                    <div
                      style={{
                        width: "70%",
                        fontWeight: "400",
                      }}
                    >
                      {details?.shipping_details?.shipping_note}
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionDetail;
