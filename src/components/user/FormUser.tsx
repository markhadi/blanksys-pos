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
import { UsersFormDialogProps } from '@/types/user';
import { FormActions } from '@/components/ui/FormActions';
import {
  createUserSchema,
  CreateFormData,
  updateUserSchema,
  UpdateFormData,
} from '@/schema/user';
import { FormFields } from '@/components/user/FormFields';

const DEFAULT_CREATE_VALUES = {
  username: '',
  fullName: '',
  role: 'Administrator' as const,
  password: '',
  confirmPassword: '',
};

export const FormUser = ({
  open,
  onClose,
  onSubmit,
  user,
  mode,
  isLoading,
}: UsersFormDialogProps) => {
  const form = useForm<CreateFormData | UpdateFormData>({
    resolver: zodResolver(mode === 'add' ? createUserSchema : updateUserSchema),
    defaultValues:
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : {
            username: user?.username,
            fullName: user?.fullName,
            role: user?.role,
            password: user?.password,
            confirmPassword: user?.password,
          },
  });

  useEffect(() => {
    const values =
      mode === 'add'
        ? DEFAULT_CREATE_VALUES
        : user
        ? {
            username: user.username,
            fullName: user.fullName,
            role: user.role,
            password: user.password,
            confirmPassword: user.password,
          }
        : DEFAULT_CREATE_VALUES;

    form.reset(values);
  }, [user, mode, form]);

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
            {mode === 'add' ? 'Add New User' : 'Edit User'}
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
