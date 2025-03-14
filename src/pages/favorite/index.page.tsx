export function Page() {
  return (
    <>
      <h1>즐겨찾기 페이지</h1>
    </>
  );
}

Page.getDocumentProps = () => {
  return {
    title: "원바원 | 즐겨찾기",
    description: "즐겨찾기한 유치원 목록",
  };
};
