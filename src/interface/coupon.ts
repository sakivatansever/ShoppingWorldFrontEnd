export interface ICoupon {
  id: string;
  code: string;
  name: string;
  description?: string;
  type: CouponType;
  value: number;
  minBasketAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usageCount: number;
  usagePerCustomer?: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  target: ICouponTarget;
  createdAt: Date;
  updatedAt: Date;
}

export enum CouponType {
  Percentage = 'percentage',
  FixedAmount = 'fixedAmount',
  FreeDelivery = 'freeDelivery'
}

export interface ICouponTarget {
  applyToAll: boolean;
  categoryIds?: string[];
  productIds?: string[];
  customerSegments?: string[];
}

export const CouponTypeLabels: Record<CouponType, string> = {
  [CouponType.Percentage]: 'Yüzde İndirim',
  [CouponType.FixedAmount]: 'Sabit Tutar İndirim',
  [CouponType.FreeDelivery]: 'Ücretsiz Teslimat'
};
