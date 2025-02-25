import { TEmployeeRole } from "@/common/models/employee.model";
import {
  ArchiveIcon,
  BookUserIcon,
  BriefcaseMedicalIcon,
  DoorOpenIcon,
  HouseIcon,
  StethoscopeIcon,
  UsersRoundIcon,
} from "lucide-react";
import { ReactNode } from "react";

type TNavMenu = {
  path: string;
  label: string;
  icon: ReactNode;
  eligibleRoles?: TEmployeeRole[];
};

export const navMenus: TNavMenu[] = [
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
    path: "/data/akun",
    label: "Data Akun",
    icon: <UsersRoundIcon />,
    eligibleRoles: ["ADMIN"],
  },
  {
    path: "/data/obat",
    label: "Data Obat",
    icon: <BriefcaseMedicalIcon />,
    eligibleRoles: ["ADMIN", "FARMASI"],
  },
  {
    path: "/data/ruangan",
    label: "Data Ruangan",
    icon: <DoorOpenIcon />,
    eligibleRoles: ["ADMIN"],
  },
];
