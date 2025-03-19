export default (pageContext: any) => {
  // 경로에서 ID 추출
  const { urlOriginal } = pageContext;
  const matches = urlOriginal.match(/^\/school\/([^\/]+)\/learning-review/);

  if (matches) {
    return {
      match: true,
      routeParams: {
        id: matches[1], // 경로에서 추출한 ID
      },
    };
  }

  return { match: false };
};
