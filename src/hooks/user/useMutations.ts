import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user.service';
import { UpdateFormData } from '@/schema/user';
import { useToast } from '@/hooks/use-toast';

export const useUserMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: UserService.createUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Success',
        description: `User "${newUser.username}" has been created`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create user. Please try again.',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFormData }) =>
      UserService.updateUser(id, data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Success',
        description: `User "${updatedUser.username}" has been updated`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update user. Please try again.',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => UserService.deleteUser(id),
    onSuccess: (deletedUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Success',
        description: `User "${deletedUser.username}" has been deleted`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete user. Please try again.',
      });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
