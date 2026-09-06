export type ClearanceLevel =
  | 'LEVEL 5 - COSMIC / TOP SECRET'
  | 'LEVEL 4 - SECRET'
  | 'LEVEL 3 - CONFIDENTIAL'
  | 'LEVEL 2 - RESTRICTED';

export interface NTROEmployee {
  id: string;
  name: string;
  designation: string;
  division: string;
  serviceId: string;
  uniqueCode: string; // Exactly 10-digit unique personnel code
  passcode: string; // Exactly 5-digit security passcode
  clearanceLevel: ClearanceLevel;
  badgeCode: string;
  nicEmail: string;
  avatarInitials: string;
  station: string;
}

export interface AuthSession {
  employee: NTROEmployee;
  token: string;
  loginTimeIST: string;
  ipMasked: string;
}
