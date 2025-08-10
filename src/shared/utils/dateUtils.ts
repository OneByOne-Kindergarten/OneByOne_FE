export const formatDate = (dateString: string): string => {
  // 현재 시간을 KST로 변환
  const now = new Date();
  const date = new Date(dateString);

  // UTC를 KST로 변환 (UTC+9)
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const diffInSeconds = Math.floor((now.getTime() - kstDate.getTime()) / 1000);

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
    return kstDate.toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  }
};

export const formatYearMonth = (dateString: string): string => {
  const date = new Date(dateString);
  // UTC를 KST로 변환 (UTC+9)
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, "0");

  return `${year}.${month}`;
};
