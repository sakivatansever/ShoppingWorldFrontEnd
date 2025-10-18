import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCoupons } from '../services/coupon/couponService';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { LottieHandler } from '../components/Feedback';
import { CouponTypeLabels } from '../interface/coupon';

const Coupons = () => {
  const dispatch = useAppDispatch();
  const { coupons, total, page, pageSize, loading } = useAppSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(getCoupons({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  if (loading === 'pending') {
    return <LottieHandler type="loading" message="Kuponlar yükleniyor..." />;
  }

  return (
    <div>
      <div className="k-d-flex k-justify-content-between k-align-items-center k-mb-4">
        <h2 className="k-m-0">Kupon Yönetimi</h2>
        <Button themeColor="primary">Yeni Kupon Ekle</Button>
      </div>

      <Grid data={coupons} pageable>
        <GridColumn field="code" title="Kupon Kodu" width="150px" />
        <GridColumn field="name" title="Kupon Adı" />
        <GridColumn
          field="type"
          title="Tip"
          width="180px"
          cell={(props) => <td>{CouponTypeLabels[props.dataItem.type]}</td>}
        />
        <GridColumn
          field="value"
          title="Değer"
          width="100px"
          cell={(props) => (
            <td>
              {props.dataItem.type === 'percentage' ? `%${props.dataItem.value}` : `₺${props.dataItem.value}`}
            </td>
          )}
        />
        <GridColumn
          field="usageCount"
          title="Kullanım"
          width="100px"
          cell={(props) => (
            <td>
              {props.dataItem.usageCount}/{props.dataItem.usageLimit || '∞'}
            </td>
          )}
        />
        <GridColumn
          field="active"
          title="Durum"
          width="100px"
          cell={(props) => (
            <td>
              <span className={`k-badge k-badge-solid ${props.dataItem.active ? 'k-badge-success' : 'k-badge-error'}`}>
                {props.dataItem.active ? 'Aktif' : 'Pasif'}
              </span>
            </td>
          )}
        />
      </Grid>
    </div>
  );
};

export default Coupons;
