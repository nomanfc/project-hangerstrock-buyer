import React from "react";
import Admin from "./Admins/Admin";
import AllSubmittedAuctions from "./Auctions/AllSubmittedAuction";
import Users from "./Users/Admin";
import AllBlogs from "./Blogs/Allblogs";
import SupportInbox from "./Messages/SupportInbox";
import ChartSum from "./Charts/ChartSum";

const DashBoard = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          margin: " auto",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100px",
            marginBottom: "30px",
          }}
        >
          <ChartSum />
        </div>
        <div
          style={{
            width: "100%",
            height: "fit-content",
            padding: "30px",

            boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`,
            borderRadius: "10px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              margin: "0px 0px 10px 0px",
              fontWeight: 600,
              color: "#599f22",
              fontSize: "18px",
            }}
          >
            Submitted Auctions
          </div>
          <AllSubmittedAuctions />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px"
          }}
        >
          <div
            style={{
              width: "49%",
              height: "fit-content",
              padding: "30px",

              boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`,
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                margin: "0px 0px 10px 0px",
                fontWeight: 600,
                color: "#599f22",
                fontSize: "18px",
              }}
            >
              Blogs
            </div>
            <AllBlogs />
          </div>

          <div
            style={{
              width: "49%",
              height: "fit-content",
              padding: "30px",

              boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`,
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                margin: "0px 0px 10px 0px",
                fontWeight: 600,
                color: "#599f22",
                fontSize: "18px",
              }}
            >
              Support Message
            </div>
            <SupportInbox />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "49%",
              height: "fit-content",
              padding: "30px",

              boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`,
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                margin: "0px 0px 10px 0px",
                fontWeight: 600,
                color: "#599f22",
                fontSize: "18px",
              }}
            >
              Users
            </div>
            <Users />
          </div>

          <div
            style={{
              width: "49%",
              height: "fit-content",
              padding: "30px",

              boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`,
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                margin: "0px 0px 10px 0px",
                fontWeight: 600,
                color: "#599f22",
                fontSize: "18px",
              }}
            >
              Admin
            </div>
            <Admin />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
