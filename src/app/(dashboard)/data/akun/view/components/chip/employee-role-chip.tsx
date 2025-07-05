import { TEmployeeRole } from "@/common/models/employee.model";

export default function EmployeeRoleChip({ role }: { role: TEmployeeRole }) {
  let formattedRole = "";
  let color = "bg-rose-100/55 text-rose-600";

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
      color = "bg-amber-100/55 text-amber-600";
      break;
    case "FARMASI":
      formattedRole = "Farmasi";
      color = "bg-secondary-100/55 text-secondary-600";
      break;
  }

  return (
    <div
      className={`w-fit rounded-full px-4 py-1 text-center text-xs font-medium ${color}`}
    >
      {formattedRole}
    </div>
  );
}
