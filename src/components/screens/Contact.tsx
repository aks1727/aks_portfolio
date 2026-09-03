'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoPerson, IoMail, IoPaperPlaneOutline, IoCheckmarkCircle, IoAlertCircle, IoTerminal, IoHardwareChipOutline } from 'react-icons/io5';
import { submitContactForm } from '../../actions/contact';

interface ToastState {
  show: boolean;
  title: string;
  description: string;
  type: 'success' | 'error';
}

type TerminalStatus = 'idle' | 'typing' | 'validating' | 'dispatching_owner' | 'dispatching_sender' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    senderMail: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [terminalStatus, setTerminalStatus] = useState<TerminalStatus>('idle');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const [toast, setToast] = useState<ToastState>({
    show: false,
    title: '',
    description: '',
    type: 'success',
  });

  const showToast = (title: string, description: string, type: 'success' | 'error') => {
    setToast({ show: true, title, description, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (terminalStatus === 'idle' || terminalStatus === 'typing') {
      setTerminalStatus('typing');
      if (typingTimeout) clearTimeout(typingTimeout);

      const timeout = setTimeout(() => {
        setTerminalStatus('idle');
      }, 1800);
      setTypingTimeout(timeout);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTerminalStatus('validating');
    await new Promise((res) => setTimeout(res, 600));

    setTerminalStatus('dispatching_owner');
    await new Promise((res) => setTimeout(res, 700));

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setTerminalStatus('dispatching_sender');
        await new Promise((res) => setTimeout(res, 800));

        setTerminalStatus('success');
        showToast('Message Sent!', result.message, 'success');
        setFormData({ name: '', senderMail: '', subject: '', message: '' });
      } else {
        setTerminalStatus('error');
        showToast('Error', result.message, 'error');
      }
    } catch {
      setTerminalStatus('error');
      showToast('Error', 'Unable to send message. Please try again later.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen bg-transparent text-white flex flex-col justify-center items-center relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12"
    >
      {/* Toast Notification Overlay */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-8 right-6 z-50 rounded-2xl border backdrop-blur-2xl flex items-start gap-4 max-w-md p-5 sm:p-6 ${
              toast.type === 'success'
                ? 'bg-teal-950/95 border-teal-400/50 text-teal-100 shadow-[0_0_25px_rgba(45,212,191,0.3)]'
                : 'bg-rose-950/95 border-rose-400/50 text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.3)]'
            }`}
          >
            {toast.type === 'success' ? (
              <IoCheckmarkCircle className="text-teal-400 text-3xl shrink-0 mt-0.5" />
            ) : (
              <IoAlertCircle className="text-rose-400 text-3xl shrink-0 mt-0.5" />
            )}
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-base text-white tracking-wide">{toast.title}</h4>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">{toast.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl w-full mx-auto flex flex-col justify-center gap-8 sm:gap-10 lg:gap-12 my-auto">

        {/* Section Header */}
        <div className="text-center px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Montserrat_Alternates'] tracking-wide">
            Contact Me
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-teal-300/80 mt-2 font-medium">
            Have a question or want to work together? Leave a message below!
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12 xl:gap-14 w-full">

          {/* Left Side: Dynamic Live Terminal Process Monitor */}
          <div className="hidden lg:flex w-1/2 flex-col justify-center">
            <div 
              className={`border rounded-3xl backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden flex flex-col justify-between h-full transition-all duration-500 ${
                terminalStatus === 'error'
                  ? 'bg-rose-950/30 border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.15)]'
                  : terminalStatus === 'success'
                  ? 'bg-emerald-950/30 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                  : 'bg-slate-900/40 border-teal-500/25 hover:border-teal-400/40'
              }`}
            >
              
              {/* Terminal Title Bar */}
              <div className="bg-slate-950/60 border-b border-white/10 flex items-center justify-between px-6 py-3.5 sm:py-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-teal-300/80">
                  <IoTerminal className="text-teal-400" />
                  <span>dispatch.daemon.v1</span>
                </div>
              </div>

              {/* Terminal Screen Output */}
              <div className="flex flex-col gap-5 my-auto font-mono text-xs sm:text-sm p-6 sm:p-8 lg:p-9">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <span className="text-[11px] sm:text-xs text-teal-400 uppercase tracking-widest font-bold">Process Monitor</span>
                  <span className={`text-[10px] sm:text-xs px-2.5 py-1 rounded border font-bold ${
                    terminalStatus === 'error'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                      : terminalStatus === 'success'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                      : 'bg-teal-500/10 text-teal-300 border-teal-400/20'
                  }`}>
                    {terminalStatus === 'idle' && 'SYSTEM READY'}
                    {terminalStatus === 'typing' && 'RECEIVING INPUT'}
                    {terminalStatus === 'validating' && 'VALIDATING PAYLOAD'}
                    {terminalStatus === 'dispatching_owner' && 'DISPATCHING TO AKSHAT'}
                    {terminalStatus === 'dispatching_sender' && 'SENDING ACKNOWLEDGEMENT'}
                    {terminalStatus === 'success' && 'SYSTEM GREEN'}
                    {terminalStatus === 'error' && 'PROCESS FAILED'}
                  </span>
                </div>

                {/* Console Output Log Box */}
                <div className="bg-slate-950/80 border border-white/10 rounded-2xl flex flex-col gap-2.5 min-h-[180px] justify-center p-5 sm:p-6">
                  {terminalStatus === 'idle' && (
                    <>
                      <p className="text-slate-400">&gt; Listener active on Contact form</p>
                      <p className="text-teal-300">&gt; Awaiting user input from form...</p>
                      <div className="flex items-center gap-1 mt-2 text-slate-500 text-xs">
                        <span>Ready when you are</span>
                        <span className="w-1.5 h-3.5 bg-teal-400 animate-pulse inline-block ml-1" />
                      </div>
                    </>
                  )}

                  {terminalStatus === 'typing' && (
                    <>
                      <p className="text-amber-400/90">&gt; Keypress detected...</p>
                      <p className="text-teal-300">&gt; Buffering user payload into state...</p>
                      <div className="flex items-center gap-1 mt-2 text-amber-300/80 text-xs">
                        <span>Capture in progress</span>
                        <span className="w-1.5 h-3.5 bg-amber-400 animate-pulse inline-block ml-1" />
                      </div>
                    </>
                  )}

                  {terminalStatus === 'validating' && (
                    <>
                      <p className="text-teal-400">&gt; Form submission triggered</p>
                      <p className="text-amber-300">&gt; Sanitizing form data fields...</p>
                      <p className="text-slate-300">&gt; Initiating Next.js Server Action...</p>
                    </>
                  )}

                  {terminalStatus === 'dispatching_owner' && (
                    <>
                      <p className="text-teal-400">&gt; Transporter authenticated via SMTP</p>
                      <p className="text-amber-300">&gt; Dispatching notification to Akshat...</p>
                      <p className="text-slate-400">&gt; Target: Akshat Kumar Sinha</p>
                    </>
                  )}

                  {terminalStatus === 'dispatching_sender' && (
                    <>
                      <p className="text-emerald-400">&gt; Message delivered to Akshat successfully!</p>
                      <p className="text-amber-300">&gt; Generating automated receipt email...</p>
                      <p className="text-slate-300">&gt; Target: {formData.senderMail || 'user email'}</p>
                    </>
                  )}

                  {terminalStatus === 'success' && (
                    <>
                      <p className="text-emerald-400 font-bold">&gt; Process complete! Both emails delivered.</p>
                      <p className="text-slate-300">&gt; Receipt sent to visitor inbox.</p>
                      <p className="text-teal-300 mt-1">&gt; System restored to baseline. Ready for next query.</p>
                    </>
                  )}

                  {terminalStatus === 'error' && (
                    <>
                      <p className="text-rose-400 font-bold">&gt; ERROR: Execution halted</p>
                      <p className="text-rose-300">&gt; Transporter returned authorization or network error.</p>
                      <p className="text-slate-400 mt-1">&gt; Please verify input details or try again.</p>
                    </>
                  )}
                </div>

              </div>

              {/* Bottom Footer */}
              <div className="bg-slate-950/40 border-t border-white/5 text-center text-xs font-mono text-slate-400 px-6 py-3">
                Real-time daemon log &bull; AKS
              </div>

            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="w-full lg:w-1/2 max-w-xl mx-auto flex flex-col gap-4">
            <div className="bg-white/5 border border-teal-500/20 rounded-3xl backdrop-blur-xl shadow-[0_0_30px_rgba(45,212,191,0.12)] hover:border-teal-400/40 transition-all duration-300 p-6 sm:p-8 lg:p-9">
              <h3 className="text-xl sm:text-2xl font-bold text-teal-400 font-['Cedarville_Cursive',cursive] text-center mb-6">
                Let&apos;s Work Together
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">

                {/* Name Input */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-teal-300/90 flex items-center gap-1.5 mb-1.5">
                    <IoPerson className="text-teal-400 text-xs" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 focus:border-teal-400 rounded-xl text-xs sm:text-sm text-white placeholder-gray-400/60 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all px-3.5 py-2.5 sm:px-4 sm:py-3"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-teal-300/90 flex items-center gap-1.5 mb-1.5">
                    <IoMail className="text-teal-400 text-xs" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="senderMail"
                    required
                    value={formData.senderMail}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full bg-white/5 border border-white/10 focus:border-teal-400 rounded-xl text-xs sm:text-sm text-white placeholder-gray-400/60 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all px-3.5 py-2.5 sm:px-4 sm:py-3"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-teal-300/90 flex items-center gap-1.5 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full bg-white/5 border border-white/10 focus:border-teal-400 rounded-xl text-xs sm:text-sm text-white placeholder-gray-400/60 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all px-3.5 py-2.5 sm:px-4 sm:py-3"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-teal-300/90 flex items-center gap-1.5 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    className="w-full bg-white/5 border border-white/10 focus:border-teal-400 rounded-xl text-xs sm:text-sm text-white placeholder-gray-400/60 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all resize-none px-3.5 py-2.5 sm:px-4 sm:py-3"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-2 text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto px-7 py-3 sm:px-8 sm:py-3.5 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <IoPaperPlaneOutline className="text-sm sm:text-base" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

            {/* Below-Form Live Status Display */}
            <div 
              className={`border rounded-2xl backdrop-blur-xl transition-all duration-500 font-mono text-xs sm:text-sm flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 ${
                terminalStatus === 'error'
                  ? 'bg-rose-950/50 border-rose-500/50 text-rose-200'
                  : terminalStatus === 'success'
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                  : 'bg-slate-900/60 border-teal-500/30 text-teal-300'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <IoHardwareChipOutline className="text-base shrink-0 animate-pulse text-teal-400" />
                <span className="truncate">
                  {terminalStatus === 'idle' && 'Status: Ready for input...'}
                  {terminalStatus === 'typing' && 'Status: Capturing input stream...'}
                  {terminalStatus === 'validating' && 'Status: Validating payload...'}
                  {terminalStatus === 'dispatching_owner' && 'Status: Sending to Akshat...'}
                  {terminalStatus === 'dispatching_sender' && 'Status: Sending confirmation email...'}
                  {terminalStatus === 'success' && 'Status: Sent successfully!'}
                  {terminalStatus === 'error' && 'Status: Error sending message.'}
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping shrink-0 ml-2" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}