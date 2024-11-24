import { useVirtualizer } from '@tanstack/react-virtual';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { useRef } from 'react';

export const ROW_HEIGHT = 48;
export const OVERSCAN = 5;

export function useVirtualTable<T>(data: T[], columns: ColumnDef<T, any>[]) {
  const parentRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  return {
    table,
    rows,
    rowVirtualizer,
    parentRef,
  };
}
