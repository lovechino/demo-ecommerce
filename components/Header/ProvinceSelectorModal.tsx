"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

// List of all Vietnamese provinces/cities
const vietnamProvinces = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Thành phố Hồ Chí Minh",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
]

// Custom SVG icons
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-red-500"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

interface ProvinceSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectProvince: (province: string) => void
  selectedProvince?: string
}

export default function ProvinceSelectorModal({
  open,
  onOpenChange,
  onSelectProvince,
  selectedProvince,
}: ProvinceSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProvinces, setFilteredProvinces] = useState(vietnamProvinces)
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onOpenChange])

  // Filter provinces based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProvinces(vietnamProvinces)
    } else {
      const filtered = vietnamProvinces.filter((province) => province.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredProvinces(filtered)
    }
  }, [searchTerm])

  // Handle client-side rendering for portal
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!mounted || !open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center p-4 border-b">
          <div className="relative flex-1">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Nhập tên tỉnh thành"
              className="pl-8 pr-2 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="ml-2 px-3 py-2 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700 transition-colors"
            onClick={() => onOpenChange(false)}
          >
            Đóng <CloseIcon />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-500 mb-4">
            Vui lòng chọn tỉnh, thành phố để biết chính xác giá, khuyến mãi và tồn kho
          </p>

          <div className="grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto">
            {filteredProvinces.map((province) => (
              <div
                key={province}
                className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded"
                onClick={() => {
                  onSelectProvince(province)
                  onOpenChange(false)
                }}
              >
                <span className="text-sm font-medium">
                  {province === "Thành phố Hồ Chí Minh" ? "Hồ Chí Minh" : province}
                </span>
                {selectedProvince === province && <CheckIcon />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
