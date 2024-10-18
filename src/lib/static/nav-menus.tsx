import {
  ArchiveIcon,
  BookUserIcon,
  BriefcaseMedicalIcon,
  HouseIcon,
} from "lucide-react";

export const navManus = [
  {
    path: "/",
    label: "Dashboard",
    icon: <HouseIcon />,
  },
  {
    path: "/antrian",
    label: "Antrian Pasien",
    icon: <BookUserIcon />,
  },
  {
    path: "/data-obat",
    label: "Data Obat",
    icon: <BriefcaseMedicalIcon />,
  },
  {
    path: "/riwayat",
    label: "Riwayat Pelayanan",
    icon: <ArchiveIcon />,
  },
];
