interface LoginHeaderProps {
  className?: string;
}

export const LoginHeader = ({ className = '' }: LoginHeaderProps) => (
  <div className={`text-[#1E293B] space-y-7 w-full ${className}`}>
    <div className="h-8">
      <h1 className="text-[42px] leading-[1.2em]">Sign in</h1>
    </div>
    <p className="leading-[1.2em]">
      Welcome to Blanksys point of sales system. Please sign in to use system
    </p>
  </div>
);
