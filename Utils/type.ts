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
    Inheritance?: any;
    Brand?: any;
    IndustryClass?: any;
    Supplier?: any;
    LocationGps?: string;
    Long?: number | null;
    Wide?: number | null;
    High?: number | null;
    Weight?: number | null;
    UnitWeight?: string | null;
    Status?: string;
    ImpType?: any;
    Unit?: string;
    Currency?: any;
    Discount?: any;
    Tax?: any;
    Voucher?: any;
    Serial?: string;
    Note?: string | null;
    Image?: string;
    Price?: number;
    Packing?: string;
    attr?: {
      [key: string]: any;
    };
  };
  en_US?: {
    ProductCode?: string;
    ProductName?: string;
    GroupCode?: string;
    TypeCode?: string;
    Inheritance?: any;
    Brand?: any;
    IndustryClass?: any;
    Supplier?: any;
    LocationGps?: string;
    Long?: number | null;
    Wide?: number | null;
    High?: number | null;
    Weight?: number | null;
    UnitWeight?: string | null;
    Status?: string;
    ImpType?: any;
    Unit?: string;
    Currency?: any;
    Discount?: any;
    Tax?: any;
    Voucher?: any;
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
    Inheritance?: any;
    Brand?: any;
    IndustryClass?: any;
    Supplier?: any;
    LocationGps?: string;
    Long?: number | null;
    Wide?: number | null;
    High?: number | null;
    Weight?: number | null;
    UnitWeight?: string | null;
    Status?: string;
    ImpType?: any;
    Unit?: string;
    Currency?: any;
    Discount?: any;
    Tax?: any;
    Voucher?: any;
    Serial?: string;
    Note?: string | null;
    Image?: string;
    Price?: number;
    Packing?: string;
  };
}

export interface Product {
  Id: number;
  ProductCode: string;
  ProductName: string;
  ItemCode: string;
  ItemName: string;
  GroupCode: string;
  GroupCodeName: any;
  Group: any;
  TypeCode: string;
  TypeCodeName: any;
  TypeCode2: any;
  Note: any;
  Accessory: any;
  Status: string;
  Flag: any;
  Barcode: string;
  Image: string;
  Unit: string;
  UnitName: any;
  QrCode: string;
  Material: any;
  Pattern: any;
  Wide: number | null;
  Price: number;
  Tax: any;
  High: number | null;
  Long: number | null;
  Weight: number | null;
  UnitWeight: any;
  UnitNameWeight: any;
  Supplier: any;
  Brand: any;
  Inheritance: any;
  Description: string;
  Currency: any;
  InStock: number;
  ForecastInStock: number;
  ForecastTime: any;
  sForeCastTime: any;
  ExpireDate: any;
  sExpireDate: any;
  PricePerM: number;
  PricePerM2: number;
  PriceCostCatelogue: any;
  PriceCostAirline: any;
  PriceCostSea: any;
  PriceRetailBuild: any;
  PriceRetailBuildAirline: any;
  PriceRetailBuildSea: any;
  PriceRetailNoBuild: any;
  PriceRetailNoBuildAirline: any;
  PriceRetailNoBuildSea: any;
  Discount: any;
  Voucher: any;
  Label: any;
  ImpType: any;
  Packing: string;
  Json: string;
  DeletionToken: string;
  Serial: string;
  JsonStatus: string;
  MpStatuses: any[];
  LocationGps: string;
  LocationTxt: string;
  IndustryClass: any;
  LngCtx: LngCtx;
  ProductQr: any;
  CreatedBy: string;
  CreatedTime: string;
  UpdatedBy: string;
  UpdatedTime: string;
  DeletedBy: any;
  DeletedTime: any;
  IsDeleted: boolean;
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
  extra_fields: any | null; // Hoặc định nghĩa kiểu cụ thể nếu biết cấu trúc
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
  ListUserView: any | null; // Hoặc định nghĩa kiểu cụ thể nếu biết cấu trúc
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
