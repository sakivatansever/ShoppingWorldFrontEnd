import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCouriers } from '../services/courier/courierService';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { LottieHandler } from '../components/Feedback';
import { CourierStatusLabels, VehicleTypeLabels } from '../interface/courier';

const Couriers = () => {
  const dispatch = useAppDispatch();
  const { couriers, loading } = useAppSelector((state) => state.courier);

  useEffect(() => {
    dispatch(getCouriers({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  if (loading === 'pending') {
    return <LottieHandler type="loading" message="Kuryeler yükleniyor..." />;
  }

  return (
    <div>
      <div className="k-d-flex k-justify-content-between k-align-items-center k-mb-4">
        <h2 className="k-m-0">Kurye Yönetimi</h2>
        <Button themeColor="primary">Yeni Kurye Ekle</Button>
      </div>

      <Grid data={couriers} pageable>
        <GridColumn field="name" title="Ad Soyad" />
        <GridColumn field="phone" title="Telefon" width="150px" />
        <GridColumn
          field="vehicleType"
          title="Araç Tipi"
          width="120px"
          cell={(props) => <td>{VehicleTypeLabels[props.dataItem.vehicleType]}</td>}
        />
        <GridColumn field="vehiclePlate" title="Plaka" width="120px" />
        <GridColumn
          field="status"
          title="Durum"
          width="120px"
          cell={(props) => {
            const statusColors = {
              idle: 'k-badge-success',
              busy: 'k-badge-warning',
              offline: 'k-badge-error'
            };
            return (
              <td>
                <span className={`k-badge k-badge-solid ${statusColors[props.dataItem.status]}`}>
                  {CourierStatusLabels[props.dataItem.status]}
                </span>
              </td>
            );
          }}
        />
        <GridColumn field="assignedOrdersCount" title="Atanan Sipariş" width="140px" />
        <GridColumn field="totalDeliveries" title="Toplam Teslimat" width="140px" />
        <GridColumn
          field="rating"
          title="Puan"
          width="80px"
          cell={(props) => <td>{props.dataItem.rating?.toFixed(1) || '-'}</td>}
        />
      </Grid>
    </div>
  );
};

export default Couriers;
