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
