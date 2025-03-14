export function Page() {
  return (
    <>
      <h1>커뮤니티 페이지</h1>
    </>
  );
}

Page.getDocumentProps = () => {
  return {
    title: "원바원 | 커뮤니티",
    description: "유치원 교사와 예비 교사들의 커뮤니티",
  };
};
