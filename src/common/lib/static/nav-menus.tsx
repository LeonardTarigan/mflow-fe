import { TEmployeeRole } from "@/common/models/employee.model";
import {
  ArchiveIcon,
  BooksIcon,
  CalendarBlankIcon,
  DoorIcon,
  FirstAidIcon,
  HouseIcon,
  PillIcon,
  PrescriptionIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { ReactNode } from "react";

type TNavMenu = {
  label: string;
  children: TNavMenuChildren[];
};

type TNavMenuChildren = {
  path: string;
  label: string;
  icon: ReactNode;
  eligibleRoles?: TEmployeeRole[];
};

export const navMenus: TNavMenu[] = [
  {
    label: "Operasional",
    children: [
      {
        path: "/",
        label: "Dashboard",
        icon: <HouseIcon size={22} weight="fill" />,
      },
      {
        path: "/antrian/admin",
        label: "Antrian Pasien",
        icon: <CalendarBlankIcon size={22} weight="fill" />,
        eligibleRoles: ["ADMIN", "STAFF"],
      },
      {
        path: "/antrian/dokter",
        label: "Pemeriksaan Pasien",
        icon: <CalendarBlankIcon size={22} weight="fill" />,
        eligibleRoles: ["DOKTER"],
      },
      {
        path: "/antrian/farmasi",
        label: "Antrian Obat",
        icon: <PrescriptionIcon size={22} weight="fill" />,
        eligibleRoles: ["FARMASI"],
      },
      {
        path: "/riwayat",
        label: "Riwayat Pelayanan",
        icon: <ArchiveIcon size={22} weight="fill" />,
      },
    ],
  },
  {
    label: "Manajemen Data",
    children: [
      {
        path: "/data/pasien",
        label: "Data Pasien",
        icon: <BooksIcon size={22} weight="fill" />,
      },
      {
        path: "/data/obat",
        label: "Data Obat",
        icon: <PillIcon size={22} weight="fill" />,
        eligibleRoles: ["ADMIN", "FARMASI"],
      },
      {
        path: "/data/penanganan",
        label: "Data Penanganan",
        icon: <FirstAidIcon size={22} weight="fill" />,
        eligibleRoles: ["ADMIN", "DOKTER", "STAFF"],
      },
      {
        path: "/data/ruangan",
        label: "Data Ruangan",
        icon: <DoorIcon size={22} weight="fill" />,
        eligibleRoles: ["ADMIN"],
      },
    ],
  },
  {
    label: "Administrasi Sistem",
    children: [
      {
        path: "/data/akun",
        label: "Akun Pengguna",
        icon: <UsersIcon size={22} weight="fill" />,
        eligibleRoles: ["ADMIN"],
      },
    ],
  },
];
