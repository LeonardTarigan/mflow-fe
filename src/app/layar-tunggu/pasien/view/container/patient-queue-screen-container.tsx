import { Button } from "@/common/components/button/button";
import { FullscreenIcon } from "lucide-react";
import useFullscreen from "../../hooks/useFullscreen";
import CalledQueueSection from "../components/sections/called-queue-section";
import HealthFactsSection from "../components/sections/health-facts-section";
import SocialMediaSection from "../components/sections/social-media-section";
import WaitingQueueSection from "../components/sections/waiting-queue-section";
import WorldClockSection from "../components/sections/world-clock-section";

export default function PatientQueueScreenContainer() {
  const { isFullscreen, enterFullscreen, mainRef } = useFullscreen();

  return (
    <main
      ref={mainRef}
      className="flex h-screen gap-3 overflow-hidden bg-neutral-100 p-3"
    >
      {!isFullscreen && (
        <Button
          onClick={enterFullscreen}
          size={"icon"}
          variant={"outline"}
          className="absolute right-5 top-5"
        >
          <FullscreenIcon />
        </Button>
      )}
      <WaitingQueueSection />

      <CalledQueueSection />

      <div className="flex basis-1/4 flex-col gap-3">
        <SocialMediaSection />
        <HealthFactsSection />
        <WorldClockSection />
      </div>
    </main>
  );
}
