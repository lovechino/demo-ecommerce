export interface Language {
  icon: string;
  name: string;
  code: string;
}

export const languages: Language[] = [
  {
    name: "Tiếng Việt",
    code: "vi_VN",
    icon: "https://flagcdn.com/w20/vn.png", // URL cờ Việt Nam (size nhỏ)
  },
  {
    name: "English",
    code: "en_US",
    icon: "https://flagcdn.com/w20/us.png", // URL cờ Mỹ (size nhỏ)
  },
  {
    name: "简体中文",
    code: "zh_CN", // Sử dụng mã phổ biến hơn
    icon: "https://flagcdn.com/w20/cn.png", // URL cờ Trung Quốc (size nhỏ)
  },
];
