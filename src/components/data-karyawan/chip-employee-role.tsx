import type { TEmployeeRole } from "@/model/employee.model";

export default function ChipEmployeeRole({ role }: { role: TEmployeeRole }) {
  let formattedRole = "";
  let color = "bg-amber-100/55 text-amber-600";

  switch (role) {
    case "ADMIN":
      formattedRole = "Admin";
      break;
    case "STAFF":
      formattedRole = "Staff";
      color = "bg-violet-100/55 text-violet-600";
      break;
    case "DOKTER":
      formattedRole = "Dokter";
      color = "bg-cyan-100/55 text-cyan-600";
      break;
    case "APOTEKER":
      formattedRole = "Apoteker";
      color = "bg-pink-100/55 text-pink-600";
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
