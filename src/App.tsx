import React, { useState } from 'react';
import {
  Check,
  ShieldCheck,
  FileText,
  Store,
  ShoppingCart,
  ArrowRight,
  Lock,
  Plus,
  Minus,
  Download,
  ExternalLink,
  X,
  CheckCircle2,
  AlertCircle,
  Copy,
  Table,
  BookOpen,
  Mail
} from 'lucide-react';

export default function App() {
  // Navigation / Category filter state ('all' | 'templates' | 'guides' | 'spreadsheets')
  const [activeCategory, setActiveCategory] = useState<'all' | 'templates' | 'guides' | 'spreadsheets'>('all');

  // Objections FAQ expand/collapse state
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  // Free sample opt-in state
  const [email, setEmail] = useState('');
  const [optinSubmitted, setOptinSubmitted] = useState(false);
  const [optinError, setOptinError] = useState('');

  // Modals state
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [showEmailTemplateModal, setShowEmailTemplateModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showSpreadsheetModal, setShowSpreadsheetModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Product checkout link state
  const [checkoutUrl, setCheckoutUrl] = useState('https://whop.com/niche-product-e25e/amazon-ungating-toolkit/');
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Decision tree interactive branch
  const [activeBranch, setActiveBranch] = useState<'Category' | 'Brand' | 'ASIN' | 'Account'>('Category');

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleNavClick = (category: 'templates' | 'guides' | 'spreadsheets', e: React.MouseEvent) => {
    e.preventDefault();
    setActiveCategory(category);
    const targetElement = document.getElementById(category);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const section = document.getElementById('whats-inside');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOptinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setOptinError('Please enter a valid email address.');
      return;
    }
    setOptinError('');
    setOptinSubmitted(true);
  };

  const handleBuyClick = () => {
    setShowCheckoutModal(true);
  };

  const copyOutreachTemplate = () => {
    const text = `Subject: Wholesale Account Application — [Your Company Name LLC]

Dear [Distributor/Sales Representative Name],

I hope this email finds you well.

My name is [Your Name], and I am the purchasing manager for [Your Business Legal Name, LLC], based in [City, State]. We operate a domestic retail distribution and e-commerce business specializing in [Your Niche / Target Product Category].

We are looking to expand our product offerings this quarter and would like to apply to open a wholesale purchasing account with [Supplier Company Name]. 

A few quick details about our business:
• Legal Entity: [Your Company Legal Name, LLC]
• Resale Certificate / Tax ID: [State Resale Certificate #]
• Federal EIN: [XX-XXXXXXX]
• Standard Initial Order Size: Opening orders typically range between $500 – $2,500 depending on minimum order quantities (MOQs).

Could you please send over your wholesale dealer application form, current product catalog with price sheet, and credit terms information?

Thank you for your time and assistance. We look forward to establishing a long-term purchasing relationship with your team.

Best regards,

[Your Name]
Purchasing Manager | [Your Company Legal Name, LLC]
[Phone Number] | [Professional Domain Email]
[Company Website URL]`;
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FCFDFE] text-slate-800 font-sans selection:bg-[#0284C7] selection:text-white">
      {/* ----------------- TOP NAVIGATION ----------------- */}
      <header className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-7 flex items-center justify-between">
        {/* Proper Amazon Smile Logo + Title */}
        <div className="flex items-center gap-3">
          <svg
            className="w-8 h-4 text-[#29ABE2] shrink-0"
            viewBox="0 0 38 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Proper Amazon smile arc dipping down and sweeping up */}
            <path
              d="M3 9.5C11.5 16 23.5 16.5 32.5 9"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Proper Amazon arrow tip angled up-right */}
            <path
              d="M26.5 6C29 7 32 8 33.5 8.5C32.5 10.5 31 13 30 15"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-bold tracking-tight text-[#0C1938]">
            Amazon Ungating Toolkit
          </span>
        </div>

        {/* Clean Nav Links with distinct destination actions */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          <button
            onClick={(e) => handleNavClick('templates', e)}
            className={`transition-colors cursor-pointer ${
              activeCategory === 'templates' ? 'text-[#0284C7] font-bold' : 'hover:text-[#0284C7]'
            }`}
          >
            TEMPLATES
          </button>
          <span className="text-slate-300 select-none">/</span>
          <button
            onClick={(e) => handleNavClick('guides', e)}
            className={`transition-colors cursor-pointer ${
              activeCategory === 'guides' ? 'text-[#0284C7] font-bold' : 'hover:text-[#0284C7]'
            }`}
          >
            GUIDES
          </button>
          <span className="text-slate-300 select-none">/</span>
          <button
            onClick={(e) => handleNavClick('spreadsheets', e)}
            className={`transition-colors cursor-pointer ${
              activeCategory === 'spreadsheets' ? 'text-[#0284C7] font-bold' : 'hover:text-[#0284C7]'
            }`}
          >
            SPREADSHEETS
          </button>
        </nav>
      </header>

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 pt-6 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Subtext */}
          <div className="lg:col-span-6 z-10">
            {/* Sky blue horizontal accent bar */}
            <div className="w-8 h-1 bg-[#29ABE2] rounded-full mb-6"></div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0C1938] leading-[1.12] tracking-tight mb-6">
              Stuck on ‘Approval required’?{' '}
              <span className="text-[#0284C7]">
                Get the invoice right the first time.
              </span>
            </h1>

            <p className="text-slate-600 text-lg sm:text-[17px] leading-relaxed max-w-lg mb-8">
              Get clear steps, the right templates, and a simple system to help you open a legitimate wholesale account and get ungated on Amazon.
            </p>

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#E0F2FE] text-[#0369A1] rounded-full text-sm font-semibold shadow-xs">
              <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>The Invoice That Gets You Ungated</span>
            </div>
          </div>

          {/* Right Column: Hero Mockup Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            {/* Background Organic Sky Blue Blob */}
            <div className="absolute w-84 h-84 sm:w-[420px] sm:h-[420px] bg-[#E0F4FC] rounded-full filter blur-xs -z-10 translate-x-2 translate-y-3"></div>

            {/* Hand-drawn playful note & arrow at top right */}
            <div className="absolute -top-10 right-4 sm:right-8 flex flex-col items-center pointer-events-none select-none z-20">
              <span className="font-handwriting text-2xl sm:text-[26px] text-[#0C1938] -rotate-3 font-bold leading-tight">
                Templates, checklists,
                <br />
                & real frameworks.
              </span>
              {/* Hand-drawn curved arrow SVG pointing to mockups */}
              <svg
                className="w-14 h-11 text-[#29ABE2] -rotate-12 translate-x-5 -translate-y-1"
                viewBox="0 0 60 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 5C25 8 45 20 40 38"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M32 36L41 40L44 30"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* 3D Bundle Mockup Container */}
            <div className="relative w-full max-w-[460px] h-[380px] sm:h-[430px] flex items-center justify-center">
              {/* Main Navy Book Mockup */}
              <div
                className="relative z-10 w-56 sm:w-64 h-76 sm:h-84 bg-gradient-to-b from-[#0F223D] via-[#0C1938] to-[#071325] rounded-2xl shadow-2xl p-6 sm:p-7 flex flex-col justify-between text-white border-l-4 border-slate-700/60 transform -rotate-1 hover:rotate-0 transition-transform duration-300"
                style={{
                  boxShadow:
                    '-14px 20px 36px rgba(12, 25, 56, 0.35), 0 6px 16px rgba(0,0,0,0.18)',
                }}
              >
                {/* Book Spine Highlight */}
                <div className="absolute top-0 left-0 bottom-0 w-3.5 bg-gradient-to-r from-white/12 to-transparent rounded-l-2xl pointer-events-none"></div>

                <div>
                  <div className="text-[13px] font-semibold text-slate-300 tracking-wide mb-1">
                    Amazon
                  </div>
                  <div className="text-3xl font-extrabold leading-[1.1] tracking-tight">
                    Ungating
                    <br />
                    Toolkit
                  </div>
                  <div className="w-8 h-1 bg-[#29ABE2] rounded-full my-4"></div>
                  <div className="text-xs sm:text-[13px] text-sky-200 font-medium leading-snug">
                    The Invoice That Gets
                    <br />
                    You Ungated
                  </div>
                </div>

                {/* Sky blue Amazon smile mark at bottom */}
                <div className="pt-4 flex justify-start">
                  <svg
                    className="w-18 h-4.5 text-[#29ABE2]"
                    viewBox="0 0 38 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 9.5C11.5 16 23.5 16.5 32.5 9"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M26.5 6C29 7 32 8 33.5 8.5C32.5 10.5 31 13 30 15"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Document 1: Invoice Compliance Checklist (tilted in front/beside) */}
              <div
                className="absolute z-20 -right-2 sm:right-2 bottom-3 sm:bottom-5 w-44 sm:w-52 bg-white rounded-xl p-4 shadow-xl border border-slate-200/90 transform rotate-4 hover:rotate-2 transition-transform duration-300 cursor-pointer"
                onClick={() => setShowChecklistModal(true)}
                title="Click to preview checklist"
              >
                <div className="text-[11px] font-bold text-[#0C1938] leading-tight mb-2.5">
                  Invoice Compliance Checklist
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-600">
                    <div className="w-2.5 h-2.5 rounded-[2px] border border-[#0284C7] flex items-center justify-center shrink-0">
                      <Check className="w-2 h-2 text-[#0284C7] stroke-[3]" />
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-600">
                    <div className="w-2.5 h-2.5 rounded-[2px] border border-[#0284C7] flex items-center justify-center shrink-0">
                      <Check className="w-2 h-2 text-[#0284C7] stroke-[3]" />
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded w-4/5"></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-600">
                    <div className="w-2.5 h-2.5 rounded-[2px] border border-slate-300 shrink-0"></div>
                    <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-600">
                    <div className="w-2.5 h-2.5 rounded-[2px] border border-slate-300 shrink-0"></div>
                    <div className="h-1.5 bg-slate-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-600">
                    <div className="w-2.5 h-2.5 rounded-[2px] border border-slate-300 shrink-0"></div>
                    <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>

              {/* Document 2: Distributor Outreach Template (stacked behind) */}
              <div
                className="absolute z-0 right-10 sm:right-16 top-5 sm:top-7 w-38 sm:w-44 bg-white/95 rounded-xl p-3.5 shadow-lg border border-slate-200/80 transform rotate-8 cursor-pointer hover:rotate-6 transition-transform"
                onClick={() => setShowEmailTemplateModal(true)}
                title="Click to preview email template"
              >
                <div className="text-[10px] font-bold text-[#0C1938] mb-2">
                  Distributor Outreach Template
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-3/4"></div>
                </div>
              </div>

              {/* Document 3: Rejection Fix Table (top right tilted) */}
              <div
                className="absolute z-5 -right-6 sm:-right-4 top-14 sm:top-18 w-36 sm:w-42 bg-white rounded-xl p-3 shadow-md border border-slate-200/80 transform rotate-14 hidden sm:block cursor-pointer hover:rotate-12 transition-transform"
                onClick={() => setShowSpreadsheetModal(true)}
                title="Click to preview rejection fix table"
              >
                <div className="text-[9px] font-bold text-[#0C1938] mb-1.5">
                  Rejection Fix Table
                </div>
                <div className="h-2 bg-[#29ABE2]/30 rounded mb-1"></div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-1 bg-slate-200 rounded"></div>
                  <div className="h-1 bg-slate-200 rounded"></div>
                  <div className="h-1 bg-slate-200 rounded"></div>
                  <div className="h-1 bg-slate-200 rounded"></div>
                  <div className="h-1 bg-slate-200 rounded"></div>
                  <div className="h-1 bg-slate-200 rounded"></div>
                  <div className="h-1 bg-slate-200 rounded"></div>
                  <div className="h-1 bg-slate-200 rounded"></div>
                  <div className="h-1 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- PAIN POINTS BANNER (CUSTOMER WORDS) ----------------- */}
      <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-2 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4 hover:border-sky-300 transition-colors">
            <div className="w-11 h-11 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <p className="text-slate-800 text-[13.5px] font-medium leading-snug">
              “I did everything right and I'm still stuck.”
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4 hover:border-sky-300 transition-colors">
            <div className="w-11 h-11 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <p className="text-slate-800 text-[13.5px] font-medium leading-snug">
              “What invoice does Amazon actually want?”
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4 hover:border-sky-300 transition-colors">
            <div className="w-11 h-11 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <span className="font-extrabold text-base leading-none">®</span>
            </div>
            <p className="text-slate-800 text-[13.5px] font-medium leading-snug">
              “Do I need a trademark to sell products from Alibaba under my own name?”
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4 hover:border-sky-300 transition-colors">
            <div className="w-11 h-11 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <Store className="w-5 h-5 stroke-[2.2]" />
            </div>
            <p className="text-slate-800 text-[13.5px] font-medium leading-snug">
              “Do I buy something from a retail store to get an invoice?”
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- WHAT'S INSIDE SECTION ----------------- */}
      <section id="whats-inside" className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-10 mb-20 scroll-mt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1938] tracking-tight mb-2">
              What’s Inside
            </h2>
            <p className="text-slate-600 text-lg">
              Everything you need to stop guessing and start getting approved.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-[#0C1938] shadow-xs'
                  : 'hover:text-[#0C1938]'
              }`}
            >
              All Items (5)
            </button>
            <button
              onClick={() => setActiveCategory('templates')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'templates'
                  ? 'bg-white text-[#0284C7] shadow-xs'
                  : 'hover:text-[#0C1938]'
              }`}
            >
              Templates (2)
            </button>
            <button
              onClick={() => setActiveCategory('guides')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'guides'
                  ? 'bg-white text-[#0284C7] shadow-xs'
                  : 'hover:text-[#0C1938]'
              }`}
            >
              Guides (2)
            </button>
            <button
              onClick={() => setActiveCategory('spreadsheets')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'spreadsheets'
                  ? 'bg-white text-[#0284C7] shadow-xs'
                  : 'hover:text-[#0C1938]'
              }`}
            >
              Spreadsheets (1)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: The 5 concrete bullet items with interactive previews */}
          <div className="lg:col-span-6 space-y-6">
            {/* Item 1 - Guide */}
            <div
              id="guides"
              className={`p-3 rounded-2xl transition-all scroll-mt-24 ${
                activeCategory === 'guides' || activeCategory === 'all'
                  ? 'opacity-100'
                  : 'opacity-40'
              } ${activeCategory === 'guides' ? 'bg-sky-50/60 border border-sky-200' : ''}`}
            >
              <div className="flex items-start gap-3.5 group">
                <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-[#0C1938] leading-snug">
                      Restriction decision tree
                    </h3>
                    <span className="text-[10px] font-semibold tracking-wide text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      GUIDE
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Tells you if it's category, brand, ASIN, or account-level.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 2 - Guide */}
            <div
              className={`p-3 rounded-2xl transition-all ${
                activeCategory === 'guides' || activeCategory === 'all'
                  ? 'opacity-100'
                  : 'opacity-40'
              } ${activeCategory === 'guides' ? 'bg-sky-50/60 border border-sky-200' : ''}`}
            >
              <div className="flex items-start gap-3.5 group">
                <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-[#0C1938] leading-snug">
                      Reseller vs private-label guide
                    </h3>
                    <button
                      onClick={() => setShowGuideModal(true)}
                      className="text-[10px] font-semibold text-[#0284C7] hover:underline cursor-pointer"
                    >
                      Preview Guide →
                    </button>
                  </div>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Answers the trademark question.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 3 - Template */}
            <div
              id="templates"
              className={`p-3 rounded-2xl transition-all scroll-mt-24 ${
                activeCategory === 'templates' || activeCategory === 'all'
                  ? 'opacity-100'
                  : 'opacity-40'
              } ${activeCategory === 'templates' ? 'bg-sky-50/60 border border-sky-200' : ''}`}
            >
              <div className="flex items-start gap-3.5 group">
                <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-[#0C1938] leading-snug">
                      Distributor outreach email
                    </h3>
                    <button
                      onClick={() => setShowEmailTemplateModal(true)}
                      className="text-[10px] font-semibold text-[#0284C7] hover:underline cursor-pointer"
                    >
                      Preview Email Template →
                    </button>
                  </div>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Ready to send to open a wholesale account.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 4 - Template */}
            <div
              className={`p-3 rounded-2xl transition-all ${
                activeCategory === 'templates' || activeCategory === 'all'
                  ? 'opacity-100'
                  : 'opacity-40'
              } ${activeCategory === 'templates' ? 'bg-sky-50/60 border border-sky-200' : ''}`}
            >
              <div className="flex items-start gap-3.5 group">
                <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-[#0C1938] leading-snug">
                      Invoice compliance checklist
                    </h3>
                    <button
                      onClick={() => setShowChecklistModal(true)}
                      className="text-[10px] font-semibold text-[#0284C7] hover:underline cursor-pointer"
                    >
                      Preview Checklist →
                    </button>
                  </div>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Pass/fail test before you submit.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 5 - Spreadsheet */}
            <div
              id="spreadsheets"
              className={`p-3 rounded-2xl transition-all scroll-mt-24 ${
                activeCategory === 'spreadsheets' || activeCategory === 'all'
                  ? 'opacity-100'
                  : 'opacity-40'
              } ${activeCategory === 'spreadsheets' ? 'bg-sky-50/60 border border-sky-200' : ''}`}
            >
              <div className="flex items-start gap-3.5 group">
                <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-[#0C1938] leading-snug">
                      Rejection fix table + tracker spreadsheet
                    </h3>
                    <button
                      onClick={() => setShowSpreadsheetModal(true)}
                      className="text-[10px] font-semibold text-[#0284C7] hover:underline cursor-pointer"
                    >
                      Preview Spreadsheet →
                    </button>
                  </div>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Fix one thing and resubmit, then repeat for every new category.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tablet Mockup with Restriction Decision Tree */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-6 lg:pt-0">
            {/* Organic Sky Blue Blob */}
            <div className="absolute w-84 h-84 sm:w-96 sm:h-96 bg-[#E0F4FC] rounded-full filter blur-xs -z-10"></div>

            {/* Playful Handwritten Note on top right with arrow curving down & pointing LEFT toward tablet */}
            <div className="absolute -top-12 right-2 sm:right-6 lg:-right-2 flex flex-col items-center pointer-events-none select-none z-20">
              <span className="font-handwriting text-2xl text-[#0C1938] rotate-3 font-bold leading-tight">
                Clear. Practical.
                <br />
                Actionable.
              </span>
              {/* Arrow curving down and pointing to the LEFT into the tablet */}
              <svg
                className="w-16 h-12 text-[#29ABE2] -translate-x-4 translate-y-1"
                viewBox="0 0 60 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Arc stroke starting near top right and sweeping down-left */}
                <path
                  d="M48 6C46 22 36 32 14 32"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                {/* Arrowhead pointing LEFT toward the tablet */}
                <path
                  d="M21 24L12 32L21 39"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Stacked sheets behind tablet */}
            <div className="absolute w-[310px] sm:w-[370px] h-[340px] sm:h-[400px] bg-white rounded-2xl border border-slate-200/80 shadow-md transform -rotate-4 -translate-x-3 -translate-y-2 pointer-events-none opacity-80"></div>
            <div className="absolute w-[310px] sm:w-[370px] h-[340px] sm:h-[400px] bg-white rounded-2xl border border-slate-200/80 shadow-md transform rotate-3 translate-x-3 translate-y-1 pointer-events-none opacity-90"></div>

            {/* Tablet Frame */}
            <div
              className="relative z-10 w-[320px] sm:w-[390px] bg-[#111827] rounded-[28px] p-3 sm:p-3.5 shadow-2xl border-4 border-slate-700/60"
              style={{
                boxShadow: '0 25px 50px -12px rgba(12, 25, 56, 0.28)',
              }}
            >
              {/* Tablet Camera Dot */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-500 rounded-full"></div>

              {/* Tablet Screen Container */}
              <div className="bg-white rounded-[20px] p-5 sm:p-6 text-slate-800 overflow-hidden">
                {/* Screen Header */}
                <div className="text-center mb-5">
                  <div className="text-sm sm:text-base font-extrabold text-[#0C1938]">
                    Restriction Decision Tree
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Find out what type of restriction you're facing.
                  </div>
                </div>

                {/* Central Root Box */}
                <div className="flex justify-center mb-4">
                  <div className="bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] text-xs font-bold px-4 py-2 rounded-lg shadow-xs text-center">
                    What are you restricted on?
                  </div>
                </div>

                {/* Connecting Lines Graphic */}
                <div className="flex justify-center mb-2">
                  <svg className="w-64 h-5 text-[#29ABE2]" viewBox="0 0 256 20" fill="none">
                    <path
                      d="M128 0V8M32 8H224M32 8V20M96 8V20M160 8V20M224 8V20"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* 4 Branch Options */}
                <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                  {(['Category', 'Brand', 'ASIN', 'Account'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveBranch(type)}
                      className={`text-center py-1.5 px-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        activeBranch === type
                          ? 'bg-[#0284C7] text-white shadow-xs scale-105'
                          : 'bg-[#F0F9FF] border border-sky-200 text-[#0369A1] hover:bg-sky-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Vertical arrows to steps */}
                <div className="grid grid-cols-4 gap-1.5 text-center text-[#29ABE2] text-xs font-bold mb-1">
                  <div>↓</div>
                  <div>↓</div>
                  <div>↓</div>
                  <div>↓</div>
                </div>

                {/* Action Boxes */}
                <div className="grid grid-cols-4 gap-1.5 mb-3">
                  <div
                    className={`p-1.5 rounded text-[8.5px] font-semibold text-center leading-tight transition-colors ${
                      activeBranch === 'Category'
                        ? 'bg-sky-100 text-sky-900 ring-1 ring-sky-400'
                        : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    Follow category steps
                  </div>
                  <div
                    className={`p-1.5 rounded text-[8.5px] font-semibold text-center leading-tight transition-colors ${
                      activeBranch === 'Brand'
                        ? 'bg-sky-100 text-sky-900 ring-1 ring-sky-400'
                        : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    Follow brand steps
                  </div>
                  <div
                    className={`p-1.5 rounded text-[8.5px] font-semibold text-center leading-tight transition-colors ${
                      activeBranch === 'ASIN'
                        ? 'bg-sky-100 text-sky-900 ring-1 ring-sky-400'
                        : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    Follow ASIN steps
                  </div>
                  <div
                    className={`p-1.5 rounded text-[8.5px] font-semibold text-center leading-tight transition-colors ${
                      activeBranch === 'Account'
                        ? 'bg-sky-100 text-sky-900 ring-1 ring-sky-400'
                        : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    Follow account steps
                  </div>
                </div>

                {/* Interactive branch detail preview */}
                <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-600">
                  <span className="font-bold text-[#0C1938]">
                    {activeBranch} Diagnosis:
                  </span>{' '}
                  {activeBranch === 'Category' &&
                    'Requires a wholesale invoice showing ≥ 10 units from a verifiable distributor.'}
                  {activeBranch === 'Brand' &&
                    'Requires direct brand letter of authorization (LOA) or Tier 1 distributor invoice.'}
                  {activeBranch === 'ASIN' &&
                    'Sub-tier gating (hazardous, IP alert, or listing gating). Invoice alone may not suffice.'}
                  {activeBranch === 'Account' &&
                    'Seller performance or verification hold. Invoices won’t fix this until account health clears.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- FREQUENTLY ASKED QUESTIONS SECTION ----------------- */}
      <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-10 mb-20">
        <div className="mb-10">
          <div className="w-8 h-1 bg-[#29ABE2] rounded-full mb-4"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1938] tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg">
            Quick answers to the most common concerns.
          </p>
        </div>

        {/* 3 FAQ Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FAQ 1 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div
                className="flex items-start justify-between gap-3 cursor-pointer select-none mb-3"
                onClick={() => toggleFaq(0)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <h3 className="text-base font-bold text-[#0C1938] leading-snug">
                    Does this guarantee I'll get ungated?
                  </h3>
                </div>
                <div className="text-slate-400 hover:text-slate-600 mt-1">
                  {openFaq[0] ? (
                    <Minus className="w-4 h-4 text-[#0284C7]" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </div>

              {openFaq[0] && (
                <p className="text-slate-600 text-[14px] leading-relaxed pl-10">
                  No. A good invoice supports your request, but Amazon decides, and account-level issues can't be fixed with paperwork. The toolkit shows you how to tell which one you have.
                </p>
              )}
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div
                className="flex items-start justify-between gap-3 cursor-pointer select-none mb-3"
                onClick={() => toggleFaq(1)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <h3 className="text-base font-bold text-[#0C1938] leading-snug">
                    Is this legit, or is it about fake or workaround invoices?
                  </h3>
                </div>
                <div className="text-slate-400 hover:text-slate-600 mt-1">
                  {openFaq[1] ? (
                    <Minus className="w-4 h-4 text-[#0284C7]" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </div>

              {openFaq[1] && (
                <p className="text-slate-600 text-[14px] leading-relaxed pl-10">
                  Legit only. Real purchases from real, verifiable suppliers. No altered documents, no retail receipts, no invoice vendors.
                </p>
              )}
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div
                className="flex items-start justify-between gap-3 cursor-pointer select-none mb-3"
                onClick={() => toggleFaq(2)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <h3 className="text-base font-bold text-[#0C1938] leading-snug">
                    Is this just another supplier list that'll be outdated in a month?
                  </h3>
                </div>
                <div className="text-slate-400 hover:text-slate-600 mt-1">
                  {openFaq[2] ? (
                    <Minus className="w-4 h-4 text-[#0284C7]" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </div>

              {openFaq[2] && (
                <p className="text-slate-600 text-[14px] leading-relaxed pl-10">
                  No. It's a framework and templates you reuse for every new category or brand, not a list of names that goes stale.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- BUY BUTTON & PRICING BANNER ----------------- */}
      <section className="w-full bg-[#071325] text-white py-12 px-6 sm:px-8 relative overflow-hidden mb-20 shadow-xl">
        {/* Subtle background abstract curves */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
            <path
              d="M0 200C100 120 250 80 400 0"
              stroke="#38BDF8"
              strokeWidth="2"
            />
            <path
              d="M50 200C150 140 280 110 400 40"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          {/* Left Pricing Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-1 bg-[#38BDF8] rounded-full"></span>
              <span className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase">
                GET STARTED TODAY
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl sm:text-3xl font-medium text-slate-400 line-through">
                $30.75
              </span>
              <span className="bg-[#0284C7] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                35% OFF
              </span>
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                $19.99
              </span>
            </div>
          </div>

          {/* Right CTA Button & Legal Line */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#0284C7] hover:bg-[#0369A1] active:scale-[0.98] transition-all text-white font-semibold text-base sm:text-lg py-4 px-8 rounded-full shadow-lg flex items-center justify-center gap-3 cursor-pointer group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Get the Amazon Ungating Toolkit →</span>
            </a>
            <p className="text-slate-400 text-xs mt-3 text-center lg:text-right font-normal">
              Educational templates and workflows. Not legal advice, and no guarantee of Amazon approval.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- FREE SAMPLE OPT-IN SECTION ----------------- */}
      <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-6 mb-24">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Mini Document Illustration */}
          <div className="lg:col-span-4 flex items-center justify-center relative">
            {/* Playful Doodled Sparks & Arrow */}
            <div className="absolute -top-4 -right-2 text-[#29ABE2] select-none pointer-events-none">
              <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <path d="M10 20L2 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M14 14L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 10L18 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div className="absolute -bottom-4 right-6 text-[#29ABE2] select-none pointer-events-none">
              <svg className="w-12 h-10 -rotate-12" viewBox="0 0 48 40" fill="none">
                <path
                  d="M40 5C32 20 20 28 8 26"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14 18L6 26L16 32"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Rendered miniature sheet */}
            <div
              onClick={() => setShowChecklistModal(true)}
              className="w-48 sm:w-56 bg-white rounded-xl p-4 shadow-lg border border-slate-200 transform -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer"
              title="Click to preview checklist"
            >
              <div className="text-xs font-bold text-[#0C1938] mb-2 leading-tight">
                Invoice Compliance Checklist
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-[2px] border border-[#0284C7] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#0284C7] stroke-[3]" />
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-[2px] border border-[#0284C7] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#0284C7] stroke-[3]" />
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-[2px] border border-slate-300 shrink-0"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-4/5"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-[2px] border border-slate-300 shrink-0"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-[2px] border border-slate-300 shrink-0"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-3/4"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-[2px] border border-slate-300 shrink-0"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Lead Capture Form */}
          <div className="lg:col-span-8">
            <div className="w-8 h-1 bg-[#29ABE2] rounded-full mb-3"></div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1938] tracking-tight mb-2">
              Get a Free Sample
            </h2>
            <p className="text-slate-600 text-base mb-6">
              The one-page Invoice Compliance Checklist, free in exchange for an email.
            </p>

            {optinSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-emerald-900">
                      Sample Checklist Ready!
                    </h4>
                    <p className="text-emerald-700 text-xs">
                      Sent to <span className="font-semibold">{email}</span>. You can also view or download it right now.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChecklistModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>View Checklist</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleOptinSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (optinError) setOptinError('');
                      }}
                      placeholder="Enter your email address"
                      className="w-full h-13 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 text-sm text-slate-900 placeholder:text-slate-400 bg-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-13 px-7 bg-[#0284C7] hover:bg-[#0369A1] active:scale-[0.99] transition-all text-white font-semibold rounded-xl text-sm whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Get Free Checklist</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {optinError && (
                  <p className="text-red-600 text-xs flex items-center gap-1.5 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {optinError}
                  </p>
                )}

                <div className="flex items-center gap-2 text-slate-500 text-xs pt-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Your email is safe. No spam. Unsubscribe anytime.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ----------------- DISTRIBUTOR EMAIL TEMPLATE PREVIEW MODAL ----------------- */}
      {showEmailTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowEmailTemplateModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0C1938]">
                  Distributor Outreach Email Template
                </h3>
                <p className="text-xs text-slate-500">
                  Ready-to-send template to open a wholesale account without getting ghosted
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 font-mono text-xs text-slate-800 space-y-3 leading-relaxed whitespace-pre-wrap">
              {`Subject: Wholesale Account Application — [Your Company Name LLC]

Dear [Distributor/Sales Representative Name],

I hope this email finds you well.

My name is [Your Name], and I am the purchasing manager for [Your Business Legal Name, LLC], based in [City, State]. We operate a domestic retail distribution and e-commerce business specializing in [Your Niche / Target Product Category].

We are looking to expand our product offerings this quarter and would like to apply to open a wholesale purchasing account with [Supplier Company Name]. 

A few quick details about our business:
• Legal Entity: [Your Company Legal Name, LLC]
• Resale Certificate / Tax ID: [State Resale Certificate #]
• Federal EIN: [XX-XXXXXXX]
• Standard Initial Order Size: Opening orders typically range between $500 – $2,500 depending on minimum order quantities (MOQs).

Could you please send over your wholesale dealer application form, current product catalog with price sheet, and credit terms information?

Thank you for your time and assistance. We look forward to establishing a long-term purchasing relationship with your team.

Best regards,

[Your Name]
Purchasing Manager | [Your Company Legal Name, LLC]
[Phone Number] | [Professional Domain Email]
[Company Website URL]`}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={copyOutreachTemplate}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email Template</span>
                  </>
                )}
              </button>

              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold py-2.5 px-5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Get Full Toolkit ($19.99)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- RESELLER VS PRIVATE-LABEL GUIDE MODAL ----------------- */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0C1938]">
                  Reseller vs Private-Label Guide
                </h3>
                <p className="text-xs text-slate-500">
                  Straightforward answers to the trademark and Alibaba confusion
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-[#0C1938] mb-1.5 text-sm">
                  The #1 Misunderstanding: "Do I need a Trademark?"
                </h4>
                <p className="text-slate-600 mb-2">
                  <strong>NO</strong> — if you are wholesaling or reselling existing brand products on Amazon, you do <strong>not</strong> need a trademark or Brand Registry.
                </p>
                <p className="text-slate-600">
                  You are reselling already-approved products that already have valid UPCs and existing Amazon product listings (ASINs).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl">
                  <div className="font-bold text-[#0369A1] text-xs uppercase mb-1">
                    Path A: Wholesale Reselling
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    <li>• Source from licensed domestic distributors</li>
                    <li>• Sell existing brand catalog ASINs</li>
                    <li>• Invoice from verifiable supplier gets you ungated</li>
                    <li>• <strong>No trademark needed</strong></li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
                  <div className="font-bold text-amber-900 text-xs uppercase mb-1">
                    Path B: Private Label (Alibaba)
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    <li>• Manufacturing custom goods in China</li>
                    <li>• Selling under your own custom brand name</li>
                    <li>• Requires USPTO trademark for Brand Registry</li>
                    <li>• Alibaba invoice <strong>will not</strong> ungate top US brands</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <h4 className="font-bold text-[#0C1938] mb-1 text-xs">
                  Why Alibaba Invoices Get Rejected
                </h4>
                <p className="text-xs text-slate-600">
                  Amazon cross-references the supplier against known US distributor databases. Overseas factory receipts from Alibaba do not satisfy brand or category ungating requirements for established brand names.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Included in full in the Amazon Ungating Toolkit.
              </span>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold py-2.5 px-5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Get Full Toolkit ($19.99)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- REJECTION FIX TABLE & SPREADSHEET PREVIEW MODAL ----------------- */}
      {showSpreadsheetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowSpreadsheetModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                <Table className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0C1938]">
                  Rejection Fix Table & Tracker Spreadsheet
                </h3>
                <p className="text-xs text-slate-500">
                  Pre-configured matrix of Amazon rejection phrases, real root causes, and exact fixes
                </p>
              </div>
            </div>

            {/* Table Matrix Preview */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl mb-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-[#0C1938] font-bold border-b border-slate-200">
                    <th className="p-3">Amazon Rejection Notice</th>
                    <th className="p-3">Real Root Cause</th>
                    <th className="p-3">The Exact Fix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-800">
                      "We could not verify the supplier"
                    </td>
                    <td className="p-3">
                      Supplier phone not answering or no commercial directory record.
                    </td>
                    <td className="p-3 text-sky-700 font-medium">
                      Provide distributor's public wholesale portal link + physical Dun & Bradstreet address.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-800">
                      "Invoice does not meet volume requirements"
                    </td>
                    <td className="p-3">
                      Fewer than 10 units shown, or combined line items didn't match ASIN category.
                    </td>
                    <td className="p-3 text-sky-700 font-medium">
                      Submit single order showing minimum 10 identical or direct variant units.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-800">
                      "Name and address do not match"
                    </td>
                    <td className="p-3">
                      Discrepancy between invoice "Bill To" and Seller Central "Legal Entity".
                    </td>
                    <td className="p-3 text-sky-700 font-medium">
                      Request revised invoice from distributor with 100% exact character-for-character match.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-xs text-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-sky-900">Includes CSV / Google Sheets Tracker:</span>
                <span className="text-slate-600 block mt-0.5">
                  Pre-built tracker columns for Application Date, Brand/Category, Supplier Contact, Units, Case ID, and Status.
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Ready to duplicate in Excel, Google Sheets, or Numbers.
              </span>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold py-2.5 px-5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Get Full Toolkit ($19.99)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- CHECKOUT / GUMROAD MODAL ----------------- */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284C7] flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0C1938]">
                  Get The Amazon Ungating Toolkit
                </h3>
                <p className="text-xs text-slate-500">Instant digital access package</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 text-sm">
                <span className="font-semibold text-slate-800">
                  Amazon Ungating Toolkit (Full System)
                </span>
                <span className="font-extrabold text-[#0C1938]">$19.99</span>
              </div>
              <div className="pt-3 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Restriction Decision Tree (interactive + printable)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Reseller vs Private-Label Guide</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Distributor Outreach Email Copy Template</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>1-Page Invoice Compliance Checklist</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Rejection Fix Table & Tracker Spreadsheet</span>
                </div>
              </div>
            </div>

            {/* Gumroad URL Configuration Option */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-600">Product Checkout URL:</span>
                <button
                  type="button"
                  onClick={() => setIsEditingLink(!isEditingLink)}
                  className="text-[#0284C7] hover:underline cursor-pointer"
                >
                  {isEditingLink ? 'Done' : 'Customize Link'}
                </button>
              </div>

              {isEditingLink ? (
                <input
                  type="url"
                  value={checkoutUrl}
                  onChange={(e) => setCheckoutUrl(e.target.value)}
                  placeholder="https://whop.com/niche-product-e25e/amazon-ungating-toolkit/"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:outline-none"
                />
              ) : (
                <div className="text-xs text-slate-500 font-mono truncate bg-slate-100 p-2 rounded-lg">
                  {checkoutUrl}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm shadow-md"
              >
                <span>Continue to Checkout ($19.99)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setShowCheckoutModal(false)}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- CHECKLIST SAMPLE PREVIEW MODAL ----------------- */}
      {showChecklistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowChecklistModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0C1938]">
                  One-Page Invoice Compliance Checklist
                </h3>
                <p className="text-xs text-slate-500">
                  Pass/fail test before submitting your invoice to Amazon Seller Central
                </p>
              </div>
            </div>

            {/* Interactive Checklist Preview */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-xl">
                <h4 className="font-bold text-[#0369A1] mb-1">1. Supplier Information (Verifiable)</h4>
                <ul className="space-y-1.5 pl-1 text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Supplier legal business name clearly shown
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Supplier physical address matches public directory / business registry
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Active working phone number and website domain
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                <h4 className="font-bold text-[#0C1938] mb-1">2. Buyer Information (Exact Match)</h4>
                <ul className="space-y-1.5 pl-1 text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Your legal business name exactly matches Seller Central legal entity
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Your business address matches the official business address in Seller Central
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                <h4 className="font-bold text-[#0C1938] mb-1">3. Item Specifications & Quantities</h4>
                <ul className="space-y-1.5 pl-1 text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    At least 10 units purchased across matching products
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Product model number, UPC, or title recognizable against the target ASIN
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Invoice dated within the last 180 days
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                <h4 className="font-bold text-amber-900 mb-1">4. Red Flags (Immediate Auto-Reject)</h4>
                <ul className="space-y-1 pl-1 text-amber-800 text-xs">
                  <li>• Retail store receipts (Target, Walmart, Costco receipts are NOT invoices)</li>
                  <li>• Order confirmations, Pro-forma invoices, or quote estimates</li>
                  <li>• Altered, photoshopped, or obscured text</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Included as part of the Amazon Ungating Toolkit.
              </span>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold py-2.5 px-5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Get Full Toolkit ($19.99)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
