export interface UserResponse {
  user: User;
}

export interface User {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  role: "GENERAL" | "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN";
  career: string;
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
