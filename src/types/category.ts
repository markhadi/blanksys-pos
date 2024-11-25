export interface Category {
  id: number;
  categoryName: string;
}

export interface CategoryTableProps {
  data: Category[];
  isLoading?: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export interface CategorySearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}
