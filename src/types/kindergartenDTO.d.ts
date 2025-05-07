export interface KindergartenSimple {
  kindergartenId: number;
  name: string;
}

export interface Kindergarten {
  id: number;
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
  totalClassCount: number;
  totalPupilCount: number;
  internshipReviewAggregate: {
    workEnvironmentScoreAggregate: number;
    learningSupportScoreAggregate: number;
    instructionTeacherScoreAggregate: number;
  };
  workReviewAggregate: {
    benefitAndSalaryScoreAggregate: number;
    workLiftBalanceScoreAggregate: number;
    workEnvironmentScoreAggregate: number;
    managerScoreAggregate: number;
    customerScoreAggregate: number;
  };
}

export type KindergartenDetailResponse = Kindergarten;

// 주변 유치원 조회
export interface NearbyKindergartensParams {
  latitude: number;
  longitude: number;
  radiusKm?: number;
}

export interface NearbyKindergartensResponse {
  success: boolean;
  data: Kindergarten[];
  message: string;
}

// 유치원 검색
export interface KindergartenSearchParams {
  name?: string;
  establishment?: string;
  address?: string;
  minClassCount?: number;
  maxClassCount?: number;
  minPupilCount?: number;
  maxPupilCount?: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export type KindergartenSearchResponse = PageResponse<Kindergarten>;
