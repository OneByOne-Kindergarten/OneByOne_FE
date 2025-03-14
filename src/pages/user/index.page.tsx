export function Page() {
  return (
    <div>
      <h1>마이 페이지</h1>
      <p>이 페이지는 서버에서 렌더링됩니다.</p>
    </div>
  );
}

Page.getDocumentProps = () => {
  return {
    title: "원바원 | 마이페이지",
    description: "기본 정보 설정 및 프로필 관리",
  };
};
