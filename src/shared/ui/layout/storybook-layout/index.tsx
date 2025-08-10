import React from "react";

interface SectionProps {
  children: React.ReactNode;
  title: string;
  direction?: "row" | "column";
}

interface GroupProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
}

interface SpecTableProps {
  title: string;
  headers: string[];
  data: (string | React.ReactNode)[][];
  codeColumns?: number[]; // code 태그로 감쌀 컬럼 인덱스들
}

interface SpecCardProps {
  title: string;
  children: React.ReactNode;
}

interface ColorSwatchProps {
  color: string;
  label: string;
}

interface GuidelineSectionProps {
  title: string;
  items: (string | { label: string; description: string })[];
}

interface GuidelineGridProps {
  sections: {
    title: string;
    items: (string | { label: string; description: string })[];
  }[];
  columns?: 1 | 2 | 3;
}

interface VariantSection {
  title: string;
  prop: string;
  values: string[];
  direction?: "row" | "column";
}

interface VariantGridProps {
  sections: VariantSection[];
  component: React.ComponentType<Record<string, unknown>>;
  commonProps?: Record<string, unknown>;
  children?: string | ((value: string) => React.ReactNode);
}

// 제목이 있는 섹션 (개선된 버전)
export const Section = ({
  children,
  title,
  direction = "row",
}: SectionProps) => (
  <section className="space-y-4">
    <h2 className="border-t-2 border-primary-normal01 px-1 pt-2 font-semibold text-primary-dark02">
      {title}
    </h2>
    <div className={`flex gap-3 ${direction === "column" ? "flex-col" : ""}`}>
      {children}
    </div>
  </section>
);

// 제목 없는 그룹
export const Group = ({ children, direction = "row", gap = 3 }: GroupProps) => (
  <div
    className={`flex gap-${gap} ${direction === "column" ? "flex-col" : ""}`}
  >
    {children}
  </div>
);

// 개선된 스펙 테이블 컴포넌트
export const SpecTable = ({
  title,
  headers,
  data,
  codeColumns = [],
}: SpecTableProps) => (
  <div className="overflow-hidden rounded-lg border">
    <div className="bg-gray-50 p-3">
      <h3 className="font-semibold">{title}</h3>
    </div>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-25">
          {headers.map((header, index) => (
            <th key={index} className="border-b p-3 text-left text-sm">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border-b p-3">
                {codeColumns.includes(cellIndex) ? <code>{cell}</code> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// 스펙 카드 컴포넌트
export const SpecCard = ({ title, children }: SpecCardProps) => (
  <div className="rounded-lg border p-4">
    <h3 className="mb-3 font-semibold">{title}</h3>
    {children}
  </div>
);

// 색상 칩 컴포넌트
export const ColorSwatch = ({ color, label }: ColorSwatchProps) => (
  <div className="flex items-center gap-2">
    <div className={`h-4 w-4 rounded ${color}`}></div>
    <code>{label}</code>
  </div>
);

// 가이드라인 섹션 컴포넌트
export const GuidelineSection = ({ title, items }: GuidelineSectionProps) => (
  <div>
    <h4 className="mb-2 text-sm font-medium text-gray-700">{title}</h4>
    <ul className="space-y-1 text-sm text-gray-600">
      {items.map((item, index) => (
        <li key={index}>
          {typeof item === "string" ? (
            item
          ) : (
            <>
              <strong>{item.label}:</strong> {item.description}
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
);

// 가이드라인 그리드 컨테이너
export const GuidelineGrid = ({
  sections,
  columns = 3,
}: GuidelineGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
  };

  return (
    <div className={`grid gap-4 ${gridCols[columns]}`}>
      {sections.map((section, index) => (
        <GuidelineSection
          key={index}
          title={section.title}
          items={section.items}
        />
      ))}
    </div>
  );
};

// 컴포넌트 갤러리 그리드 컨테이너
export const VariantGrid = ({
  sections,
  component: Component,
  commonProps = {},
  children,
}: VariantGridProps) => (
  <main className="flex flex-col gap-6">
    {sections.map((section, index) => (
      <Section key={index} title={section.title} direction={section.direction}>
        {section.values.map((value) => {
          const props = {
            ...commonProps,
            [section.prop]: value,
          };

          return (
            <Component key={value} {...props}>
              {typeof children === "function"
                ? children(value)
                : children || value}
            </Component>
          );
        })}
      </Section>
    ))}
  </main>
);

// 스펙 그리드 컨테이너
export const SpecGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">{children}</div>
);
