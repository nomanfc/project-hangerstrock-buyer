import React, { useState, useEffect } from "react";
import moment from "moment";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import {get_blog_by_id} from "../../../http_requests/httpreq"

const BlogDetails = () => {
  const [blogData, setblogData] = useState();
  const router = useRouter();
  const windowWidth = 1400;

  useEffect(()=>{
    get_blog_by_id(router?.query?.id).then((res)=>{
        setblogData(res.data.data)
    })
  },[])


  return (
    <div style={{ marginTop: "50px" }}>
      <div
        style={{
          width: windowWidth < 1200 ? "95%" : "60%",
          margin: "auto",
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

        <div
          style={{
            fontSize: "25px",
            fontWeight: 600,
            color: "#444444",
          }}
        >
          {blogData?.title}
        </div>

        <div
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#599F22",
            margin: "15px 0px",
          }}
        >
          { moment(`${blogData?.created_at}`).format("ll") + " " + "-" + " Hanger Stock Editorial Team"}
        </div>

        <div
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#599F22",
            margin: "15px 0px",

            height: "400px",
            borderRadius: "10px",
          }}
        >
          <img
            src={blogData && blogData.file_key? `https://main.hangerstock.com/api/auction/media/file/${blogData.file_key}` : null}
            style={{
              height: "400px",
              width: "100%",
              objectFit: "fill",
            }}
          />
        </div>

        <div
          style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#444444",
            margin: "35px 0px",
          }}
        >
          {blogData?.description}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
