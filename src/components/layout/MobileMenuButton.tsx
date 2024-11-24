interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton = ({
  isOpen,
  onClick,
}: MobileMenuButtonProps) => (
  <button
    onClick={onClick}
    className="flex flex-col w-5 h-5 justify-between items-center md:hidden"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
  >
    {[1, 2, 3].map((index) => (
      <span
        key={index}
        className={`
          h-0.5 w-5 bg-white origin-left 
          transition-all duration-300 
          ${isOpen && index === 1 ? 'rotate-45 w-[25px]' : ''}
          ${isOpen && index === 2 ? 'opacity-0' : ''}
          ${isOpen && index === 3 ? '-rotate-45 w-[25px]' : ''}
        `}
      />
    ))}
  </button>
);
