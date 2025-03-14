export function Page({ id }: { id: string }) {
  return (
    <>
      <h1>유치원 찾기 페이지</h1>
      <p>Kindergarten ID: {id}</p>
    </>
  );
}

Page.getDocumentProps = () => {
  return {
    title: "원바원 | 유치원",
    description: "유치원에 대한 정보와 리뷰",
  };
};
