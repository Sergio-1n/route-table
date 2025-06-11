'use client';

import { useState } from 'react';
import { sortByIp } from '@/utils/sort';

export interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

interface Props {
  routes: Route[];
}

type SortKey = keyof Pick<Route, 'address' | 'gateway' | 'interface'>;

export default function RouteTable({ routes }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('address');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedRoutes = [...routes].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (sortKey === 'address' || sortKey === 'gateway') {
      return sortByIp(aVal, bVal, sortAsc);
    }
    return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  return (
    <table className='w-full border-collapse border border-gray-300'>
      <thead>
        <tr>
          <th
            onClick={() => handleSort('address')}
            className='cursor-pointer border p-2'
          >
            Адрес назначения
          </th>
          <th
            onClick={() => handleSort('gateway')}
            className='cursor-pointer border p-2'
          >
            Шлюз
          </th>
          <th
            onClick={() => handleSort('interface')}
            className='cursor-pointer border p-2'
          >
            Интерфейс
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedRoutes.map(route => (
          <tr key={route.uuid} className='border-t'>
            <td className='border p-2'>{`${route.address}/${route.mask}`}</td>
            <td className='border p-2'>{route.gateway}</td>
            <td className='border p-2'>{route.interface}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
