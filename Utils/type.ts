
export interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  images: { src: string }[];
  variants: {
    id: number;
    price: string;
  }[];
}

export interface ProductType {
  id: number;
  productcode: string;
  productname: string;
  locationTxt: string;
  locationGps: string;
  unit: string;
  productgroup: string;
  producttype: string;
  pathimg: string;
  material: string;
  pattern: string;
  note: string;
  sBarCode: string;
  sQrCode: string;
  supplier: string;
  brand: string;
  serial: string;
  jsonStatus: string;
  mappingCode: string;
  Specification: string;
  cusName: string;
  // listProductAttrGalaxy: []
  supName: string;
  Voucher: unknown;
  Currency: unknown;
  Price: number;
  Tax: number;
  Discount: number;
  mpStatus: unknown;
  expireDate: string;
  CreatedTime: string;
}

export interface CartIntemType {
  id: number;
  productname: string;
  Price: number;
  pathimg: string;
  qualitiy: number | 0;
  maxQuantity: number;
}

export interface ChildrenType {
  children: React.ReactNode;
}

export interface LoginType {
  username: string;
  password: string;
}

export type NotificationType = "success" | "info" | "warning" | "error";

export interface UserProfile {
  Id: number;
  UserName: string;
  Password?: string;
  FullName: string;
  Email: string;
  Address: string;
  IsOnline: number;
  Phone: string;
  Photo?: string;
  Gender?: "male" | "female" | string;
  BirthDay?: string;
  sBirthDay?: string;
  CreatedTime?: string;
  IsDeleted: boolean;
}
export interface DefaultUser {
  Id: "";
  UserName: "";
  Password?: "";
  FullName: "";
  Email: "";
  Address: "";
  IsOnline: "";
  Phone: "";
  Photo?: "";
  Gender?: "";
  BirthDay?: "";
  sBirthDay?: "";
  CreatedTime?: "";
  IsDeleted: "";
}

export interface LngCtx {
  vi_VN?: {
    ProductCode?: string;
    ProductName?: string;
    GroupCode?: string;
    TypeCode?: string;
    Inheritance?: string;
    Brand?: string;
    IndustryClass?: string;
    Supplier?: string;
    LocationGps?: string;
    Long?: number | null;
    Wide?: number | null;
    High?: number | null;
    Weight?: number | null;
    UnitWeight?: string | null;
    Status?: string;
    ImpType?: string;
    Unit?: string;
    Currency?: string;
    Discount?: string;
    Tax?: string;
    Voucher?: string;
    Serial?: string;
    Note?: string | null;
    Image?: string;
    Price?: number;
    Packing?: string;
    attr?: {
      [key: string]: string;
    };
  };
  en_US?: {
    ProductCode?: string;
    ProductName?: string;
    GroupCode?: string;
    TypeCode?: string;
    Inheritance?: string;
    Brand?: string;
    IndustryClass?: string;
    Supplier?: string;
    LocationGps?: string;
    Long?: number | null;
    Wide?: number | null;
    High?: number | null;
    Weight?: number | null;
    UnitWeight?: string | null;
    Status?: string;
    ImpType?: string;
    Unit?: string;
    Currency?: string;
    Discount?: string;
    Tax?: string;
    Voucher?: string;
    Serial?: string;
    Note?: string | null;
    Image?: string;
    Price?: number;
    Packing?: string;
  };
  cn_CN?: {
    ProductCode?: string;
    ProductName?: string;
    GroupCode?: string;
    TypeCode?: string;
    Inheritance?: string;
    Brand?: string;
    IndustryClass?: string;
    Supplier?: string;
    LocationGps?: string;
    Long?: number | null;
    Wide?: number | null;
    High?: number | null;
    Weight?: number | null;
    UnitWeight?: string | null;
    Status?: string;
    ImpType?: string;
    Unit?: string;
    Currency?: string;
    Discount?: string;
    Tax?: string;
    Voucher?: string;
    Serial?: string;
    Note?: string | null;
    Image?: string;
    Price?: number;
    Packing?: string;
  };
}

export interface Menu {
  Id: number;
  Code: string;
  Name: string;
  GroupType: string | null;
  ParentID: null | number;
  Level: null | number;
  Description: string;
  LngCtx: string | null;
  CreatedBy: string;
  UpdatedBy: null | string;
  CreatedTime: string;
  UpdatedTime: string;
  DeletedBy: null | string;
  DeletedTime: null | string;
  IsDeleted: boolean;
}

export interface Product {
  Id: number;
  ProductCode: string;
  ProductName: string;
  ItemCode: string;
  ItemName: string;
  GroupCode: string;
  GroupCodeName: string;
  Group: string;
  TypeCode: string;
  TypeCodeName: string;
  TypeCode2: string;
  Note: string;
  Accessory: string;
  Status: string;
  Flag: string;
  Barcode: string;
  Image: string;
  Unit: string;
  UnitName: string;
  QrCode: string;
  Material: string;
  Pattern: string;
  Wide: number | null;
  Price: number;
  Tax: string;
  High: number | null;
  Long: number | null;
  Weight: number | null;
  UnitWeight: string;
  UnitNameWeight: string;
  Supplier: string;
  Brand: string;
  Inheritance: string;
  Description: string;
  Currency: string;
  InStock: number;
  ForecastInStock: number;
  ForecastTime: string;
  sForeCastTime: string;
  ExpireDate: string;
  sExpireDate: string;
  PricePerM: number;
  PricePerM2: number;
  PriceCostCatelogue: string;
  PriceCostAirline: string;
  PriceCostSea: string;
  PriceRetailBuild: string;
  PriceRetailBuildAirline: string;
  PriceRetailBuildSea: string;
  PriceRetailNoBuild: string;
  PriceRetailNoBuildAirline: string;
  PriceRetailNoBuildSea: string;
  Discount: string;
  Voucher: string;
  Label: string;
  ImpType: string;
  Packing: string;
  Json: string;
  DeletionToken: string;
  Serial: string;
  JsonStatus: string;
  MpStatuses: string[];
  LocationGps: string;
  LocationTxt: string;
  IndustryClass: string;
  LngCtx: LngCtx;
  ProductQr: string;
  CreatedBy: string;
  CreatedTime: string;
  UpdatedBy: string;
  UpdatedTime: string;
  DeletedBy: string;
  DeletedTime: string;
  IsDeleted: boolean;
  Warranty: number;
}

export interface Article {
  id: number;
  title: string;
  alias: string;
  cat_id: number;
  published: boolean;
  intro_text: string;
  full_text: string;
  video: string | null;
  gallery: string;
  extra_fields: string | null; // Hoặc định nghĩa kiểu cụ thể nếu biết cấu trúc
  extra_fields_search: string | null;
  created: string | null; // Có thể là Date nếu xử lý thời gian
  created_by: number | null;
  created_by_alias: string;
  checked_out: number | null;
  checked_out_time: string | null; // Có thể là Date nếu xử lý thời gian
  modified: string; // Có thể là Date nếu xử lý thời gian
  modified_by: number | null;
  publish_up: string | null; // Có thể là Date nếu xử lý thời gian
  publish_down: string | null; // Có thể là Date nếu xử lý thời gian
  trash: number | null; // Có thể là boolean tùy theo cách biểu diễn
  access: number | null;
  ordering: number | null;
  featured: number | null; // Có thể là boolean tùy theo cách biểu diễn
  featured_ordering: number;
  image_caption: string;
  image_credits: string; // Quan sát thấy giá trị "null" dưới dạng string
  video_caption: string | null;
  video_credits: string | null;
  hits: number | null;
  params: string | null; // Hoặc định nghĩa kiểu cụ thể nếu biết cấu trúc JSON
  meta_desc: string | null;
  meta_data: string | null; // Hoặc định nghĩa kiểu cụ thể nếu biết cấu trúc JSON
  meta_key: string | null;
  plugins: string | null; // Hoặc định nghĩa kiểu cụ thể nếu biết cấu trúc JSON
  language: string;
  template: string;
  date_post: string; // Có thể là Date nếu xử lý thời gian
  ListUserView: string | null; // Hoặc định nghĩa kiểu cụ thể nếu biết cấu trúc
  short_content: string;
  multiple_language: string; // Chuỗi JSON, cần parse nếu muốn truy cập
  cat_related: string;
  json_log: string;
  count_view: number;
  show_intro: boolean;
  author: string;
  Tags: string;
  expiry_date: string; // Có thể là Date nếu xử lý thời gian
  org_id: number | null;
}

export interface Review {
  Id: number;
  UserName: string;
  Content: string;
  Image: string;
  CreatedAt: string;
  Rating: number;
}
