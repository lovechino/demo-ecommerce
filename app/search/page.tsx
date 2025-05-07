'use client';
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/Redux/hook';
import Fuse from 'fuse.js';
import Image from 'next/image';
import Link from 'next/link';
import { baseURL } from '@/Utils/Axios';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('query') || '';
  const productList = useAppSelector((state) => state.product.list);

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
            <Link href={`/Product/${item.productcode}`} key={idx} className="border rounded p-2 hover:shadow">
              <Image
                src={`${baseURL}${item.pathimg}`}
                alt={item.productname}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="font-medium text-sm">{item.productname}</h2>
              <p className="text-red-500 font-semibold">{item.Price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
