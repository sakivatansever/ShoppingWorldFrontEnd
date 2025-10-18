import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getOrders, updateOrderStatus } from '../services/order/orderService';
import {
  Grid,
  GridColumn,
  GridCellProps,
  GridToolbar
} from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { LottieHandler } from '../components/Feedback';
import { OrderStatus, OrderStatusLabels, IOrder } from '../interface/order';

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders, total, page, pageSize, loading } = useAppSelector((state) => state.order);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = (currentPage = 1) => {
    dispatch(getOrders({
      page: currentPage,
      pageSize: 10,
      status: statusFilter,
      searchTerm
    }));
  };

  const handleStatusChange = (order: IOrder, newStatus: OrderStatus) => {
    dispatch(updateOrderStatus({
      orderId: order.id,
      status: newStatus
    }));
  };

  const statusOptions = [
    { text: 'Tümü', value: undefined },
    ...Object.entries(OrderStatusLabels).map(([value, text]) => ({
      text,
      value: Number(value)
    }))
  ];

  const StatusCell = (props: GridCellProps) => {
    const order = props.dataItem as IOrder;
    const currentStatus = order.status;

    const getNextStatus = (status: OrderStatus): OrderStatus | null => {
      const statusFlow = [
        OrderStatus.New,
        OrderStatus.Confirmed,
        OrderStatus.Preparing,
        OrderStatus.Ready,
        OrderStatus.OnDelivery,
        OrderStatus.Delivered
      ];
      const currentIndex = statusFlow.indexOf(status);
      if (currentIndex >= 0 && currentIndex < statusFlow.length - 1) {
        return statusFlow[currentIndex + 1];
      }
      return null;
    };

    const nextStatus = getNextStatus(currentStatus);

    return (
      <td>
        <div className="k-d-flex k-gap-2 k-align-items-center">
          <span className="k-badge k-badge-solid k-badge-md k-badge-info">
            {OrderStatusLabels[currentStatus]}
          </span>
          {nextStatus !== null && (
            <Button
              size="small"
              themeColor="success"
              onClick={() => handleStatusChange(order, nextStatus)}
            >
              İlerlet
            </Button>
          )}
        </div>
      </td>
    );
  };

  const ActionsCell = (props: GridCellProps) => {
    const order = props.dataItem as IOrder;

    return (
      <td>
        <Button
          size="small"
          themeColor="primary"
          onClick={() => {
            setSelectedOrder(order);
            setShowDetailDialog(true);
          }}
        >
          Detay
        </Button>
      </td>
    );
  };

  if (loading === 'pending' && orders.length === 0) {
    return <LottieHandler type="loading" message="Siparişler yükleniyor..." />;
  }

  return (
    <div>
      <div className="k-d-flex k-justify-content-between k-align-items-center k-mb-4">
        <h2 className="k-m-0">Sipariş Yönetimi</h2>
      </div>

      <Grid
        data={orders}
        total={total}
        skip={(page - 1) * pageSize}
        take={pageSize}
        pageable
        onPageChange={(e) => loadOrders(e.page.skip / e.page.take + 1)}
      >
        <GridToolbar>
          <div className="k-d-flex k-gap-2 k-align-items-center k-flex-wrap">
            <Input
              placeholder="Sipariş Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.value || '')}
              style={{ width: '250px' }}
            />
            <DropDownList
              data={statusOptions}
              textField="text"
              dataItemKey="value"
              value={statusOptions.find(o => o.value === statusFilter)}
              onChange={(e) => setStatusFilter(e.value.value)}
              style={{ width: '200px' }}
            />
            <Button themeColor="primary" onClick={() => loadOrders()}>
              Filtrele
            </Button>
          </div>
        </GridToolbar>

        <GridColumn field="code" title="Sipariş No" width="180px" />
        <GridColumn
          field="customer.name"
          title="Müşteri"
          width="200px"
        />
        <GridColumn
          field="customer.phone"
          title="Telefon"
          width="150px"
        />
        <GridColumn
          field="payment.finalTotal"
          title="Toplam"
          width="120px"
          cell={(props) => (
            <td>₺{props.dataItem.payment.finalTotal.toFixed(2)}</td>
          )}
        />
        <GridColumn
          field="createdAt"
          title="Sipariş Tarihi"
          width="180px"
          cell={(props) => (
            <td>{new Date(props.dataItem.createdAt).toLocaleString('tr-TR')}</td>
          )}
        />
        <GridColumn
          field="status"
          title="Durum"
          width="250px"
          cell={StatusCell}
        />
        <GridColumn
          title="İşlemler"
          width="120px"
          cell={ActionsCell}
        />
      </Grid>

      {showDetailDialog && selectedOrder && (
        <Dialog
          title={`Sipariş Detayı - ${selectedOrder.code}`}
          onClose={() => setShowDetailDialog(false)}
          width={800}
        >
          <div className="k-p-4">
            <div className="k-mb-4">
              <h4>Müşteri Bilgileri</h4>
              <p><strong>Ad:</strong> {selectedOrder.customer.name}</p>
              <p><strong>Telefon:</strong> {selectedOrder.customer.phone}</p>
              <p><strong>Adres:</strong> {selectedOrder.address.fullAddress}</p>
            </div>

            <div className="k-mb-4">
              <h4>Sipariş Ürünleri</h4>
              <table className="k-table k-table-md">
                <thead>
                  <tr>
                    <th>Ürün</th>
                    <th>Adet</th>
                    <th>Birim Fiyat</th>
                    <th>Toplam</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.productName}
                        {item.variantName && ` (${item.variantName})`}
                        {item.options.length > 0 && (
                          <div className="k-text-sm k-text-muted">
                            {item.options.map(o => o.optionName).join(', ')}
                          </div>
                        )}
                      </td>
                      <td>{item.quantity}</td>
                      <td>₺{item.unitPrice.toFixed(2)}</td>
                      <td>₺{item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="k-mb-4">
              <h4>Ödeme Bilgileri</h4>
              <p><strong>Ara Toplam:</strong> ₺{selectedOrder.payment.subtotal.toFixed(2)}</p>
              <p><strong>Teslimat Ücreti:</strong> ₺{selectedOrder.payment.deliveryFee.toFixed(2)}</p>
              {selectedOrder.payment.discount > 0 && (
                <p><strong>İndirim:</strong> -₺{selectedOrder.payment.discount.toFixed(2)}</p>
              )}
              <p><strong>KDV:</strong> ₺{selectedOrder.payment.taxAmount.toFixed(2)}</p>
              <p className="k-font-weight-bold"><strong>Genel Toplam:</strong> ₺{selectedOrder.payment.finalTotal.toFixed(2)}</p>
            </div>

            <div>
              <h4>Sipariş Zaman Çizelgesi</h4>
              {selectedOrder.timeline.map((timeline) => (
                <div key={timeline.id} className="k-mb-2">
                  <span className="k-badge k-badge-solid k-badge-sm k-badge-info k-mr-2">
                    {OrderStatusLabels[timeline.status]}
                  </span>
                  <span className="k-text-muted">
                    {new Date(timeline.createdAt).toLocaleString('tr-TR')}
                  </span>
                  {timeline.note && <p className="k-ml-4">{timeline.note}</p>}
                </div>
              ))}
            </div>
          </div>

          <DialogActionsBar>
            <Button onClick={() => setShowDetailDialog(false)}>Kapat</Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default Orders;
