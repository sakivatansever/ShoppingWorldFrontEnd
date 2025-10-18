import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCustomers } from '../services/customer/customerService';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { LottieHandler } from '../components/Feedback';

const Customers = () => {
  const dispatch = useAppDispatch();
  const { customers, loading } = useAppSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomers({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  if (loading === 'pending') {
    return <LottieHandler type="loading" message="Müşteriler yükleniyor..." />;
  }

  return (
    <div>
      <div className="k-d-flex k-justify-content-between k-align-items-center k-mb-4">
        <h2 className="k-m-0">Müşteri Yönetimi</h2>
      </div>

      <Grid data={customers} pageable>
        <GridColumn field="name" title="Ad Soyad" />
        <GridColumn field="phone" title="Telefon" width="150px" />
        <GridColumn field="email" title="E-posta" />
        <GridColumn field="totalOrders" title="Sipariş Sayısı" width="140px" />
        <GridColumn
          field="totalSpent"
          title="Toplam Harcama"
          width="150px"
          cell={(props) => <td>₺{props.dataItem.totalSpent.toFixed(2)}</td>}
        />
        <GridColumn
          field="segment"
          title="Segment"
          width="120px"
          cell={(props) => (
            <td>
              {props.dataItem.segment && (
                <span className="k-badge k-badge-solid k-badge-info">
                  {props.dataItem.segment}
                </span>
              )}
            </td>
          )}
        />
      </Grid>
    </div>
  );
};

export default Customers;
