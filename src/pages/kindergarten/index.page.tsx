export function Page() {
  return (
    <>
      <h1>유치원 찾기 페이지</h1>
    </>
  );
}

Page.getDocumentProps = () => {
  return {
    title: "원바원 | 기관 찾기",
    description: "지도와 검색을 통해 기관 찾기",
  };
};
