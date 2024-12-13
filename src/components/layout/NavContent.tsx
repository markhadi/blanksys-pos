import { MenuItem } from '@/components/layout/MenuItem';
import { NavContentProps } from '@/types/layout';
import { MENU_SECTIONS } from '@/constants/menu';
import { useAuth } from '@/hooks/useAuth';

export const NavContent = ({ location, onItemClick }: NavContentProps) => {
  const { hasRole } = useAuth();

  const filteredSections = MENU_SECTIONS.filter((section) =>
    hasRole(section.roles)
  );

  const isActiveRoute = (itemPath: string, currentPath: string) => {
    if (
      itemPath === '/purchase-order' &&
      currentPath.startsWith('/purchase-order')
    ) {
      return true;
    }

    if (itemPath === '/receive' && currentPath.startsWith('/receive')) {
      return true;
    }

    if (itemPath === currentPath) return true;

    if (itemPath !== '/' && currentPath.startsWith(itemPath)) {
      const nextPathSegment = currentPath
        .slice(itemPath.length + 1)
        .split('/')[0];
      return !nextPathSegment;
    }

    return false;
  };

  return (
    <nav className="flex flex-col p-5 gap-3">
      {filteredSections.map((section, sectionIndex) => {
        const filteredItems = section.items.filter((item) =>
          hasRole(item.roles)
        );

        if (filteredItems.length === 0) return null;

        return (
          <div key={sectionIndex} className="space-y-3">
            {section.title && (
              <>
                {sectionIndex !== 0 && (
                  <hr className="border-t border-[#CBD5E1] w-full" />
                )}
                <span className="text-[16px] font-inter font-bold leading-[28px] text-[#94A3B8]">
                  {section.title}
                </span>
              </>
            )}
            {filteredItems.map((item, itemIndex) => (
              <MenuItem
                key={`${sectionIndex}-${itemIndex}`}
                {...item}
                isActive={isActiveRoute(item.path, location.pathname)}
                onClick={onItemClick}
              />
            ))}
          </div>
        );
      })}
    </nav>
  );
};
