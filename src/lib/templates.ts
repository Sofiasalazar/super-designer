export interface DesignTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  prompt: string;
  style?: string;
}

export type TemplateCategory =
  | 'landing'
  | 'dashboard'
  | 'ecommerce'
  | 'saas'
  | 'portfolio'
  | 'mobile'
  | 'components';

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  landing: 'Landing Pages',
  dashboard: 'Dashboards',
  ecommerce: 'E-Commerce',
  saas: 'SaaS',
  portfolio: 'Portfolio',
  mobile: 'Mobile / App',
  components: 'Components',
};

export const STYLE_PRESETS = [
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    description: 'Vercel/Linear aesthetic -- grayscale with selective accents, soft rounded corners, subtle shadows, minimalist',
    suffix: ' Use a modern dark mode aesthetic inspired by Vercel and Linear: grayscale primary scheme with selective accent colors, soft rounded corners (0.625rem), subtle shadows with reduced opacity, system font stack, minimalist and refined.',
  },
  {
    id: 'neo-brutalism',
    name: 'Neo-Brutalism',
    description: '90s web aesthetic -- hard edges, bold shadows, limited palette, monospace fonts, raw and unconventional',
    suffix: ' Use a neo-brutalist aesthetic: hard edges with 0px border radius, bold shadows (4px 4px 0px offsets), limited palette with orange/purple accents, monospace fonts (Space Mono), raw, rebellious, unconventional feel.',
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted glass effects, blur backgrounds, translucent cards, vibrant gradients',
    suffix: ' Use glassmorphism aesthetic: frosted glass cards with backdrop-blur, translucent backgrounds (bg-white/10), vibrant gradient backgrounds, subtle borders (border-white/20), soft shadows, modern and ethereal feel.',
  },
  {
    id: 'clean-minimal',
    name: 'Clean Minimal',
    description: 'Light background, generous whitespace, Inter font, no visual noise',
    suffix: ' Use a clean minimal aesthetic: white/light background, generous whitespace, Inter font, very subtle borders (#e5e7eb), no visual noise, content-first hierarchy, refined and professional.',
  },
];

export const TEMPLATES: DesignTemplate[] = [
  // Landing Pages
  {
    id: 'hero-saas',
    name: 'SaaS Hero Landing',
    category: 'landing',
    prompt: 'Design a SaaS landing page with a bold hero section featuring a headline, subtitle, two CTA buttons (primary and secondary), a hero image placeholder, trusted-by logo bar, 3-column feature grid with icons, testimonial section with profile cards, and a final CTA section. Use a professional dark theme with violet accents.',
  },
  {
    id: 'startup-launch',
    name: 'Startup Launch Page',
    category: 'landing',
    prompt: 'Design a startup launch page with a centered hero headline with gradient text effect, an email capture input with submit button, animated background grid pattern, "How it works" 3-step section with numbered cards, pricing comparison table, FAQ accordion section, and footer with social links.',
  },
  {
    id: 'product-showcase',
    name: 'Product Showcase',
    category: 'landing',
    prompt: 'Design a product showcase landing page with a large product image placeholder centered with floating feature badges around it, a feature comparison section with two columns, a scrolling testimonials row, integration logos section, and a gradient CTA banner at the bottom.',
  },
  {
    id: 'waitlist',
    name: 'Waitlist / Coming Soon',
    category: 'landing',
    prompt: 'Design a "coming soon" waitlist page with a centered layout, animated countdown timer, email signup form, progress bar showing "2,847 people on the waitlist", social proof avatars, and a background with subtle animated gradient. Minimal and elegant.',
  },

  // Dashboards
  {
    id: 'analytics-dash',
    name: 'Analytics Dashboard',
    category: 'dashboard',
    prompt: 'Design an analytics dashboard with a top navigation bar, sidebar with icon-based navigation, KPI cards row (revenue, users, conversion, growth with up/down indicators), a large area chart placeholder, a bar chart placeholder, recent activity feed, and a data table with pagination. Dark theme.',
  },
  {
    id: 'project-dash',
    name: 'Project Management',
    category: 'dashboard',
    prompt: 'Design a project management dashboard with a sidebar navigation, top breadcrumb bar, kanban-style board with 4 columns (To Do, In Progress, Review, Done) containing task cards with avatars and priority badges, a project progress bar, and team member avatars in the header.',
  },
  {
    id: 'crm-dash',
    name: 'CRM Dashboard',
    category: 'dashboard',
    prompt: 'Design a CRM dashboard with a sidebar, pipeline overview showing deal stages as a horizontal funnel, contact list with search and filters, recent activities timeline, revenue chart placeholder, and quick-action buttons for adding contacts, deals, and tasks.',
  },

  // E-Commerce
  {
    id: 'product-page',
    name: 'Product Detail Page',
    category: 'ecommerce',
    prompt: 'Design an e-commerce product detail page with a large product image gallery (main image + thumbnails), product title, star rating, price with discount badge, size/color selectors, quantity picker, Add to Cart and Buy Now buttons, product description tabs (Details, Reviews, Shipping), and a "You may also like" product grid at the bottom.',
  },
  {
    id: 'shop-homepage',
    name: 'Shop Homepage',
    category: 'ecommerce',
    prompt: 'Design an e-commerce homepage with a top announcement bar, navigation with search and cart icon, hero banner with sale promotion, category grid (6 categories with image placeholders), trending products carousel with product cards (image, name, price, rating), and newsletter signup section.',
  },
  {
    id: 'checkout',
    name: 'Checkout Flow',
    category: 'ecommerce',
    prompt: 'Design a checkout page with a step indicator (Cart > Shipping > Payment > Confirm), order summary sidebar with item list and totals, shipping address form, payment method selection (card, PayPal, Apple Pay), promo code input, and a prominent Place Order button. Clean, trust-building design.',
  },

  // SaaS
  {
    id: 'pricing-page',
    name: 'Pricing Page',
    category: 'saas',
    prompt: 'Design a SaaS pricing page with a monthly/annual toggle switch, 3 pricing tiers in cards (Starter, Pro, Enterprise) with the middle one highlighted as "Most Popular", feature comparison checklist in each card, a detailed feature comparison table below, and an FAQ section. Professional and clear.',
  },
  {
    id: 'settings-page',
    name: 'Settings Page',
    category: 'saas',
    prompt: 'Design a SaaS settings page with a left sidebar menu (Profile, Account, Billing, Notifications, Security, API Keys), profile section with avatar upload and form fields, notification toggles, connected accounts section, danger zone with delete account button. Clean, organized layout.',
  },
  {
    id: 'onboarding',
    name: 'Onboarding Flow',
    category: 'saas',
    prompt: 'Design a multi-step onboarding flow with a progress stepper (4 steps), step 1 showing a welcome screen with illustration placeholder, form inputs for workspace name and role selection, skip and continue buttons, and a sidebar with tips. Friendly and inviting design.',
  },

  // Portfolio
  {
    id: 'dev-portfolio',
    name: 'Developer Portfolio',
    category: 'portfolio',
    prompt: 'Design a developer portfolio with a hero section showing name, title, and animated typing effect placeholder, about section with skills tags, project showcase grid with hover overlays, experience timeline, tech stack icons grid, contact form, and social links. Dark theme with green/cyan accents.',
  },
  {
    id: 'agency-site',
    name: 'Agency Website',
    category: 'portfolio',
    prompt: 'Design a creative agency website with a full-width hero with large typography, services section with icon cards, selected work showcase as a masonry grid, client logos marquee, team section with photo placeholders, and a contact section with a map placeholder. Bold and modern.',
  },
  {
    id: 'designer-portfolio',
    name: 'Designer Portfolio',
    category: 'portfolio',
    prompt: 'Design a minimal designer portfolio with a clean navigation, large hero text with a cursor-following effect area, case study cards with large image placeholders and brief descriptions, an about section with a photo placeholder, and a simple contact section. Lots of whitespace, elegant typography.',
  },

  // Mobile / App
  {
    id: 'app-landing',
    name: 'App Download Page',
    category: 'mobile',
    prompt: 'Design a mobile app landing page with a hero showing a phone mockup placeholder, app store badges (App Store + Google Play), 3 key feature sections with phone screen mockups alternating left/right, user reviews carousel, download stats (1M+ downloads, 4.8 rating), and a final CTA with phone mockup.',
  },
  {
    id: 'login-page',
    name: 'Login / Sign Up',
    category: 'mobile',
    prompt: 'Design a login page with a split layout: left side has a decorative gradient/pattern with a quote, right side has the login form with email/password inputs, "Remember me" checkbox, "Forgot password" link, Sign In button, Google/GitHub social login buttons, and a "Don\'t have an account? Sign up" link.',
  },

  // Components
  {
    id: 'navbar-variants',
    name: 'Navigation Bars',
    category: 'components',
    prompt: 'Design a page showcasing 4 different navigation bar variants stacked vertically with spacing between them: (1) minimal with logo + links + CTA button, (2) with dropdown mega menu expanded, (3) transparent overlay style for hero sections, (4) dashboard sidebar navigation with icons and nested items. Each should be fully styled and interactive on hover.',
  },
  {
    id: 'card-collection',
    name: 'Card Components',
    category: 'components',
    prompt: 'Design a page showcasing 8 different card component variants in a grid: pricing card, testimonial card, team member card, blog post card, stats card, feature card with icon, notification card, and product card. Each card should have hover animations and be fully responsive.',
  },
  {
    id: 'form-elements',
    name: 'Form Elements',
    category: 'components',
    prompt: 'Design a page showcasing form UI elements: text inputs with labels and validation states (normal, focus, error, success), select dropdowns, radio buttons, checkboxes, toggle switches, range sliders, file upload area, date picker placeholder, textarea, and a complete example form combining several elements. Dark theme.',
  },
];
