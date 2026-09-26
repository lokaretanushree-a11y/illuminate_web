import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  QrCode,
} from 'lucide-react';
import {
  supabase,
  isSupabaseConfigured,
  generateUUID,
  type Registration,
} from '../lib/supabase';

/**
 * Optional UPI ID display.
 * If provided and not the placeholder, a quick copy button will be rendered.
 */
export const UPI_ID = 'illuminate@okaxis';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  year: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  college?: string;
  year?: string;
  general?: string;
}

type ModalStep = 'form' | 'payment' | 'confirmation';

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<ModalStep>('form');
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    year: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedRegistrationId, setSavedRegistrationId] = useState<string | null>(null);

  // Payment step state
  const [transactionId, setTransactionId] = useState('');
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [submittedTxId, setSubmittedTxId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [hasQrImage, setHasQrImage] = useState<boolean>(false);

  // Automatically check if /assets/payment-qr.png exists
  useEffect(() => {
    let isMounted = true;
    const testImg = new Image();
    testImg.src = '/assets/payment-qr.png';
    testImg.onload = () => {
      if (isMounted) setHasQrImage(true);
    };
    testImg.onerror = () => {
      if (isMounted) setHasQrImage(false);
    };
    return () => {
      isMounted = false;
    };
  }, [step, isOpen]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSaving && !isSubmittingPayment) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSaving, isSubmittingPayment]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your complete name';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (Indian 10-digit format)
    const rawPhone = formData.phone.trim();
    const digitsOnly = rawPhone.replace(/\D/g, '');
    const standardIndianPhone = digitsOnly.length === 12 && digitsOnly.startsWith('91')
      ? digitsOnly.slice(2)
      : digitsOnly.length === 11 && digitsOnly.startsWith('0')
      ? digitsOnly.slice(1)
      : digitsOnly;

    if (!rawPhone) {
      newErrors.phone = 'Phone number is required';
    } else if (standardIndianPhone.length !== 10 || !/^[6-9]\d{9}$/.test(standardIndianPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    // College validation
    if (!formData.college.trim()) {
      newErrors.college = 'College name is required';
    } else if (formData.college.trim().length < 2) {
      newErrors.college = 'Please enter your college name';
    }

    // Year validation
    if (!formData.year.trim()) {
      newErrors.year = 'Year of study is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || errors.general) {
      setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    }
  };

  // STEP 1 SUBMISSION -> SUPABASE
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    setErrors({});

    const normalizedEmail = formData.email.trim().toLowerCase();
    const rawPhone = formData.phone.trim().replace(/\D/g, '');
    const normalizedPhone =
      rawPhone.length === 12 && rawPhone.startsWith('91')
        ? rawPhone.slice(2)
        : rawPhone.length === 11 && rawPhone.startsWith('0')
        ? rawPhone.slice(1)
        : rawPhone;

    const registrationId = generateUUID();

    try {
      // 1. Insert into public.registrations with payment_status: 'pending'
      const payload = {
        id: registrationId,
        full_name: formData.fullName.trim(),
        email: normalizedEmail,
        phone: normalizedPhone,
        college: formData.college.trim(),
        year: formData.year.trim(),
        payment_status: 'pending' as const,
      };

      if (isSupabaseConfigured) {
        // Direct INSERT without .select() so restricted RLS SELECT policy is not evaluated
        const { error } = await supabase
          .from('registrations')
          .insert([payload]);

        if (error) {
          console.error('[Supabase Registration Error]', error);
          setIsSaving(false);
          // Check for duplicate key / unique constraint error (Postgres 23505)
          if (
            error.code === '23505' ||
            error.message?.toLowerCase().includes('duplicate') ||
            error.message?.toLowerCase().includes('unique')
          ) {
            setErrors({
              general:
                'You are already registered for Illuminate Workshop. Contact the event team if you need assistance.',
            });
            return;
          }
          setErrors({
            general:
              'Registration could not be submitted. Please check your connection and try again.',
          });
          return;
        }

        setSavedRegistrationId(registrationId);
      } else {
        // Fallback for local preview / mock ID
        setSavedRegistrationId(registrationId);
      }

      // Transition smoothly to payment step without page reload
      setIsSaving(false);
      setStep('payment');
    } catch (err) {
      console.error('[Supabase Registration Exception]', err);
      setIsSaving(false);
      setErrors({
        general:
          'Registration could not be submitted. Please check your connection and try again.',
      });
    }
  };

  // STEP 2 SUBMISSION -> UPDATE SUPABASE
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTx = transactionId.trim();

    if (!cleanTx) {
      setTransactionError('Please enter your UPI transaction / reference ID');
      return;
    }
    if (cleanTx.length < 6) {
      setTransactionError('Please enter a valid UPI transaction ID (e.g. 12-digit UTR)');
      return;
    }

    setTransactionError(null);
    setIsSubmittingPayment(true);

    try {
      if (isSupabaseConfigured && savedRegistrationId) {
        const { error } = await supabase
          .from('registrations')
          .update({
            payment_reference: cleanTx,
            payment_status: 'submitted',
            updated_at: new Date().toISOString(),
          })
          .eq('id', savedRegistrationId);

        if (error) {
          console.error('[Supabase Payment Reference Error]', error);
          setIsSubmittingPayment(false);
          setTransactionError(
            'Payment reference could not be submitted. Please check your connection and try again.'
          );
          return;
        }
      }

      setSubmittedTxId(cleanTx);
      setIsSubmittingPayment(false);
      setStep('confirmation');
    } catch (err) {
      console.error('[Supabase Payment Exception]', err);
      setIsSubmittingPayment(false);
      setTransactionError(
        'Payment reference could not be submitted. Please check your connection and try again.'
      );
    }
  };

  const handleClose = () => {
    setStep('form');
    setErrors({});
    setTransactionError(null);
    setIsSaving(false);
    setIsSubmittingPayment(false);
    onClose();
  };

  const handleCopyUpi = () => {
    if (navigator.clipboard && UPI_ID) {
      navigator.clipboard.writeText(UPI_ID);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  const showUpiRow = Boolean(UPI_ID && UPI_ID.trim() !== '');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop with blur & darken */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={!isSaving && !isSubmittingPayment ? handleClose : undefined}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[540px] my-auto rounded-[2rem] bg-[#120924] border border-white/15 p-6 sm:p-8 md:p-9 text-white shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto z-10 select-none"
          >
            {/* Top ambient gold accent glow */}
            <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#FFD21C]/10 rounded-full blur-[70px] pointer-events-none" />

            {/* Close X Button */}
            <button
              onClick={handleClose}
              disabled={isSaving || isSubmittingPayment}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ========================================================= */}
            {/* STEP 1: REGISTRATION DETAILS FORM                         */}
            {/* ========================================================= */}
            {step === 'form' && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFD21C]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>WORKSHOP REGISTRATION</span>
                  </div>

                  <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none">
                    ILLUMINATE
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C5B8D8]/80 mt-1">
                    DELEGATE REGISTRATION
                  </div>
                </div>

                {/* Duplicate / General Alert */}
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-200 leading-relaxed flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>{errors.general}</div>
                  </motion.div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  {/* FULL NAME */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5B8D8] mb-1.5">
                      Full Name <span className="text-[#FFD21C]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      value={formData.fullName}
                      disabled={isSaving}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                        errors.fullName ? 'border-red-500' : 'border-white/15 focus:border-[#FFD21C]'
                      } text-white placeholder-white/25 text-sm outline-none transition-colors disabled:opacity-50`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5B8D8] mb-1.5">
                      Email Address <span className="text-[#FFD21C]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="aarav.sharma@example.com"
                      value={formData.email}
                      disabled={isSaving}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                        errors.email ? 'border-red-500' : 'border-white/15 focus:border-[#FFD21C]'
                      } text-white placeholder-white/25 text-sm outline-none transition-colors disabled:opacity-50`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* PHONE NUMBER */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5B8D8] mb-1.5">
                      Phone Number <span className="text-[#FFD21C]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phone}
                      disabled={isSaving}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                        errors.phone ? 'border-red-500' : 'border-white/15 focus:border-[#FFD21C]'
                      } text-white placeholder-white/25 text-sm outline-none transition-colors disabled:opacity-50`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* COLLEGE / INSTITUTION */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5B8D8] mb-1.5">
                      College Name <span className="text-[#FFD21C]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fr. CRCE, Bandra"
                      value={formData.college}
                      disabled={isSaving}
                      onChange={(e) => handleInputChange('college', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                        errors.college ? 'border-red-500' : 'border-white/15 focus:border-[#FFD21C]'
                      } text-white placeholder-white/25 text-sm outline-none transition-colors disabled:opacity-50`}
                    />
                    {errors.college && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.college}
                      </p>
                    )}
                  </div>

                  {/* YEAR OF STUDY */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5B8D8] mb-1.5">
                      Year of Study <span className="text-[#FFD21C]">*</span>
                    </label>
                    <select
                      value={formData.year}
                      disabled={isSaving}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-[#180d30] border ${
                        errors.year ? 'border-red-500' : 'border-white/15 focus:border-[#FFD21C]'
                      } text-white text-sm outline-none transition-colors cursor-pointer disabled:opacity-50`}
                    >
                      <option value="" disabled className="bg-[#120924] text-white/40">
                        Select Year of Study
                      </option>
                      <option value="1st Year" className="bg-[#120924] text-white">
                        1st Year
                      </option>
                      <option value="2nd Year" className="bg-[#120924] text-white">
                        2nd Year
                      </option>
                      <option value="3rd Year" className="bg-[#120924] text-white">
                        3rd Year
                      </option>
                      <option value="4th Year" className="bg-[#120924] text-white">
                        4th Year
                      </option>
                      <option value="Postgraduate / Other" className="bg-[#120924] text-white">
                        Postgraduate / Other
                      </option>
                    </select>
                    {errors.year && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.year}
                      </p>
                    )}
                  </div>

                  {/* Registration Fee Summary */}
                  <div className="pt-2 pb-1">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-[#C5B8D8]/70">
                          Registration Fee
                        </div>
                        <div className="text-[11px] text-[#C5B8D8]/50">
                          All-Access Pass (E-Cell IIT Bombay certified)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bebas text-2xl text-[#FFD21C] leading-none">
                          ₹349
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full py-4 rounded-xl bg-[#FFD21C] hover:bg-[#ffe066] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,210,28,0.45)] hover:shadow-[0_0_35px_rgba(255,210,28,0.7)] transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] mt-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Saving registration...</span>
                      </>
                    ) : (
                      <>
                        <span>PROCEED TO PAYMENT</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================= */}
            {/* STEP 2: PAYMENT MODAL (Complete Your Registration)        */}
            {/* ========================================================= */}
            {step === 'payment' && (
              <div className="text-center">
                {/* Title */}
                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none mb-2">
                  Complete Your Registration
                </h3>

                {/* Registration Fee Highlight */}
                <div className="my-4 p-3 rounded-2xl bg-white/[0.03] border border-white/10 max-w-xs mx-auto flex items-center justify-around">
                  <div className="text-left">
                    <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C5B8D8]/70">
                      REGISTRATION FEE
                    </div>
                    <div className="text-[10px] text-white/40">Illuminate All-Access Pass</div>
                  </div>
                  <div className="font-bebas text-3xl text-[#FFD21C] leading-none">
                    ₹349
                  </div>
                </div>

                {/* QR Code Section: Real QR code or Clean Premium Placeholder */}
                {hasQrImage ? (
                  <div className="inline-block p-4 sm:p-5 rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/20 my-2">
                    <img
                      src="/assets/payment-qr.png"
                      alt="Scan UPI QR Code to pay ₹349"
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg mx-auto"
                      onError={() => setHasQrImage(false)}
                    />
                  </div>
                ) : (
                  <div className="w-52 h-52 sm:w-56 sm:h-56 mx-auto rounded-2xl bg-white/[0.03] border-2 border-dashed border-[#FFD21C]/35 backdrop-blur-md flex flex-col items-center justify-center p-5 my-2 shadow-[0_0_35px_rgba(255,210,28,0.08)]">
                    <div className="w-12 h-12 rounded-xl bg-[#FFD21C]/10 border border-[#FFD21C]/25 flex items-center justify-center mb-3 text-[#FFD21C]">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div className="font-bebas text-2xl sm:text-3xl text-[#FFD21C] tracking-wider leading-none mb-1.5">
                      PAYMENT QR
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#C5B8D8]/80 text-center">
                      QR CODE WILL BE ADDED
                    </div>
                  </div>
                )}

                {/* Configurable UPI ID Row */}
                {showUpiRow && (
                  <div className="mt-2 mb-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#C5B8D8]">
                      <span className="text-[#C5B8D8]/60">UPI ID:</span>
                      <span className="text-white font-bold">{UPI_ID}</span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="ml-1 text-[#FFD21C] hover:text-white transition-colors cursor-pointer"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <p className="text-xs sm:text-sm text-white/90 max-w-sm mx-auto leading-relaxed mt-2 font-medium">
                  Scan the QR code using any UPI app to pay ₹349.
                </p>
                <p className="text-[11px] sm:text-xs text-[#C5B8D8]/70 max-w-sm mx-auto leading-relaxed mt-1 mb-5">
                  After payment, enter your UPI transaction/reference ID.
                </p>

                {/* Form to submit transaction ID */}
                <form onSubmit={handlePaymentSubmit} className="space-y-4 max-w-sm mx-auto text-left">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5B8D8] mb-1.5">
                      UPI Transaction ID <span className="text-[#FFD21C]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 423985729104 or UPI Ref No."
                      value={transactionId}
                      disabled={isSubmittingPayment}
                      onChange={(e) => {
                        setTransactionId(e.target.value);
                        if (transactionError) setTransactionError(null);
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                        transactionError ? 'border-red-500' : 'border-white/15 focus:border-[#FFD21C]'
                      } text-white placeholder-white/25 text-sm outline-none transition-colors disabled:opacity-50`}
                    />
                    {transactionError && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {transactionError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingPayment}
                    className="w-full py-4 rounded-xl bg-[#FFD21C] hover:bg-[#ffe066] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,210,28,0.45)] hover:shadow-[0_0_35px_rgba(255,210,28,0.7)] transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmittingPayment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Submitting payment...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 text-black" />
                        <span>SUBMIT PAYMENT</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================= */}
            {/* STEP 3: SUCCESS SCREEN (Registration Submitted)            */}
            {/* ========================================================= */}
            {step === 'confirmation' && (
              <div className="text-center py-3">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="w-16 h-16 rounded-full bg-[#FFD21C]/15 border border-[#FFD21C]/40 flex items-center justify-center mx-auto mb-4 text-[#FFD21C] shadow-[0_0_30px_rgba(255,210,28,0.35)]"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>REGISTRATION SUBMITTED</span>
                </div>

                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none mb-2">
                  Thank you, {formData.fullName}.
                </h3>

                <p className="text-xs sm:text-sm text-[#C5B8D8] leading-relaxed max-w-sm mx-auto mb-6">
                  Your registration details and payment reference have been received.
                </p>

                {/* Status and Details Card */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left max-w-sm mx-auto mb-6 text-xs text-[#C5B8D8] space-y-2.5">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/60">Registration ID:</span>
                    <span className="font-mono text-white font-bold text-xs sm:text-sm tracking-wide">
                      {savedRegistrationId || 'N/A'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/60">Payment Status:</span>
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Submitted
                    </span>
                  </div>

                  {submittedTxId && (
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-white/60">UPI Ref / Txn ID:</span>
                      <span className="font-mono text-[#FFD21C] font-semibold text-xs truncate max-w-[180px]">
                        {submittedTxId}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Fee Amount:</span>
                    <span className="text-[#FFD21C] font-bold font-bebas text-lg leading-none">₹349</span>
                  </div>
                </div>

                {/* Note */}
                <p className="text-[11px] sm:text-xs text-[#C5B8D8]/70 max-w-sm mx-auto mb-7">
                  Keep your UPI transaction ID for your records.
                </p>

                {/* Done Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-4 rounded-xl bg-[#FFD21C] hover:bg-[#ffe066] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,210,28,0.45)] transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Done</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
