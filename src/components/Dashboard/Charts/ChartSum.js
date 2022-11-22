import React, { useState, useEffect, useCallback } from "react";
import {useRouter} from "next/router"
import {
  get_all_submitted,
  get_all_admins,
  get_all_blogs,
  get_all_message,
  get_all_users,
  get_app_settings,
} from "../../../http_requests/httpreq";

const ChartSum = () => {
  const router = useRouter();
  const [dashDataA, setDashDataA] = useState();
  const [dashDataU, setDashDataU] = useState();
  const [dashDataAd, setDashDataAd] = useState();
  const [dashDataB, setDashDataB] = useState();
  const [dashDataM, setDashDataM] = useState();
  const [dashDataChar, setDashDataChar] = useState();

  const fetchData = useCallback(async () => {
    const resA = await get_all_submitted();
    setDashDataA(resA.data.data);

    const resU = await get_all_users();
    setDashDataU(resU.data.data);

    const resAd = await get_all_admins();
    setDashDataAd(resAd.data.data);

    const resB = await get_all_blogs();
    setDashDataB(resB.data.data);

    const resM = await get_all_message();
    setDashDataM(resM.data.data);

    const resChar = await get_app_settings();
    setDashDataChar(resChar.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
      <div
        onClick={()=>router.push("/auctions")}
        style={{
          justifyContent: "space-around",
          display: "flex",
          alignItems: "center",
          boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`,
          borderRadius: "10px",
          background: "#DEECD3",
          height: "100px",
          width: "18%",
          padding: "30px 30px",
          cursor: "pointer"
        }}
      >
        <div style={{ fontWeight: 600, color: "green", fontSize: "16px" }}>
          <span>Auctions :</span> <span>{dashDataA?.length || "0"}</span>
        </div>
      </div>

      <div
      onClick={()=>router.push("/users")}
        style={{
          justifyContent: "space-around",
          display: "flex",
          alignItems: "center",
          boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`,
          borderRadius: "10px",
          background: "#DEECD3",
          height: "100px",
          width: "18%",
          padding: "30px 30px",
          cursor: "pointer"
        }}
      >
        <div style={{ fontWeight: 600, color: "green", fontSize: "16px" }}>
          <span>Users :</span> <span>{dashDataU?.length || "0"}</span>
        </div>
      </div>

      <div
      onClick={()=>router.push("/admin")}
        style={{
          justifyContent: "space-around",
          display: "flex",
          alignItems: "center",
          boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`,
          borderRadius: "10px",
          background: "#DEECD3",
          height: "100px",
          width: "18%",
          padding: "30px 30px",
          cursor: "pointer"
        }}
      >
        <div style={{ fontWeight: 600, color: "green", fontSize: "16px" }}>
          <span>Admins :</span> <span>{dashDataAd?.length || "0"}</span>
        </div>
      </div>

      <div
      onClick={()=>router.push("/blogs")}
        style={{
          justifyContent: "space-around",
          display: "flex",
          alignItems: "center",
          boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`,
          borderRadius: "10px",
          background: "#DEECD3",
          height: "100px",
          width: "18%",
          padding: "30px 30px",
          cursor: "pointer"
        }}
      >
        <div style={{ fontWeight: 600, color: "green", fontSize: "16px" }}>
          <span>Blogs :</span> <span>{dashDataB?.length || "0"}</span>
        </div>
      </div>

      <div
      onClick={()=>router.push("/supportbox")}
        style={{
          justifyContent: "space-around",
          display: "flex",
          alignItems: "center",
          boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px`,
          borderRadius: "10px",
          background: "#DEECD3",
          height: "100px",
          width: "18%",
          padding: "30px 30px",
          cursor: "pointer"
        }}
      >
        <div style={{ fontWeight: 600, color: "green", fontSize: "16px" }}>
          <span>Messages :</span> <span>{dashDataM?.length || "0"}</span>
        </div>
      </div>
    </div>
  );
};

export default ChartSum;
