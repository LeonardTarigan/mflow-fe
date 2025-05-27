import { MailIcon } from "lucide-react";
import InstagramIcon from "../icons/instagram-icon";
import WhatsappIcon from "../icons/whatsapp-icon";

export default function SocialMediaSection() {
  return (
    <section className="flex size-full basis-1/3 flex-col items-center justify-center gap-3 rounded-xl bg-white bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 p-3 text-white">
      <h2 className="font-bold">Media Sosial</h2>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <InstagramIcon className="size-5" />
          <p>klinik_millenium</p>
        </div>
        <div className="flex items-center gap-2">
          <WhatsappIcon className="size-5" />
          <p>+62 823-7059-0506</p>
        </div>
        <div className="flex items-center gap-2">
          <MailIcon className="size-5" />
          <p>milleniumklinik71@gmail.com</p>
        </div>
      </div>
    </section>
  );
}
