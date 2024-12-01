import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { CategoriesFormDialogProps } from '@/types/category';
import { FormActions } from '@/components/ui/FormActions';
import {
  createCategorySchema,
  CreateFormData,
  updateCategorySchema,
  UpdateFormData,
} from '@/schema/category';
import { FormFields } from './FormFields';

const DEFAULT_CREATE_VALUES = { categoryName: '' };

export const FormCategory = ({
  open,
  onClose,
  onSubmit,
  category,
  mode,
  isLoading,
}: CategoriesFormDialogProps) => {
  const form = useForm<CreateFormData | UpdateFormData>({
    resolver: zodResolver(
      mode === 'add' ? createCategorySchema : updateCategorySchema
    ),
    defaultValues:
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : {
            categoryName: category?.categoryName,
          },
  });

  useEffect(() => {
    const values =
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : category
        ? { categoryName: category.categoryName }
        : { categoryName: '' };

    form.reset(values);
  }, [category, mode, form]);

  const handleSubmit = (data: CreateFormData | UpdateFormData) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="gap-10 w-full max-w-[878px] lg:!rounded-[15px]">
        <DialogHeader>
          <DialogTitle className="font-bold font-inter text-black text-[20px] leading-[1.5em]">
            {mode === 'add' ? 'Add New Category' : 'Edit Category'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(handleSubmit)(e);
            }}
            className="space-y-10"
          >
            <FormFields form={form} />

            <FormActions
              mode={mode}
              isLoading={isLoading}
              onCancel={handleClose}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
