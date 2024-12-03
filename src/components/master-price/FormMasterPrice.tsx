import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generatePriceId } from '@/utils/generateId';
import {
  CreateMasterPriceFormData,
  createMasterPriceSchema,
  UpdateMasterPriceFormData,
  updateMasterPriceSchema,
} from '@/schema/master-price';
import { MasterPriceFormProps } from '@/types/master-price';
import { FormFields } from '@/components/master-price/FormFields';
import { FormActions } from '@/components/ui/FormActions';
import { useEffect } from 'react';

const DEFAULT_VALUES = {
  id: '',
  id_item: '',
  id_unit: 0,
  category: '',
  brand: '',
  capital_price: 0,
  selling_price: 0,
};

export const FormMasterPrice = ({
  open,
  onClose,
  onSubmit,
  masterPrice,
  mode,
  isLoading,
}: MasterPriceFormProps) => {
  const form = useForm<CreateMasterPriceFormData>({
    resolver: zodResolver(
      mode === 'add' ? createMasterPriceSchema : updateMasterPriceSchema
    ),
    defaultValues:
      mode === 'add'
        ? DEFAULT_VALUES
        : {
            id: String(masterPrice?.id || ''),
            id_item: String(masterPrice?.id_item || ''),
            id_unit: Number(masterPrice?.id_unit || 0),
            category: String(masterPrice?.category || ''),
            brand: String(masterPrice?.brand || ''),
            capital_price: Number(masterPrice?.capital_price || 0),
            selling_price: Number(masterPrice?.selling_price || 0),
          },
  });

  useEffect(() => {
    const values =
      mode === 'add'
        ? DEFAULT_VALUES
        : {
            id: String(masterPrice?.id || ''),
            id_item: String(masterPrice?.id_item || ''),
            id_unit: Number(masterPrice?.id_unit || 0),
            category: String(masterPrice?.category || ''),
            brand: String(masterPrice?.brand || ''),
            capital_price: Number(masterPrice?.capital_price || 0),
            selling_price: Number(masterPrice?.selling_price || 0),
          };

    form.reset(values);
  }, [masterPrice, mode, form]);

  const handleGenerateId = () => {
    form.setValue('id', generatePriceId());
  };

  const handleSubmit = (
    data: CreateMasterPriceFormData | UpdateMasterPriceFormData
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
            {mode === 'add'
              ? 'Add New Price'
              : mode === 'edit'
              ? 'Edit Price'
              : 'Price Detail'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormFields
              form={form}
              onGenerateId={handleGenerateId}
              mode={mode}
            />

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
