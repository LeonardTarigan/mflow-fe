import {
  ArchiveIcon,
  BookUserIcon,
  BriefcaseMedicalIcon,
  HouseIcon,
  StethoscopeIcon,
  UsersRoundIcon,
} from "lucide-react";

export const navManus = [
  {
    path: "/",
    label: "Dashboard",
    icon: <HouseIcon />,
  },
  {
    path: "/antrian/admin",
    label: "Antrian Pasien",
    icon: <BookUserIcon />,
  },
  {
    path: "/riwayat",
    label: "Riwayat Pelayanan",
    icon: <ArchiveIcon />,
  },
  {
    path: "/data/pasien",
    label: "Data Pasien",
    icon: <StethoscopeIcon />,
  },
  {
    path: "/data/karyawan",
    label: "Data Karyawan",
    icon: <UsersRoundIcon />,
  },
  {
    path: "/data/obat",
    label: "Data Obat",
    icon: <BriefcaseMedicalIcon />,
  },
];
