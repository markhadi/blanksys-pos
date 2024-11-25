export const TableCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white p-3 rounded-[12px] shadow-md grid grid-cols-1 mt-5 h-[calc(100dvh-232px)] md:h-[calc(100dvh-176px)]">
      {children}
    </div>
  );
};
