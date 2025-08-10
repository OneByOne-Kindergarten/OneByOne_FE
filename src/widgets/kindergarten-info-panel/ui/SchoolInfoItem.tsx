interface SchoolInfoItemProps {
  icon: string;
  title: string;
  children?: React.ReactNode;
  altText: string;
}

export default function SchoolInfoItem({
  icon,
  title,
  children,
  altText,
}: SchoolInfoItemProps) {
  return (
    <li className="flex flex-col gap-2">
      <div className="flex gap-3">
        <div>
          <img src={icon} alt={altText} width="18" height="18" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className="text-sm font-medium text-primary-normal03">{title}</h3>
          {typeof children === "string" ? (
            <p className="line-clamp-1 text-base font-semibold text-primary-dark02">
              {children}
            </p>
          ) : (
            children
          )}
        </div>
      </div>
    </li>
  );
}
