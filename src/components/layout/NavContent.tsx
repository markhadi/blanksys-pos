import { MenuItem } from '@/components/layout/MenuItem';
import { NavContentProps } from '@/types/layout';
import { MENU_SECTIONS } from '@/constants/menu';

export const NavContent = ({ location, onItemClick }: NavContentProps) => (
  <nav className="flex flex-col p-5 gap-3">
    {MENU_SECTIONS.map((section, sectionIndex) => (
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
        {section.items.map((item, itemIndex) => (
          <MenuItem
            key={`${sectionIndex}-${itemIndex}`}
            {...item}
            isActive={location.pathname === item.path}
            onClick={onItemClick}
          />
        ))}
      </div>
    ))}
  </nav>
);
