import { Logo } from "@/components/ui/Logo";
import { contact, navigation, residence, signature } from "@/content/site";

export function PiedDePage() {
  return (
    <footer className="gouttiere bg-encre pb-10 pt-16 text-creme/75">
      <div className="flex flex-wrap items-end justify-between gap-10">
        <div>
          <Logo taille="text-[28px]" className="text-creme" />
          <p className="mt-4 text-sm">{residence.slogan}.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <a href={contact.whatsappLien} className="hover:text-soleil">
              WhatsApp · {contact.whatsappAffiche}
            </a>
          </li>
          <li>
            <a href={contact.telephoneLien} className="hover:text-soleil">
              Appel · {contact.telephoneAffiche}
            </a>
          </li>
          <li>
            <a href={contact.tiktok} className="hover:text-soleil">
              TikTok
            </a>
          </li>
          <li>{contact.zone}</li>
        </ul>
      </div>

      <nav aria-label="Pied de page" className="mt-12">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {navigation.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-soleil">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-10 border-t border-creme/15 pt-6 text-xs tracking-[0.08em] text-creme/60">{signature}</p>
    </footer>
  );
}
