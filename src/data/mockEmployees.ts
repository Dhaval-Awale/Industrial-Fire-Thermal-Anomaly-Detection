import { NTROEmployee } from '../types/auth';

export const VERIFIED_NTRO_EMPLOYEES: NTROEmployee[] = [
  {
    id: 'emp-001',
    name: 'Dr. Vikramaditya Rathore',
    designation: 'Joint Director, Spaceborne Thermal Reconnaissance',
    division: 'Directorate of Remote Sensing & SIGINT (NTRO HQ)',
    serviceId: 'NTRO-DIR-8842',
    uniqueCode: '1029384756', // 10-digit unique personnel code
    passcode: '58492',       // 5-digit security passcode
    clearanceLevel: 'LEVEL 5 - COSMIC / TOP SECRET',
    badgeCode: 'COSMIC-8842-A',
    nicEmail: 'v.rathore@ntro.gov.in',
    avatarInitials: 'VR',
    station: 'Block-III, CGO Complex, New Delhi',
  },
  {
    id: 'emp-002',
    name: 'Cdr. Meera Nambiar (Retd.)',
    designation: 'Chief Tactical Watch Officer & Crisis Coordinator',
    division: 'National Thermal Anomaly Operations & NDRF Liaison Cell',
    serviceId: 'NTRO-OPS-4109',
    uniqueCode: '9842105731', // 10-digit unique personnel code
    passcode: '73108',       // 5-digit security passcode
    clearanceLevel: 'LEVEL 4 - SECRET',
    badgeCode: 'SECRET-4109-B',
    nicEmail: 'm.nambiar@ntro.gov.in',
    avatarInitials: 'MN',
    station: 'Western Command Geospatial Node, Gandhinagar',
  },
  {
    id: 'emp-003',
    name: 'Inspector Rajesh Kaushik',
    designation: 'Senior Geospatial & Cadastral Disambiguation Analyst',
    division: 'FIRMS-OSM Cadastral Verification Directorate',
    serviceId: 'NTRO-GEO-2953',
    uniqueCode: '6482910357', // 10-digit unique personnel code
    passcode: '92041',       // 5-digit security passcode
    clearanceLevel: 'LEVEL 3 - CONFIDENTIAL',
    badgeCode: 'CONF-2953-C',
    nicEmail: 'r.kaushik@nic.in',
    avatarInitials: 'RK',
    station: 'Regional GIS Intelligence Center, Chandigarh',
  },
];
