export interface UserResponse {
  user: User;
}

export type UserRole = "GENERAL" | "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN";

export interface User {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  role: UserRole;
  career: string;
  homeShortcut?: HomeShortcut;
  kindergarten?: {
    name: string;
    establishment: string;
    establishmentDate: string;
    openDate: string;
    address: string;
    homepage: string;
    phoneNumber: string;
    classCount3: number;
    classCount4: number;
    classCount5: number;
    pupilCount3: number;
    pupilCount4: number;
    pupilCount5: number;
    mixPupilCount: number;
    specialPupilCount: number;
    latitude: number;
    longitude: number;
  };
}

export interface HomeShortcut {
  shortcuts: {
    name: string;
    iconName: string;
    link: string;
  }[];
}
