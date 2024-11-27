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
import { UnitsFormDialogProps } from '@/types/unit';
import { FormActions } from '@/components/ui/FormActions';
import {
  createUnitSchema,
  CreateFormData,
  updateUnitSchema,
  UpdateFormData,
} from '@/schema/unit';
import { FormFields } from '@/components/unit/FormFields';

const DEFAULT_CREATE_VALUES = { unitName: '', qty: 0 };

export const FormUnit = ({
  open,
  onClose,
  onSubmit,
  unit,
  mode,
  isLoading,
}: UnitsFormDialogProps) => {
  const form = useForm<CreateFormData | UpdateFormData>({
    resolver: zodResolver(mode === 'add' ? createUnitSchema : updateUnitSchema),
    defaultValues:
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : {
            unitName: unit?.unitName,
            qty: unit?.qty,
          },
  });

  useEffect(() => {
    const values =
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : unit
        ? { unitName: unit.unitName, qty: unit.qty }
        : { unitName: '', qty: 0 };

    form.reset(values);
  }, [unit, mode, form]);

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
            {mode === 'add' ? 'Add New Unit' : 'Edit Unit'}
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
