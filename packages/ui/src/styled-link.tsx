interface StyledLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

export default function StyledLink({ href, label, children }: StyledLinkProps) {
  return (
    <a
      href={href}
      className="relative flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
    >
      {children}
      <span>{label}</span>
    </a>
  );
}
