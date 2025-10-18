import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '@progress/kendo-react-layout';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend
} from '@progress/kendo-react-charts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getDashboardStats,
  getSalesData,
  getTopProducts,
  getOrderStatusSummary
} from '../services/dashboard/dashboardService';
import { LottieHandler } from '../components/Feedback';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { stats, salesData, topProducts, orderStatusSummary, loading } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getSalesData({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date()
    }));
    dispatch(getTopProducts(5));
    dispatch(getOrderStatusSummary());
  }, [dispatch]);

  if (loading === 'pending') {
    return <LottieHandler type="loading" message="Yükleniyor..." />;
  }

  return (
    <div>
      <div className="k-d-flex k-justify-content-between k-align-items-center k-mb-4">
        <h2 className="k-m-0">Dashboard</h2>
      </div>

      <div className="k-d-grid k-gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <Card>
          <CardHeader className="k-bg-primary k-text-white">
            <CardTitle>Bugünkü Siparişler</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="k-text-center">
              <h1 className="k-display-1 k-m-0">{stats?.todayOrders || 0}</h1>
              <p className="k-text-muted">Toplam Sipariş</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="k-bg-success k-text-white">
            <CardTitle>Bugünkü Gelir</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="k-text-center">
              <h1 className="k-display-1 k-m-0">₺{stats?.todayRevenue.toFixed(2) || '0.00'}</h1>
              <p className="k-text-muted">Toplam Gelir</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="k-bg-warning k-text-white">
            <CardTitle>Aktif Siparişler</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="k-text-center">
              <h1 className="k-display-1 k-m-0">{stats?.activeOrders || 0}</h1>
              <p className="k-text-muted">Hazırlanıyor/Kurye'de</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="k-bg-info k-text-white">
            <CardTitle>Ortalama Sipariş Değeri</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="k-text-center">
              <h1 className="k-display-1 k-m-0">₺{stats?.averageOrderValue.toFixed(2) || '0.00'}</h1>
              <p className="k-text-muted">Ortalama</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="k-d-grid k-gap-4 k-mt-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))' }}>
        <Card>
          <CardHeader>
            <CardTitle>Son 7 Günlük Satışlar</CardTitle>
          </CardHeader>
          <CardBody>
            {salesData.length > 0 && (
              <Chart>
                <ChartTitle text="Günlük Satış Performansı" />
                <ChartLegend position="bottom" orientation="horizontal" />
                <ChartCategoryAxis>
                  <ChartCategoryAxisItem categories={salesData.map(d => d.date)} />
                </ChartCategoryAxis>
                <ChartSeries>
                  <ChartSeriesItem
                    type="line"
                    data={salesData.map(d => d.revenue)}
                    name="Gelir (₺)"
                  />
                  <ChartSeriesItem
                    type="line"
                    data={salesData.map(d => d.orderCount)}
                    name="Sipariş Sayısı"
                    axis="orders"
                  />
                </ChartSeries>
              </Chart>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sipariş Durumları</CardTitle>
          </CardHeader>
          <CardBody>
            {orderStatusSummary.length > 0 && (
              <Chart>
                <ChartTitle text="Sipariş Durum Dağılımı" />
                <ChartLegend position="bottom" orientation="horizontal" />
                <ChartSeries>
                  <ChartSeriesItem
                    type="pie"
                    data={orderStatusSummary.map(s => ({
                      category: s.statusName,
                      value: s.count
                    }))}
                    field="value"
                    categoryField="category"
                  />
                </ChartSeries>
              </Chart>
            )}
          </CardBody>
        </Card>
      </div>

      <div className="k-mt-4">
        <Card>
          <CardHeader>
            <CardTitle>En Çok Satan Ürünler</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="k-table">
              <table className="k-table-md">
                <thead>
                  <tr>
                    <th>Ürün Adı</th>
                    <th>Kategori</th>
                    <th className="k-text-right">Adet</th>
                    <th className="k-text-right">Gelir</th>
                    <th className="k-text-right">Sipariş Sayısı</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.productName}</td>
                      <td>{product.categoryName}</td>
                      <td className="k-text-right">{product.totalQuantity}</td>
                      <td className="k-text-right">₺{product.totalRevenue.toFixed(2)}</td>
                      <td className="k-text-right">{product.orderCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
