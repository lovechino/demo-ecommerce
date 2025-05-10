'use client';
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/Redux/hook';
import Fuse from 'fuse.js';
import Image from 'next/image';
import Link from 'next/link';
import { baseURL } from '@/Utils/Axios';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('query') || '';
  const productList = useAppSelector((state) => state.product.list);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const fuse = new Fuse(productList, {
    keys: ['productname'],
    threshold: 0.4,
    distance: 100,
    minMatchCharLength: 2,
  });

  const results = keyword ? fuse.search(keyword).map((res) => res.item) : [];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Kết quả tìm kiếm cho: &ldquo;{keyword}&rdquo;</h1>
      {results.length === 0 ? (
        <p>Không tìm thấy sản phẩm nào phù hợp.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((item, idx) => (
            <Link href={`/Product/${item.productcode}`} key={idx} className="border rounded p-2 hover:shadow hover:backdrop-blur-sm transition-all duration-300">
              <Image
                src={`${baseURL}${item.pathimg}`}
                alt={item.productname}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="font-medium text-sm">{item.productname}</h2>
              <p className="text-red-500 font-semibold">{formatCurrency(item.Price)}đ</p>
            </Link>
          ))}
        </div>
      )}
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`
          fixed z-50 bg-gray-400 text-white p-3 rounded-full shadow-lg
          transition-all duration-300 hover:bg-gray-500
          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
          md:bottom-8 md:right-8
          bottom-20 right-4
        `}
        style={{ zIndex: 100 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
};

export default SearchPage;
