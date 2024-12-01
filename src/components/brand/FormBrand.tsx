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
import { FormActions } from '@/components/ui/FormActions';
import { BrandsFormDialogProps } from '@/types/brand';
import {
  createBrandSchema,
  CreateFormData,
  updateBrandSchema,
  UpdateFormData,
} from '@/schema/brand';
import { FormFields } from '@/components/brand/FormFields';

const DEFAULT_CREATE_VALUES = { brandName: '' };

export const FormBrand = ({
  open,
  onClose,
  onSubmit,
  brand,
  mode,
  isLoading,
}: BrandsFormDialogProps) => {
  const form = useForm<CreateFormData | UpdateFormData>({
    resolver: zodResolver(
      mode === 'add' ? createBrandSchema : updateBrandSchema
    ),
    defaultValues:
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : {
            brandName: brand?.brandName,
          },
  });
  useEffect(() => {
    const values =
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : brand
        ? { brandName: brand.brandName }
        : { brandName: '' };

    form.reset(values);
  }, [brand, mode, form]);
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
            {mode === 'add' ? 'Add New Brand' : 'Edit Brand'}
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
