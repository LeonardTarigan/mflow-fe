import type { TEmployeeRole } from "@/model/employee-types";

export default function ChipEmployeeRole({ role }: { role: TEmployeeRole }) {
  let formattedRole = "";
  let color = "bg-amber-100/55 text-amber-600";

  switch (role) {
    case "admin":
      formattedRole = "Admin";
      break;
    case "staff":
      formattedRole = "Staff";
      color = "bg-violet-100/55 text-violet-600";
      break;
    case "doctor":
      formattedRole = "Dokter";
      color = "bg-cyan-100/55 text-cyan-600";
      break;
  }

  return (
    <div
      className={` rounded-full px-4 py-1 text-center font-medium text-xs ${color}`}
    >
      {formattedRole}
    </div>
  );
}
