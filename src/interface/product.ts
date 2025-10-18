export interface IProduct {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  sku?: string;
  price: number;
  stock: number;
  images: string[];
  active: boolean;
  featured: boolean;
  variants: IProductVariant[];
  optionGroups: IProductOptionGroup[];
  allergens: string[];
  nutritionInfo?: INutritionInfo;
  preparationTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductVariant {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
  active: boolean;
}

export interface IProductOptionGroup {
  id: string;
  name: string;
  description?: string;
  required: boolean;
  minSelection: number;
  maxSelection: number;
  options: IProductOption[];
  displayOrder: number;
}

export interface IProductOption {
  id: string;
  name: string;
  price: number;
  active: boolean;
  stock?: number;
}

export interface INutritionInfo {
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  fiber?: number;
  sodium?: number;
}

export interface ICategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  displayOrder: number;
  active: boolean;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
