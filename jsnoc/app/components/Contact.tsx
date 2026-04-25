'use client';

import { Mail, Phone, Building2, Check, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/app/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    message: "",
    acceptedTerms: false,
    captchaInput: "",
  });
  
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate random CAPTCHA code
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaCode(result);
    drawCaptcha(result);
  };

  // Draw CAPTCHA on canvas with distortion
  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = 160;
    canvas.height = 50;
    
    // Background
    ctx.fillStyle = '#0A0F1C';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add border
    ctx.strokeStyle = 'rgba(30, 144, 255, 0.2)';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    // Draw noise (random dots)
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(30, 144, 255, ${Math.random() * 0.3})`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }
    
    // Draw random lines
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(30, 144, 255, ${Math.random() * 0.3})`;
      ctx.lineWidth = 1;
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
    
    // Draw the CAPTCHA text with distortion
    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const x = 20 + (i * 22);
      const y = 30 + (Math.random() * 6 - 3);
      const rotation = (Math.random() - 0.5) * 0.4;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.font = `bold ${20 + Math.random() * 4}px monospace`;
      ctx.fillStyle = '#1E90FF';
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  };

  // Refresh CAPTCHA
  const refreshCaptcha = () => {
    generateCaptcha();
    setCaptchaError("");
    setCaptchaValid(false);
    setFormData(prev => ({ ...prev, captchaInput: "" }));
  };

  // Validate CAPTCHA in real-time
  const validateCaptcha = (input: string) => {
    if (input.toLowerCase() === captchaCode.toLowerCase()) {
      setCaptchaValid(true);
      setCaptchaError("");
      return true;
    } else {
      setCaptchaValid(false);
      if (input.length > 0) {
        setCaptchaError("Code doesn't match");
      } else {
        setCaptchaError("");
      }
      return false;
    }
  };

  // Handle CAPTCHA input change
  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, captchaInput: value }));
    validateCaptcha(value);
  };

  // Initialize CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate terms
    if (!formData.acceptedTerms) {
      setSubmitStatus({ 
        type: 'error', 
        message: t('contact.form.acceptTermsError') || "Please accept the terms and conditions" 
      });
      return;
    }
    
    // Double-check CAPTCHA validation before submit
    if (!captchaValid) {
      setCaptchaError("Please enter the correct CAPTCHA code");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Send data to your API endpoint
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: formData.company,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          captchaInput: formData.captchaInput,
          captchaCode: captchaCode, // Send the current CAPTCHA code for server validation
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      // Reset form on success
      setFormData({
        company: "",
        name: "",
        phone: "",
        email: "",
        message: "",
        acceptedTerms: false,
        captchaInput: "",
      });
      
      setSubmitStatus({ 
        type: 'success', 
        message: t('contact.form.success') || "Message sent successfully! We'll get back to you soon." 
      });
      
      // Generate new CAPTCHA
      setCaptchaValid(false);
      refreshCaptcha();
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : (t('contact.form.error') || "Failed to send message. Please try again.") 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-gradient-to-br from-[#05080F] via-[#0A0F1C] to-[#05080F] font-jost py-16 lg:py-20 overflow-hidden"
    >
      {/* Top gradient overlay only */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT SIDE - Contact Info */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6F0FF] mb-4">
              {t('contact.title')}
            </h2>

            <p className="text-[#E6F0FF]/70 text-base leading-relaxed mb-10">
              {t('contact.description')}
            </p>

            <div className="space-y-8">

              {/* Company */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1E90FF]/10 rounded-lg flex items-center justify-center group-hover:bg-[#1E90FF]/20 transition-colors">
                  <Building2 className="text-[#1E90FF]" size={20} />
                </div>
                <div>
                  <p className="text-[#E6F0FF] text-lg font-semibold mb-1">{t('contact.company')}</p>
                  <p className="text-[#E6F0FF]/60 text-sm">
                    JS Network Operations
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1E90FF]/10 rounded-lg flex items-center justify-center group-hover:bg-[#1E90FF]/20 transition-colors">
                  <Phone className="text-[#1E90FF]" size={20} />
                </div>
                <div>
                  <p className="text-[#E6F0FF] text-lg font-semibold mb-1">{t('contact.phone')}</p>
                  <a href="tel:+821063992185" className="text-[#E6F0FF]/60 text-sm hover:text-[#1E90FF] transition-colors">
                    (+82) 10-6399-2185
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1E90FF]/10 rounded-lg flex items-center justify-center group-hover:bg-[#1E90FF]/20 transition-colors">
                  <Mail className="text-[#1E90FF]" size={20} />
                </div>
                <div>
                  <p className="text-[#E6F0FF] text-lg font-semibold mb-1">{t('contact.email')}</p>
                  <a href="mailto:inquiry@jsnoc.com" className="text-[#E6F0FF]/60 text-sm hover:text-[#1E90FF] transition-colors">
                    inquiry@jsnoc.com
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div>
            <p className="text-[#1E90FF] text-sm mb-4">
              {t('contact.form.helper')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Row 1 */}
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="company"
                  placeholder={t('contact.form.company')}
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-[#0A0F1C] border border-[#1E90FF]/10 rounded-lg px-4 py-2.5 text-sm text-[#E6F0FF] placeholder:text-[#E6F0FF]/40 outline-none focus:border-[#1E90FF]/50 focus:ring-1 focus:ring-[#1E90FF]/20 transition-all"
                />
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.form.name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-[#0A0F1C] border border-[#1E90FF]/10 rounded-lg px-4 py-2.5 text-sm text-[#E6F0FF] placeholder:text-[#E6F0FF]/40 outline-none focus:border-[#1E90FF]/50 focus:ring-1 focus:ring-[#1E90FF]/20 transition-all"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('contact.form.phone')}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-[#0A0F1C] border border-[#1E90FF]/10 rounded-lg px-4 py-2.5 text-sm text-[#E6F0FF] placeholder:text-[#E6F0FF]/40 outline-none focus:border-[#1E90FF]/50 focus:ring-1 focus:ring-[#1E90FF]/20 transition-all"
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder={t('contact.form.email')}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0F1C] border border-[#1E90FF]/10 rounded-lg px-4 py-2.5 text-sm text-[#E6F0FF] placeholder:text-[#E6F0FF]/40 outline-none focus:border-[#1E90FF]/50 focus:ring-1 focus:ring-[#1E90FF]/20 transition-all"
              />

              {/* Message */}
              <textarea
                name="message"
                placeholder={t('contact.form.message')}
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0F1C] border border-[#1E90FF]/10 rounded-lg px-4 py-2.5 text-sm text-[#E6F0FF] placeholder:text-[#E6F0FF]/40 outline-none focus:border-[#1E90FF]/50 focus:ring-1 focus:ring-[#1E90FF]/20 transition-all resize-none"
              />

              {/* Checkbox */}
              <label className="flex items-center gap-2 text-xs text-[#E6F0FF]/60 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleChange}
                  className="w-3.5 h-3.5 rounded border-[#1E90FF]/30 bg-[#0A0F1C] text-[#1E90FF] focus:ring-[#1E90FF]/20 focus:ring-offset-0"
                />
                <span>
                  {t('contact.form.terms')}
                </span>
              </label>

              {/* CAPTCHA with Real-time Validation */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Real Captcha Canvas */}
                  <div className="flex items-center gap-2 bg-[#0A0F1C] border border-[#1E90FF]/10 rounded-lg overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      className="cursor-pointer"
                      onClick={refreshCaptcha}
                      style={{ display: 'block' }}
                    />
                    <button 
                      type="button" 
                      onClick={refreshCaptcha}
                      className="text-[#E6F0FF]/50 hover:text-[#1E90FF] transition-colors text-sm px-3"
                      title="Refresh CAPTCHA"
                    >
                      ↻
                    </button>
                  </div>

                  {/* CAPTCHA Input with Validation Icon */}
                  <div className="relative">
                    <input
                      type="text"
                      name="captchaInput"
                      placeholder={t('contact.form.captcha')}
                      value={formData.captchaInput}
                      onChange={handleCaptchaChange}
                      className={`bg-[#0A0F1C] border rounded-lg px-3 py-2 w-32 outline-none text-sm text-[#E6F0FF] placeholder:text-[#E6F0FF]/40 focus:border-[#1E90FF]/50 transition-all pr-8 ${
                        captchaValid 
                          ? 'border-green-500 pr-8' 
                          : formData.captchaInput.length > 0 && !captchaValid
                          ? 'border-red-500'
                          : 'border-[#1E90FF]/10'
                      }`}
                    />
                    {/* Checkmark or X icon */}
                    {formData.captchaInput.length > 0 && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {captchaValid ? (
                          <Check className="text-green-500" size={16} />
                        ) : (
                          <X className="text-red-500" size={16} />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Button - Only enabled when CAPTCHA is valid */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !captchaValid || !formData.acceptedTerms}
                    className={`bg-[#1E90FF] text-white px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      !isSubmitting && captchaValid && formData.acceptedTerms
                        ? 'hover:bg-[#1E90FF]/80 hover:scale-105 cursor-pointer' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : t('contact.form.submit')}
                  </button>
                </div>
                
                {/* CAPTCHA Error Message */}
                {captchaError && formData.captchaInput.length > 0 && !captchaValid && (
                  <p className="text-red-500 text-xs">{captchaError}</p>
                )}
                
                {/* CAPTCHA Success Message */}
                {captchaValid && (
                  <p className="text-green-500 text-xs">✓ CAPTCHA verified!</p>
                )}
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <div className={`p-3 rounded-lg text-sm ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}>
                  {submitStatus.message}
                </div>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}