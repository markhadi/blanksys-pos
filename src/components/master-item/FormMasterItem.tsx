import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateItemId } from '@/utils/generateId';
import {
  CreateMasterItemFormData,
  createMasterItemSchema,
  UpdateMasterItemFormData,
  updateMasterItemSchema,
} from '@/schema/master-item';
import { MasterItemFormProps } from '@/types/master-item';
import { FormFields } from '@/components/master-item/FormFields';
import { FormActions } from '@/components/ui/FormActions';
import { useEffect } from 'react';

const DEFAULT_CREATE_VALUES = {
  id: '',
  itemName: '',
  category: '',
  brand: '',
  capitalPrice: 0,
  stockUnit: '',
};

export const FormMasterItem = ({
  open,
  onClose,
  onSubmit,
  masterItem,
  mode,
  isLoading,
}: MasterItemFormProps) => {
  const form = useForm<CreateMasterItemFormData>({
    resolver: zodResolver(
      mode === 'add' ? createMasterItemSchema : updateMasterItemSchema
    ),
    defaultValues:
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : {
            id: masterItem?.id,
            itemName: masterItem?.itemName,
            category: masterItem?.category,
            brand: masterItem?.brand,
            capitalPrice: masterItem?.capitalPrice,
            stockUnit: masterItem?.stockUnit,
            image: masterItem?.image,
          },
  });

  useEffect(() => {
    const values =
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : masterItem
        ? {
            id: masterItem.id,
            itemName: masterItem.itemName,
            category: masterItem.category,
            brand: masterItem.brand,
            capitalPrice: masterItem.capitalPrice,
            stockUnit: masterItem.stockUnit,
            image: masterItem.image,
          }
        : DEFAULT_CREATE_VALUES;

    form.reset(values);
  }, [masterItem, mode, form]);

  const handleGenerateId = () => {
    form.setValue('id', generateItemId());
  };

  const handleSubmit = (
    data: CreateMasterItemFormData | UpdateMasterItemFormData
  ) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="gap-10 w-full max-w-[878px] lg:!rounded-[15px]">
        <DialogHeader>
          <DialogTitle className="font-bold font-inter text-black text-[20px] leading-[1.5em]">
            {mode === 'add' ? 'Add New Item' : 'Edit Item'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormFields form={form} onGenerateId={handleGenerateId} />

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
