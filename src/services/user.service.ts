import { UserSearchParams, UserType } from '@/types/user';
import userData from '@/data/user.json';
import { CreateFormData, UpdateFormData } from '@/schema/user';

export const UserService = {
  getRoles: async (search?: string): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let roles = Array.from(new Set(userData.map((user) => user.role))).sort();

    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      roles = roles.filter((role) =>
        role.toLowerCase().includes(normalizedSearch)
      );
    }

    return roles;
  },
  fetchUsers: async ({
    search,
    roles,
    sorting,
  }: UserSearchParams = {}): Promise<UserType[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let users = [...userData] as UserType[];

    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      users = users.filter(
        (user) =>
          user.username.toLowerCase().includes(normalizedSearch) ||
          user.fullName.toLowerCase().includes(normalizedSearch)
      );
    }

    if (roles?.length) {
      users = users.filter((user) => roles.includes(user.role));
    }

    if (sorting) {
      const { field, order } = sorting;
      users.sort((a, b) => {
        const aValue = String(a[field as keyof UserType]);
        const bValue = String(b[field as keyof UserType]);
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return users;
  },

  createUser: async (data: CreateFormData): Promise<UserType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: UserType = {
      id: Math.max(...userData.map((u) => u.id)) + 1,
      ...data,
    };

    userData.push(newUser);

    return newUser;
  },

  updateUser: async (id: number, data: UpdateFormData): Promise<UserType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = userData.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...userData[index],
      ...data,
    };

    userData[index] = updatedUser;
    return updatedUser;
  },

  deleteUser: async (id: number): Promise<UserType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = userData.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    const deletedUser = userData[index] as UserType;
    userData.splice(index, 1);
    return deletedUser;
  },
};
