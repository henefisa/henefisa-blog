import React from "react";

export default function Table({ columns, dataSource, heading }) {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-5">{heading}</h1>
      <div className="align-middle inline-block min-w-full shadow-md overflow-hidden bg-white shadow-dashboard px-8 py-4 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
              {columns?.map(column => (
                <th key={column.key} className={column.className}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {dataSource?.map(data => (
              <tr key={data.key}>
                {columns?.map(col => (
                  <td key={col.key + data.key} className="py-4 whitespace-no-wrap border-b border-gray-500 text-blue-600">
                    {col.render ? col.render(data) : data[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
