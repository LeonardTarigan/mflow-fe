import { Button } from "@/common/components/button/button";
import { CardsIcon } from "@phosphor-icons/react";

export default function SendMedicalCardButton() {
  return (
    <Button size={"icon"} className="bg-secondary-500 hover:bg-secondary-600">
      <CardsIcon weight="fill" />
    </Button>
  );
}
