import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getProducts, saveProduct, deleteProduct } from '../services/product/productService';
import { getCategories } from '../services/category/categoryService';
import {
  Grid,
  GridColumn,
  GridToolbar,
  GridCellProps
} from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { LottieHandler, ConfirmDialog } from '../components/Feedback';
import FormTextBox from '../components/Form/Input/FormTextBox';
import FormTextArea from '../components/Form/Input/FormTextArea';
import { IProduct } from '../interface/product';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, total, page, pageSize, loading } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(getCategories());
    loadProducts();
  }, []);

  const loadProducts = (currentPage = 1) => {
    dispatch(getProducts({
      page: currentPage,
      pageSize: 10,
      categoryId: categoryFilter,
      searchTerm
    }));
  };

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setShowEditDialog(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowEditDialog(true);
  };

  const handleSubmit = (dataItem: any) => {
    const productData: Partial<IProduct> = {
      id: selectedProduct?.id,
      name: dataItem.name,
      description: dataItem.description,
      categoryId: dataItem.categoryId,
      price: Number(dataItem.price),
      stock: Number(dataItem.stock),
      active: dataItem.active ?? true,
      images: [],
      variants: [],
      optionGroups: [],
      allergens: [],
      featured: false
    };

    dispatch(saveProduct(productData)).then(() => {
      setShowEditDialog(false);
      loadProducts();
    });
  };

  const handleDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete)).then(() => {
        setShowDeleteDialog(false);
        setProductToDelete(null);
        loadProducts();
      });
    }
  };

  const ActionsCell = (props: GridCellProps) => {
    const product = props.dataItem as IProduct;

    return (
      <td>
        <div className="k-d-flex k-gap-2">
          <Button size="small" themeColor="primary" onClick={() => handleEdit(product)}>
            Düzenle
          </Button>
          <Button
            size="small"
            themeColor="error"
            onClick={() => {
              setProductToDelete(product.id);
              setShowDeleteDialog(true);
            }}
          >
            Sil
          </Button>
        </div>
      </td>
    );
  };

  if (loading === 'pending' && products.length === 0) {
    return <LottieHandler type="loading" message="Ürünler yükleniyor..." />;
  }

  return (
    <div>
      <div className="k-d-flex k-justify-content-between k-align-items-center k-mb-4">
        <h2 className="k-m-0">Ürün Yönetimi</h2>
        <Button themeColor="primary" onClick={handleAdd}>
          Yeni Ürün Ekle
        </Button>
      </div>

      <Grid
        data={products}
        total={total}
        skip={(page - 1) * pageSize}
        take={pageSize}
        pageable
        onPageChange={(e) => loadProducts(e.page.skip / e.page.take + 1)}
      >
        <GridToolbar>
          <div className="k-d-flex k-gap-2 k-align-items-center k-flex-wrap">
            <Input
              placeholder="Ürün Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.value || '')}
              style={{ width: '250px' }}
            />
            <DropDownList
              data={[{ id: undefined, name: 'Tüm Kategoriler' }, ...categories]}
              textField="name"
              dataItemKey="id"
              value={categories.find(c => c.id === categoryFilter) || { id: undefined, name: 'Tüm Kategoriler' }}
              onChange={(e) => setCategoryFilter(e.value.id)}
              style={{ width: '200px' }}
            />
            <Button themeColor="primary" onClick={() => loadProducts()}>
              Filtrele
            </Button>
          </div>
        </GridToolbar>

        <GridColumn field="name" title="Ürün Adı" width="250px" />
        <GridColumn field="categoryName" title="Kategori" width="150px" />
        <GridColumn
          field="price"
          title="Fiyat"
          width="120px"
          cell={(props) => <td>₺{props.dataItem.price.toFixed(2)}</td>}
        />
        <GridColumn field="stock" title="Stok" width="100px" />
        <GridColumn
          field="active"
          title="Durum"
          width="120px"
          cell={(props) => (
            <td>
              <span className={`k-badge k-badge-solid k-badge-md ${props.dataItem.active ? 'k-badge-success' : 'k-badge-error'}`}>
                {props.dataItem.active ? 'Aktif' : 'Pasif'}
              </span>
            </td>
          )}
        />
        <GridColumn title="İşlemler" width="200px" cell={ActionsCell} />
      </Grid>

      {showEditDialog && (
        <Dialog
          title={selectedProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
          onClose={() => setShowEditDialog(false)}
          width={600}
        >
          <Form
            initialValues={{
              name: selectedProduct?.name || '',
              description: selectedProduct?.description || '',
              categoryId: selectedProduct?.categoryId || categories[0]?.id,
              price: selectedProduct?.price || 0,
              stock: selectedProduct?.stock || 0,
              active: selectedProduct?.active ?? true
            }}
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
              <FormElement>
                <div className="k-p-4">
                  <Field
                    name="name"
                    component={FormTextBox}
                    label="Ürün Adı"
                    placeholder="Ürün adını girin"
                  />

                  <Field
                    name="description"
                    component={FormTextArea}
                    label="Açıklama"
                    placeholder="Ürün açıklaması"
                  />

                  <Field
                    name="categoryId"
                    component={(fieldRenderProps) => (
                      <div className="k-form-field">
                        <label className="k-form-label">Kategori</label>
                        <DropDownList
                          {...fieldRenderProps}
                          data={categories}
                          textField="name"
                          dataItemKey="id"
                          value={categories.find(c => c.id === fieldRenderProps.value)}
                          onChange={(e) => fieldRenderProps.onChange({ value: e.value.id })}
                        />
                      </div>
                    )}
                  />

                  <Field
                    name="price"
                    component={FormTextBox}
                    label="Fiyat"
                    type="number"
                  />

                  <Field
                    name="stock"
                    component={FormTextBox}
                    label="Stok"
                    type="number"
                  />
                </div>

                <DialogActionsBar>
                  <Button onClick={() => setShowEditDialog(false)}>İptal</Button>
                  <Button
                    themeColor="primary"
                    type="submit"
                    disabled={!formRenderProps.allowSubmit}
                  >
                    Kaydet
                  </Button>
                </DialogActionsBar>
              </FormElement>
            )}
          />
        </Dialog>
      )}

      {showDeleteDialog && (
        <ConfirmDialog
          show={showDeleteDialog}
          title="Ürün Sil"
          message="Bu ürünü silmek istediğinizden emin misiniz?"
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteDialog(false);
            setProductToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;
