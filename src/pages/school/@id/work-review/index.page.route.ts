export default (pageContext: any) => {
  // 경로에서 ID 추출
  const { urlOriginal } = pageContext;
  const matches = urlOriginal.match(/^\/school\/([^\/]+)\/work-review/);

  if (matches) {
    return {
      match: true,
      routeParams: {
        id: matches[1],
      },
    };
  }

  return { match: false };
};
