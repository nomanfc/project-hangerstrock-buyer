import axios from "axios";
import { BASE_URL } from "../constants/constant";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  if (Cookies.get("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(Cookies.get("user"))?.token
    }`;
  }
  return req;
});

// Admin Login
export const login_admin = (email, password) => {
  return API.post("/api/admin/login", {
    email,
    password,
  });
};
//get user profile by user_id
export const get_user_by_id = (user_id) =>
  API.post("/api/user/get/id", { id: parseInt(user_id) });

// Change Password
export const change_password = (id, old_password, new_password) =>
  API.post("/api/user/change/password", {
    old_password,
    new_password,
    id: parseInt(id),
  });

// Get All Countries
export const get_all_countries = () => API.get("/api/country/get");

// Get All Regions
export const get_all_regions = () => API.get("/api/region/get/all");

// Get All States
export const get_all_states = () => API.get("/api/state/get/all");

// Get States By Country
export const get_states_by_country = (countryId) =>
  API.get(`/api/state/by/country/${countryId}`);

// Get All Business Types
export const get_all_business_types = () => API.get("/api/business/type/get");

// Get All Address Types
export const get_all_address_types = () => API.get("/api/address/type/get");

//Add Country
export const add_country = (data) => API.post("/api/country/create", data);

//Add Region
export const add_region = (data) => API.post("/api/region/create", data);

//Add State
export const add_state = (data) => API.post("/api/state/create", data);

//Update Business Profie
export const update_business_profile = (data, id, user_id) =>
  API.post("/api/user/business/profile/update", data);

//Get Live Auctions
export const get_live_auctions = (user_id) =>
  API.post("/api/auction/user/live", { user_id: parseInt(user_id) });

//Get Submitted Auctions
export const get_submitted_auctions = (user_id) =>
  API.post("/api/auction/user/submitted", { user_id: parseInt(user_id) });

//Get Draft Auctions
export const get_draft_auctions = (user_id) =>
  API.post("/api/auction/user/draft", { user_id: parseInt(user_id) });

//Get Published/Unpublished Auctions
export const publish_unpublish_auctions = (user_id, auction_id) =>
  API.post("/api/auction/update/is_published", {
    user_id: parseInt(user_id),
    auction_id: parseInt(auction_id),
  });

//Get Approved/Denied Auctions
export const approve_deny_auctions = (user_id, auction_id) =>
  API.post("/api/auction/update/is_approved", {
    user_id: parseInt(user_id),
    auction_id: parseInt(auction_id),
  });

/* ********************************************************* */
/* Noman */
/* ********************************************************** */
//update publish status
export const publish_bid = (auction_id) =>
  API.post("/api/auction/update/is_published", {
    is_published: parseInt(1),
    auction_id: parseInt(auction_id),
  });

export const unpublish_bid = (auction_id) =>
  API.post("/api/auction/update/is_published", {
    is_published: parseInt(0),
    auction_id: parseInt(auction_id),
  });

//get categories
export const get_categories = () =>
  API.post(`/api/auction/product/category/get`);

//create categories
export const create_category = (addData) =>
  API.post(`/api/auction/product/category/create`, addData);

//create conditions
export const create_condition = (addData) =>
  API.post(`/api/auction/product/condition/create`, addData);

//create inventory
export const create_inventory = (addData) =>
  API.post(`/api/auction/product/inventory/type/create`, addData);

//create inventory
export const create_freight = (addData) =>
  API.post(`/api/auction/product/freight/type/create`, addData);

//edit categories
export const edit_category = (editData) =>
  API.post(`/api/auction/product/category/update`, {
    id: parseInt(editData.id),
    category_name: editData.category_name,
  });

//edit condition
export const edit_condition = (editData) =>
  API.post(`/api/auction/product/condition/update`, {
    id: parseInt(editData.id),
    condition_name: editData.condition_name,
  });

//edit invventory
export const edit_inventory = (editData) =>
  API.post(`/api/auction/product/inventory/type/update`, {
    id: parseInt(editData.id),
    inventory_name: editData.inventory_name,
  });

//edit freight
export const edit_freight = (editData) =>
  API.post(`/api/auction/product/freight/type/update`, {
    id: parseInt(editData.id),
    freight_name: editData.freight_name,
  });

//hide cat
export const hide_category = (deleteData) =>
  API.post(`/api/auction/product/category/hide`, {
    id: parseInt(deleteData),
    is_hidden: true,
  });

//hide freight
export const hide_freight = (deleteData) =>
  API.post(`/api/auction/product/freight/type/hide`, {
    id: parseInt(deleteData),
    is_hidden: true,
  });

//hide condition
export const hide_condition = (deleteData) =>
  API.post(`/api/auction/product/condition/hide`, {
    id: parseInt(deleteData),
    is_hidden: true,
  });

//hide inventory
export const hide_inventory = (deleteData) =>
  API.post(`/api/auction/product/inventory/type/hide`, {
    id: parseInt(deleteData),
    is_hidden: true,
  });

//unhide cat
export const unhide_category = (deleteData) =>
  API.post(`/api/auction/product/category/hide`, {
    id: parseInt(deleteData.id),
    is_hidden: false,
  });

//get cat by id
export const get_categories_by_id = (cate_id) =>
  API.post(`/api/auction/product/category/get/id`, {
    id: parseInt(cate_id),
  });

//get con by id
export const get_conditions_by_id = (cate_id) =>
  API.post(`/api/auction/product/condition/get/id`, {
    id: parseInt(cate_id),
  });

//get inventory by id
export const get_inventories_by_id = (cate_id) =>
  API.post(`/api/auction/product/inventory/type/get/id`, {
    id: parseInt(cate_id),
  });

//get freightby id
export const get_freights_by_id = (cate_id) =>
  API.post(`/api/auction/product/freight/type/get/id`, {
    id: parseInt(cate_id),
  });

//create condition

//get inventory
export const get_inventories = () =>
  API.post(`/api/auction/product/inventory/type/get`);

//get condition
export const get_conditions = () =>
  API.post(`/api/auction/product/condition/get`);

//get regions
export const get_regions = () => API.get(`/api/region/get/all`);

//get country by region
export const get_countries = (region_id) =>
  API.get(`/api/country/by/region/${region_id}`);

//get states by country
export const get_states = (state_id) =>
  API.get(`/api/state/by/country/${state_id}`);

//get freight type
export const get_freights = () =>
  API.post(`/api/auction/product/freight/type/get`);

//create auction: post details
export const create_postdetails = (postDetails) =>
  API.post(`/api/auction/create`, postDetails);

//create auction: post details mobile
export const create_postdetails_mobile = (postDetailsMobile) =>
  API.post(`/api/auction/details/mobile/create`, postDetailsMobile);

export const create_postshipping = (shippingDetails) =>
  API.post(`/api/auction/details/shipping/create`, shippingDetails);

export const create_postmanifest = (countManifest) =>
  API.post(`/api/auction/details/manifest/create`, countManifest);

export const create_postbidding = (bidDetails) =>
  API.post(`/api/auction/details/bid/create`, bidDetails);

export const create_upload_one = (formData1) =>
  API.post(`/api/auction/media/file/upload`, formData1);

export const create_upload_two = (formData2) =>
  API.post(`/api/auction/media/file/upload`, formData2);

export const create_upload_three = (formData3) =>
  API.post(`/api/auction/media/file/upload`, formData3);

export const create_upload_four = (formData4) =>
  API.post(`/api/auction/media/file/upload`, formData4);

//final submit api
export const submit_post_auctioin = (submit_ids) =>
  API.post(`/api/auction/update/is_submitted`, submit_ids);

//get all bids by auction_id
export const get_all_bids_by_aid = (id) =>
  API.post(`/api/user/auction/bid/id`, { auction_id: parseInt(id) });

//get bid details by auction_id
export const get_auction_details_by_aid = (id) =>
  API.get(`/api/auction/full/details/get/${id}`);

//get bid details by auction_id
export const get_draft_details_by_aid = (id) =>
  API.post(`/api/auction/get/id`, { auction_id: parseInt(id) });

//update product details
export const update_post_details = (postDetails) =>
  API.post(`/api/auction/update`, postDetails);

//update product detailsMobile
export const update_post_details_mobile = (productDetailsMobile) =>
  API.post(`/api/auction/details/mobile/update`, productDetailsMobile);

//update shipping details
export const update_shipping_details = (shippingDetails) =>
  API.post(`/api/auction/details/shipping/update`, shippingDetails);

//update manifest
export const update_postmanifest = (countManifest) =>
  API.post(`/api/auction/details/manifest/update`, countManifest);

//Delete manifest
export const remove_postmanifest = (countManifest) =>
  API.post(`/api/auction/details/manifest/remove`, {
    auction_id: countManifest.auction_id,
    id: countManifest.id,
  });

//Update Bid details
export const update_bid_details = (bidDetails) =>
  API.post(`/api/auction/details/bid/update`, bidDetails);

//remove draft
export const remove_auction_by_id = (deleteData) =>
  API.post(`/api/auction/remove`, {
    user_id: parseInt(deleteData.user_id),
    id: parseInt(deleteData.id),
  });

//get all Users
export const get_all_users = () => API.get(`/api/user/get/all`);

//Remove user
export const remove_user_by_id = (deleteData) =>
  API.post(`/api/user/remove/id`, { id: parseInt(deleteData) });

//get all Users
export const get_all_admins = () => API.get(`/api/admin/get`);

//Remove user
export const remove_admin_by_id = (deleteData) =>
  API.post(`/api/admin/delete`, { id: parseInt(deleteData) });

//create Admin
export const create_admin = (adminData) =>
  API.post(`/api/admin/create`, adminData);

//app settings
export const get_app_settings = () => API.get(`/api/app/setting`);

//edit Setting
export const update_app_settings = (user) =>
  API.post(`/api/app/setting/update`, user);

//get all submitted data by every user
export const get_all_submitted = () => API.post(`/api/auction/submitted`);

//remove auction by id
export const remove_auction = (deleteData) =>
  API.post(`/api/auction/remove`, {
    id: parseInt(deleteData.id),
    user_id: parseInt(deleteData.user_id),
  });

//change approval
export const approve_auction = (approveData) =>
  API.post(`/api/auction/update/is_approved`, {
    is_approved: 1,
    auction_id: parseInt(approveData.auction_id),
  });

// get all blog types
export const get_all_blog_types = () => API.post(`/api/blog/type/all`);

//CREATE bLOG
export const create_blog = (formData1) =>
  API.post(`/api/admin/blog/create`, formData1);

//EDIT bLOG
export const edit_blog = (formData1) =>
  API.post(`/api/admin/blog/update`, formData1);

//get all blogs
export const get_all_blogs = () => API.post(`/api/admin/blog/all`);

//get all buyers blog
export const get_buyers_blog = () => API.get(`/api/admin/blog/published/1`);

//get all sellers blog
export const get_sellers_blog = () => API.get(`/api/admin/blog/published/2`);

//get all shipping blog
export const get_shipping_blog = () => API.get(`/api/admin/blog/published/3`);

//handle app unpuiblish
export const blog_unpub = (dataUnPub) =>
  API.post("/api/admin/blog/update/is_published", {
    id: dataUnPub,
    is_published: 0,
  });

//handle app puiblish
export const blog_pub = (dataPub) =>
  API.post("/api/admin/blog/update/is_published", {
    id: dataPub,
    is_published: 1,
  });

//remove blog
export const blog_remove = (deleteData) =>
  API.post("/api/admin/blog/remove", {
    id: deleteData.id,
  });

//get blog by id
export const get_blog_by_id = (blogId) => API.get(`/api/admin/blog/${blogId}`);

//get all support message
export const get_all_message = () => API.post(`/api/customer/support/all`);

//delete message by id
export const message_remove = (deleteData) =>
  API.post("/api/customer/support/remove", {
    id: deleteData.id,
  });

//location data

//remove state
export const state_remove = (deleteDataState) =>
  API.post("/api/state/remove", {
    id: deleteDataState.id,
  });

//remove country
export const country_remove = (deleteDataCoun) =>
  API.post("/api/country/remove", {
    id: deleteDataCoun.id,
  });

//remove region
export const region_remove = (deleteDataReg) =>
  API.post("/api/region/remove", {
    id: deleteDataReg.id,
  });

//update Region
export const region_update = (EditDataReg) =>
  API.post("/api/region/update", {
    id: EditDataReg.id,
    name: EditDataReg.name,
  });

//update Country
export const country_update = (EditDataCoun) =>
  API.post("/api/country/update", {
    id: EditDataCoun.id,
    name: EditDataCoun.name,
    region_id: EditDataCoun.region_id,
  });


//update State
export const state_update = (EditDataState) =>
  API.post("/api/state/update", {
    id: EditDataState.id,
    name: EditDataState.name,
    country_id: EditDataState.country_id,
  });