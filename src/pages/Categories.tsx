import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCategories, saveCategory, deleteCategory } from '../services/category/categoryService';
import { Grid, GridColumn, GridToolbar, GridCellProps } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { LottieHandler, ConfirmDialog } from '../components/Feedback';
import FormTextBox from '../components/Form/Input/FormTextBox';
import FormTextArea from '../components/Form/Input/FormTextArea';
import { ICategory } from '../interface/product';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.category);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category);
    setShowEditDialog(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setShowEditDialog(true);
  };

  const handleSubmit = (dataItem: any) => {
    const categoryData: Partial<ICategory> = {
      id: selectedCategory?.id,
      name: dataItem.name,
      description: dataItem.description,
      displayOrder: Number(dataItem.displayOrder),
      active: dataItem.active ?? true
    };

    dispatch(saveCategory(categoryData)).then(() => {
      setShowEditDialog(false);
      dispatch(getCategories());
    });
  };

  const handleDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete)).then(() => {
        setShowDeleteDialog(false);
        setCategoryToDelete(null);
        dispatch(getCategories());
      });
    }
  };

  const ActionsCell = (props: GridCellProps) => {
    const category = props.dataItem as ICategory;

    return (
      <td>
        <div className="k-d-flex k-gap-2">
          <Button size="small" themeColor="primary" onClick={() => handleEdit(category)}>
            Düzenle
          </Button>
          <Button
            size="small"
            themeColor="error"
            onClick={() => {
              setCategoryToDelete(category.id);
              setShowDeleteDialog(true);
            }}
          >
            Sil
          </Button>
        </div>
      </td>
    );
  };

  if (loading === 'pending') {
    return <LottieHandler type="loading" message="Kategoriler yükleniyor..." />;
  }

  return (
    <div>
      <div className="k-d-flex k-justify-content-between k-align-items-center k-mb-4">
        <h2 className="k-m-0">Kategori Yönetimi</h2>
        <Button themeColor="primary" onClick={handleAdd}>
          Yeni Kategori Ekle
        </Button>
      </div>

      <Grid data={categories}>
        <GridColumn field="name" title="Kategori Adı" />
        <GridColumn field="description" title="Açıklama" />
        <GridColumn field="displayOrder" title="Sıra" width="100px" />
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
          title={selectedCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
          onClose={() => setShowEditDialog(false)}
          width={500}
        >
          <Form
            initialValues={{
              name: selectedCategory?.name || '',
              description: selectedCategory?.description || '',
              displayOrder: selectedCategory?.displayOrder || categories.length + 1,
              active: selectedCategory?.active ?? true
            }}
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
              <FormElement>
                <div className="k-p-4">
                  <Field name="name" component={FormTextBox} label="Kategori Adı" />
                  <Field name="description" component={FormTextArea} label="Açıklama" />
                  <Field name="displayOrder" component={FormTextBox} label="Sıra" type="number" />
                </div>

                <DialogActionsBar>
                  <Button onClick={() => setShowEditDialog(false)}>İptal</Button>
                  <Button themeColor="primary" type="submit" disabled={!formRenderProps.allowSubmit}>
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
          title="Kategori Sil"
          message="Bu kategoriyi silmek istediğinizden emin misiniz?"
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteDialog(false);
            setCategoryToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Categories;
