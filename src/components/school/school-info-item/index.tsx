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
        <div className="flex flex-col gap-0.5 flex-1">
          <h3 className="font-medium text-sm text-primary-normal03">{title}</h3>
          {typeof children === "string" ? (
            <p className="text-base font-semibold text-primary-dark02">
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
