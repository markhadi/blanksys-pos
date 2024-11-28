import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/user.service';
import { UserSearchParams } from '@/types/user';

export const useUsers = (params: UserSearchParams = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => UserService.fetchUsers(params),
  });
};
