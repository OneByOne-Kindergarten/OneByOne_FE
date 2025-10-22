export const formatDate = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);

  // 시간 차이 계산 (밀리초 -> 초)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // 음수인 경우 (미래 시간) 0으로 처리
  if (diffInSeconds < 0) {
    return "방금 전";
  }

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  } else {
    return date.toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  }
};

export const formatYearMonth = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}.${month}`;
};
