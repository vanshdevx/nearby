import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, BadgeCheck, Camera, Check, Menu, MoveRight, Palette, X } from 'lucide-react';
import { SiGooglemaps, SiInstagram, SiSwiggy, SiZomato } from 'react-icons/si';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const WHATSAPP_URL = 'https://wa.me/916378034887';
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encodeURIComponent(WHATSAPP_URL)}`;
const CEO_NAME = 'Vansh Wadhwani';
const PHONE_DISPLAY = '+91 63780 34887';

type ServiceTab = 'onboarding' | 'instagram' | 'creative';

type OnboardingService = {
  number: string;
  title: string;
  description: string;
  price: string;
  mark: 'google' | 'food' | 'instagram' | 'photos' | 'verification' | 'branding';
};

const onboardingServices: OnboardingService[] = [
  { number: '01', title: 'Google Business Setup', description: 'Google Maps / Business profile setup, location, timings, contact details, photos and optimization.', price: '₹2,000', mark: 'google' },
  { number: '02', title: 'Food Platform Setup', description: 'Zomato, Swiggy and District profiles with menu & business information setup.', price: '₹3,500', mark: 'food' },
  { number: '03', title: 'Instagram Setup', description: 'Professional account setup, bio, contact details, profile optimization and highlights.', price: '₹1,500', mark: 'instagram' },
  { number: '04', title: 'Menu & Photos', description: 'Menu formatting & uploading, photo uploading and basic photo setup.', price: '₹1,000', mark: 'photos' },
  { number: '05', title: 'Registration & Verification', description: 'Platform registration, OTP & verification, document submission assistance.', price: '₹1,000', mark: 'verification' },
  { number: '06', title: 'Initial Design & Branding', description: 'Basic profile graphics, initial promotional material and consistent branding across platforms.', price: '₹1,000', mark: 'branding' },
];

const instagramPlans = [
  { name: 'BASIC', price: '₹2,999', items: ['1 Instagram post per week', '2 stories per week', 'Content planning & caption writing', 'Relevant hashtags', 'Basic account management'] },
  { name: 'GROWTH', price: '₹5,499', popular: true, items: ['2 Instagram posts per week', '4 stories per week', '1 Reel per week', 'Content planning & caption writing', 'Relevant hashtags', 'Basic account management'] },
  { name: 'PREMIUM', price: '₹8,999', items: ['3 Instagram posts per week', '6 stories per week', '1 Reel per week', 'One content shoot per month', 'Content planning & caption writing', 'Relevant hashtags', 'Full account management'] },
];

const creativeServices = ['Social media posts', 'Instagram stories', 'Reels', 'Menu designs', 'Promotional creatives', 'Basic business branding', 'Food photography / content shoots'];

function WhatsAppButton({ children, className = '', testId = 'link-whatsapp' }: { children: ReactNode; className?: string; testId?: string }) {
  return (
    <a className={`focus-ring inline-flex items-center justify-center gap-3 rounded-full transition-transform duration-300 hover:-translate-y-0.5 ${className}`} data-testid={testId} href={WHATSAPP_URL} rel="noreferrer" target="_blank">
      {children}
      <ArrowUpRight size={17} strokeWidth={1.8} />
    </a>
  );
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4" data-testid={`label-section-${number}`}>
      <span className="font-mono text-[11px] font-bold tracking-[.16em] text-muted-foreground">{number}</span>
      <span className="h-px w-8 bg-border" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

function ServiceMark({ kind }: { kind: OnboardingService['mark'] }) {
  if (kind === 'google') {
    return <div className="service-mark text-[#4285f4]" aria-label="Google Maps logo"><SiGooglemaps size={21} /></div>;
  }
  if (kind === 'food') {
    return (
      <div className="service-mark gap-1.5 text-foreground" aria-label="Zomato, Swiggy and District logos">
        <SiZomato size={17} className="text-[#e23744]" />
        <SiSwiggy size={17} className="text-[#fc8019]" />
        <span className="font-mono text-[8px] font-bold tracking-[-.08em]">DIST.</span>
      </div>
    );
  }
  if (kind === 'instagram') {
    return <div className="service-mark text-[#c13584]" aria-label="Instagram logo"><SiInstagram size={20} /></div>;
  }
  if (kind === 'photos') {
    return <div className="service-mark text-muted-foreground" aria-label="Menu and photography"><Camera size={20} strokeWidth={1.8} /></div>;
  }
  if (kind === 'verification') {
    return <div className="service-mark text-muted-foreground" aria-label="Registration and verification"><BadgeCheck size={21} strokeWidth={1.8} /></div>;
  }
  return <div className="service-mark text-muted-foreground" aria-label="Design and branding"><Palette size={20} strokeWidth={1.8} /></div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Services', '#services'],
    ['Digital Onboarding', '#onboarding'],
    ['Instagram & Content', '#instagram'],
    ['Contact', '#contact'],
  ];

  return (
    <header className="absolute left-0 right-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a className="focus-ring shrink-0" data-testid="link-logo" href="#top" onClick={() => setOpen(false)}>
          <img className="h-auto w-[112px] object-contain sm:w-[136px]" src="/nearby-logo.png" alt="nearby DIGITAL PRESENCE" />
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a className="focus-ring text-[12px] font-semibold tracking-[-.01em] text-foreground/65 transition-colors hover:text-foreground" data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`} href={href} key={href}>{label}</a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <WhatsAppButton className="bg-foreground px-5 py-3 text-xs font-bold text-background" testId="link-header-whatsapp">Let’s Talk</WhatsAppButton>
        </div>
        <button className="focus-ring rounded-full border border-border p-2.5 lg:hidden" data-testid="button-mobile-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <div className="mx-4 rounded-2xl border border-border bg-card p-4 shadow-lg lg:hidden" data-testid="menu-mobile">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <a className="focus-ring rounded-xl px-4 py-3 text-sm font-semibold hover:bg-secondary" data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`} href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[740px] overflow-hidden border-b border-border bg-background pt-28 sm:min-h-[820px] lg:min-h-[880px] lg:pt-36" id="top">
      <div className="absolute inset-0 hairline-grid opacity-60" />
      <div className="absolute -right-32 top-28 h-[420px] w-[420px] rounded-full bg-accent/35 blur-[1px] sm:h-[620px] sm:w-[620px] lg:right-[4%] lg:top-28" />
      <div className="absolute -left-40 bottom-[-250px] h-[500px] w-[500px] rounded-full border border-secondary/60 sm:h-[680px] sm:w-[680px]" />
      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 pb-24 sm:px-8 lg:grid-cols-[1.12fr_.88fr] lg:items-end lg:gap-8 lg:px-12 lg:pb-28">
        <div className="animate-rise-in max-w-[800px]">
          <div className="mb-10 flex items-center gap-4 sm:mb-14">
            <span className="eyebrow text-foreground/60">DIGITAL PRESENCE</span>
            <span className="h-px w-14 bg-foreground/30" />
            <span className="text-xs text-muted-foreground">A local digital studio</span>
          </div>
          <h1 className="font-display text-[clamp(4.2rem,11vw,10.5rem)] leading-[.87] tracking-[-.065em] text-foreground">
            Get Found.<br /><span className="ml-[.75em] text-foreground/70">Get Seen.</span>
          </h1>
          <div className="mt-12 grid max-w-[680px] gap-7 border-l border-foreground/30 pl-5 sm:ml-[11%] sm:mt-16 sm:grid-cols-[.95fr_1.3fr] sm:gap-12 sm:pl-7">
            <p className="text-[17px] font-medium leading-[1.35] tracking-[-.02em] sm:text-xl" data-testid="text-hero-supporting">Simple digital solutions for cafés, restaurants and local businesses.</p>
            <p className="text-sm leading-7 text-muted-foreground" data-testid="text-hero-description">Nearby helps local businesses build a stronger digital presence — from Google and food platforms to Instagram content and visual branding.</p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:ml-[11%]">
            <WhatsAppButton className="bg-foreground px-6 py-3.5 text-sm font-bold text-background" testId="link-hero-whatsapp">Let’s Talk</WhatsAppButton>
            <a className="focus-ring inline-flex items-center gap-3 rounded-full border border-foreground/20 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-card" data-testid="link-hero-services" href="#services">View Services <ArrowDown size={16} /></a>
          </div>
        </div>
        <div className="animate-rise-in flex items-end justify-between gap-5 [animation-delay:220ms] sm:justify-end lg:pb-1">
          <div className="relative flex w-full max-w-[290px] items-center gap-5 rounded-[1.5rem] border border-foreground/15 bg-background/75 p-4 backdrop-blur-sm sm:w-auto sm:p-5">
            <a className="focus-ring shrink-0 rounded-xl bg-[#f8f7ef] p-2.5" data-testid="link-hero-qr" href={WHATSAPP_URL} rel="noreferrer" target="_blank">
              <img className="h-[104px] w-[104px] rounded-lg mix-blend-multiply" src={QR_URL} alt="QR code to chat with nearby on WhatsApp" data-testid="img-hero-qr" />
            </a>
            <div>
              <p className="eyebrow mb-2 text-foreground/60">Start nearby</p>
              <p className="max-w-[120px] text-sm font-semibold leading-5">Scan to chat on WhatsApp.</p>
            </div>
          </div>
          <span className="hidden pb-2 text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground sm:block [writing-mode:vertical-rl]">Made for local</span>
        </div>
      </div>
    </section>
  );
}

function OnboardingPanel() {
  return (
    <div className="animate-rise-in">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h3 className="font-display text-4xl leading-none tracking-[-.04em] sm:text-5xl" data-testid="heading-onboarding">Complete Digital Presence Setup</h3>
          <p className="mt-4 text-sm font-semibold text-muted-foreground" data-testid="text-onboarding-subtitle">For Cafés &amp; Restaurants</p>
        </div>
        <span className="rounded-full bg-secondary px-4 py-2 text-[11px] font-bold uppercase tracking-[.13em]">One-Time Setup Package</span>
      </div>
      <div className="overflow-hidden rounded-[1.5rem] border border-border bg-background">
        {onboardingServices.map(({ number, title, description, price, mark }) => (
          <div className="grid gap-4 border-b border-border p-5 last:border-b-0 sm:grid-cols-[72px_1fr_auto] sm:items-start sm:gap-5 sm:p-6" data-testid={`row-onboarding-${number}`} key={number}>
            <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
              <ServiceMark kind={mark} />
              <span className="font-mono text-xs font-bold text-muted-foreground">{number}</span>
            </div>
            <div><h4 className="text-sm font-bold">{title}</h4><p className="mt-1.5 max-w-[600px] text-sm leading-6 text-muted-foreground">{description}</p></div>
            <span className="font-display text-2xl tracking-[-.04em] sm:pt-[-2px]">{price}</span>
          </div>
        ))}
        <div className="grid gap-3 bg-secondary/55 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
          <div><p className="eyebrow text-foreground/60">Complete Digital Presence Setup</p><p className="mt-2 text-sm text-foreground/70">One-Time Fee</p></div>
          <span className="font-display text-4xl tracking-[-.05em]" data-testid="text-onboarding-total">₹10,000</span>
        </div>
      </div>
    </div>
  );
}

function InstagramPanel() {
  return (
    <div className="animate-rise-in">
      <div className="mb-10">
        <h3 className="font-display text-4xl leading-none tracking-[-.04em] sm:text-5xl" data-testid="heading-instagram">Instagram Content Plans</h3>
        <p className="mt-4 text-sm font-semibold text-muted-foreground" data-testid="text-instagram-subtitle">Consistent content, without the agency price tag.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {instagramPlans.map((plan) => (
          <div className={`relative flex flex-col rounded-[1.5rem] border p-6 sm:p-7 ${plan.popular ? 'border-foreground bg-foreground text-background' : 'border-border bg-background'}`} data-testid={`card-plan-${plan.name.toLowerCase()}`} key={plan.name}>
            {plan.popular && <span className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 text-[9px] font-bold tracking-[.12em] text-foreground">MOST POPULAR</span>}
            <p className={`eyebrow ${plan.popular ? 'text-background/60' : ''}`}>{plan.name}</p>
            <p className="mt-7 font-display text-4xl tracking-[-.05em]" data-testid={`text-price-${plan.name.toLowerCase()}`}>{plan.price}<span className={`ml-1 font-sans text-sm font-medium tracking-normal ${plan.popular ? 'text-background/60' : 'text-muted-foreground'}`}>/ month</span></p>
            <ul className="mt-8 grid gap-4 border-t border-current/15 pt-7">
              {plan.items.map((item) => <li className={`flex gap-3 text-sm leading-5 ${plan.popular ? 'text-background/80' : 'text-muted-foreground'}`} key={item}><Check className="mt-0.5 shrink-0 text-accent" size={16} strokeWidth={2.5} />{item}</li>)}
            </ul>
            <WhatsAppButton className={`mt-10 w-full border px-5 py-3 text-sm font-bold ${plan.popular ? 'border-background/25 text-background hover:bg-background/10' : 'border-border hover:bg-secondary'}`} testId={`link-plan-${plan.name.toLowerCase()}`}>Ask about {plan.name.toLowerCase()}</WhatsAppButton>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-7 rounded-[1.5rem] border border-accent/50 bg-accent/30 p-6 sm:grid-cols-[.75fr_1.25fr] sm:p-8">
        <div><p className="eyebrow">INFLUENCER REEL SHOOT</p><p className="mt-4 font-display text-3xl tracking-[-.04em]">₹2,000 <span className="font-sans text-sm font-semibold tracking-normal">+ influencer charges</span></p></div>
        <div><p className="mb-4 text-sm font-bold">Includes:</p><div className="grid gap-3 sm:grid-cols-2">{['Influencer coordination', 'Concept & script', 'Shoot at the café', 'Reel editing', 'Instagram-ready Reel', 'Posting copy'].map((item) => <div className="flex gap-2 text-sm" key={item}><Check size={16} className="mt-0.5 shrink-0" />{item}</div>)}</div><p className="mt-6 text-xs leading-5 text-foreground/65">Influencer charges are separate and depend on the selected influencer.</p></div>
      </div>
    </div>
  );
}

function CreativePanel() {
  return (
    <div className="animate-rise-in grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
      <div><h3 className="font-display text-4xl leading-none tracking-[-.04em] sm:text-5xl" data-testid="heading-creative">Content / Creative Services</h3><p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">Nearby can also provide creative support such as:</p></div>
      <div className="grid border-t border-border">
        {creativeServices.map((service, index) => <div className="group flex items-center justify-between border-b border-border py-5" data-testid={`row-creative-${index}`} key={service}><span className="flex items-center gap-4 text-lg font-semibold tracking-[-.02em]"><span className="font-mono text-[10px] font-normal text-muted-foreground">0{index + 1}</span>{service}</span><MoveRight className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" size={19} /></div>)}
      </div>
    </div>
  );
}

function Services() {
  const [activeTab, setActiveTab] = useState<ServiceTab>('onboarding');
  const tabs: { id: ServiceTab; label: string }[] = [
    { id: 'onboarding', label: 'Digital Onboarding' },
    { id: 'instagram', label: 'Instagram & Content' },
    { id: 'creative', label: 'Content / Creative' },
  ];
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash;
      const nextTab = hash === '#instagram' ? 'instagram' : hash === '#creative' ? 'creative' : hash === '#onboarding' ? 'onboarding' : null;
      if (nextTab) {
        setActiveTab(nextTab);
        window.setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);
  return (
    <section className="section-pad scroll-mt-8 bg-card/50" id="services">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionLabel number="01">Services</SectionLabel>
        <div className="mt-10 grid gap-12 lg:grid-cols-[.36fr_.64fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start"><h2 className="font-display text-5xl leading-[.94] tracking-[-.055em] sm:text-6xl">The right<br /><span className="text-muted-foreground">starting point.</span></h2><p className="mt-7 max-w-xs text-sm leading-7 text-muted-foreground">Practical digital support for the places people already love.</p></div>
          <div>
            <div className="mb-10 flex overflow-x-auto border-b border-border" role="tablist" aria-label="Service categories">
              {tabs.map((tab) => <button className={`focus-ring relative shrink-0 px-1 pb-4 mr-7 text-left text-sm font-bold transition-colors ${activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`} data-testid={`button-tab-${tab.id}`} key={tab.id} onClick={() => setActiveTab(tab.id)} role="tab" aria-selected={activeTab === tab.id}>{tab.label}{activeTab === tab.id && <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-foreground" />}</button>)}
            </div>
            <div id="onboarding" className="scroll-mt-24">{activeTab === 'onboarding' && <OnboardingPanel />}{activeTab === 'instagram' && <div id="instagram"><InstagramPanel /></div>}{activeTab === 'creative' && <CreativePanel />}</div>
            <span className="sr-only" id="instagram-anchor">Instagram &amp; Content</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section-pad scroll-mt-8 border-t border-border" id="contact">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_300px] lg:items-end lg:px-12">
        <div>
          <SectionLabel number="02">Contact</SectionLabel>
          <h2 className="mt-10 max-w-[760px] font-display text-[clamp(3.3rem,8vw,7.5rem)] leading-[.88] tracking-[-.065em]" data-testid="heading-contact">Let’s build your<br /><span className="text-muted-foreground">digital presence.</span></h2>
          <div className="mt-10 border-l border-foreground/30 pl-5">
            <p className="eyebrow text-foreground/60">Founder &amp; CEO</p>
            <p className="mt-2 font-display text-3xl tracking-[-.04em]" data-testid="text-ceo-name">{CEO_NAME}</p>
            <a className="focus-ring mt-2 inline-block text-sm font-semibold underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground" data-testid="link-contact-phone" href={WHATSAPP_URL} rel="noreferrer" target="_blank">{PHONE_DISPLAY}</a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <WhatsAppButton className="bg-foreground px-6 py-4 text-sm font-bold text-background" testId="link-contact-whatsapp">Chat on WhatsApp</WhatsAppButton>
          </div>
        </div>
        <a className="focus-ring group flex items-center gap-5 rounded-[1.5rem] border border-border bg-secondary/45 p-5 transition-colors hover:bg-secondary" data-testid="link-contact-qr" href={WHATSAPP_URL} rel="noreferrer" target="_blank"><img className="h-[112px] w-[112px] rounded-xl bg-[#f8f7ef] p-2 mix-blend-multiply" src={QR_URL} alt="QR code to chat with nearby on WhatsApp" data-testid="img-contact-qr" /><span className="text-sm font-semibold leading-5">Scan to start<br />a conversation <ArrowUpRight className="mt-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={16} /></span></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div><img className="w-[125px] brightness-0 invert" src="/nearby-logo.png" alt="nearby DIGITAL PRESENCE" data-testid="img-footer-logo" /><p className="mt-5 font-display text-2xl tracking-[-.04em]">Get Found. Get Seen.</p></div>
        <div className="flex items-end justify-between gap-8 sm:gap-16">
          <div>
            <p className="eyebrow text-background/45">Vansh Wadhwani · CEO</p>
            <a className="focus-ring mt-2 block text-sm font-semibold underline decoration-background/25 underline-offset-4 hover:decoration-background" data-testid="link-footer-whatsapp" href={WHATSAPP_URL} rel="noreferrer" target="_blank">{PHONE_DISPLAY}</a>
          </div>
          <a className="focus-ring rounded-full border border-background/25 p-2 transition-colors hover:bg-background/10" data-testid="link-footer-ceo-photo" href={WHATSAPP_URL} rel="noreferrer" target="_blank" aria-label={`Chat with ${CEO_NAME} on WhatsApp`}><img className="ceo-avatar h-14 w-14 rounded-full object-cover" src="/vansh-wadhwani.png" alt={`${CEO_NAME}, Founder & CEO`} /></a>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 pb-7 sm:px-8 lg:px-12"><p className="text-[10px] font-medium uppercase tracking-[.18em] text-background/35">nearby DIGITAL PRESENCE</p></div>
    </footer>
  );
}

function Home() {
  return <div className="noise min-h-[100dvh]"><Header /><main><Hero /><Services /><Contact /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;