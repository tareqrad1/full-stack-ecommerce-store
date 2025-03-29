const SkeletonTable = () => {
    return (
      <div className="text-white mt-7 overflow-x-auto w-full">
        <table className="min-w-[1000px] mx-auto overflow-x-scroll divide-y-2 divide-gray-20">
          <thead className="ltr:text-left rtl:text-right text-white bg-gray-700">
            <tr className="*:font-medium *:text-white">
              <th className="px-3 py-2 whitespace-nowrap">Product</th>
              <th className="px-3 py-2 whitespace-nowrap">Price</th>
              <th className="px-3 py-2 whitespace-nowrap">Category</th>
              <th className="px-3 py-2 whitespace-nowrap">Featured</th>
              <th className="px-3 py-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-800">
            {[...Array(7)].map((_, idx) => (
              <tr key={idx} className="*:first:font-medium *:text-[#ccc]">
                <td className="px-3 py-2 whitespace-nowrap flex gap-3 items-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-full animate-pulse"></div>
                  <div className="w-32 h-4 bg-gray-600 rounded animate-pulse"></div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="w-16 h-4 bg-gray-600 rounded animate-pulse"></div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="w-20 h-4 bg-gray-600 rounded animate-pulse"></div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="w-6 h-6 bg-gray-600 rounded animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SkeletonTable;
  