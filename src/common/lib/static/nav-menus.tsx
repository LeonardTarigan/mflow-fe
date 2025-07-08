import { TEmployeeRole } from "@/common/models/employee.model";
import {
  ArchiveIcon,
  BookUserIcon,
  ContactRoundIcon,
  CrossIcon,
  DoorOpenIcon,
  HouseIcon,
  PillBottleIcon,
  PillIcon,
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
    icon: <ContactRoundIcon />,
    eligibleRoles: ["ADMIN", "STAFF"],
  },
  {
    path: "/antrian/dokter",
    label: "Antrian Pasien",
    icon: <BookUserIcon />,
    eligibleRoles: ["DOKTER"],
  },
  {
    path: "/antrian/farmasi",
    label: "Antrian Obat",
    icon: <PillIcon />,
    eligibleRoles: ["FARMASI"],
  },
  {
    path: "/riwayat",
    label: "Riwayat Pelayanan",
    icon: <ArchiveIcon />,
  },
  {
    path: "/data/pasien",
    label: "Data Pasien",
    icon: <BookUserIcon />,
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
    icon: <PillBottleIcon />,
    eligibleRoles: ["ADMIN", "FARMASI"],
  },
  {
    path: "/data/penanganan",
    label: "Data Penanganan",
    icon: <CrossIcon />,
    eligibleRoles: ["ADMIN", "DOKTER", "STAFF"],
  },
  {
    path: "/data/ruangan",
    label: "Data Ruangan",
    icon: <DoorOpenIcon />,
    eligibleRoles: ["ADMIN"],
  },
];
