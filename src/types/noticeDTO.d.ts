export interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  public: boolean;
  pushSend: boolean;
}

export interface NoticeResponse {
  success: boolean;
  data: Notice[];
  message: string;
}

export interface CreateNoticeRequest {
  title: string;
  content: string;
  isPushSend: boolean;
  isPublic: boolean;
}
