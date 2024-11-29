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
import { SupplierFormDialogProps } from '@/types/supplier';
import { FormActions } from '@/components/ui/FormActions';
import {
  createSupplierSchema,
  CreateFormData,
  updateSupplierSchema,
  UpdateFormData,
} from '@/schema/supplier';
import { FormFields } from '@/components/supplier/FormFields';

const DEFAULT_CREATE_VALUES = { supplierName: '', contact: '', address: '' };

export const FormSupplier = ({
  open,
  onClose,
  onSubmit,
  supplier,
  mode,
  isLoading,
}: SupplierFormDialogProps) => {
  const form = useForm<CreateFormData | UpdateFormData>({
    resolver: zodResolver(
      mode === 'add' ? createSupplierSchema : updateSupplierSchema
    ),
    defaultValues:
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : {
            supplierName: supplier?.supplierName,
            contact: supplier?.contact,
            address: supplier?.address,
          },
  });

  useEffect(() => {
    const values =
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : supplier
        ? {
            supplierName: supplier.supplierName,
            contact: supplier.contact,
            address: supplier.address,
          }
        : DEFAULT_CREATE_VALUES;

    form.reset(values);
  }, [supplier, mode, form]);

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
            {mode === 'add' ? 'Add New Supplier' : 'Edit Supplier'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
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
