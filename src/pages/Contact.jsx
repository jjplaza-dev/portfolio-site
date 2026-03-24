import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Send, CheckCircle2, Smile, MousePointerClick } from 'lucide-react';
import { supabase } from '../../supabaseClient';


const Contact = () => {
  const pageRef = useRef(null);
  const formContainerRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [status, setStatus] = useState('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiry: '',
  });

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { y: '100vh' },
      { y: '0', duration: 0.8, ease: 'power4.out', delay: 0.1 }
    );
  }, []);

  const handleOpenForm = () => {
    setIsFormOpen(true);
    gsap.fromTo(
      formContainerRef.current,
      { height: '100px', opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.6, ease: 'expo.out' }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Logic to insert into Supabase
      const { error } = await supabase
        .from('contacts') // Ensure this matches your table name in Supabase
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone,
            inquiry: formData.inquiry,
          },
        ]);

      if (error) throw error;

      setStatus('success');
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div 
      ref={pageRef} 
      className="min-h-screen w-full bg-primary text-black flex flex-col pt-32 pb-10 px-4 md:px-10 translate-y-[100vh] will-change-transform"
    >
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <div className="mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4 opacity-50">Availability: Open for projects</p>
          <h1 className="text-[10vw] md:text-[7vw] font-black uppercase tracking-tighter leading-[0.85]">
            Have Something <br /> In Mind? <span className="italic font-light">Let's Chat!</span>
          </h1>
        </div>

        <div 
          ref={formContainerRef}
          className={`w-full transition-colors duration-500 ${isFormOpen ? 'bg-primary p-8 md:p-12 border border-secondary/20' : 'bg-transparent'}`}
        >
          {!isFormOpen ? (
            <button 
              onClick={handleOpenForm}
              className="group w-fit relative max-w-3xl border-5 border-secondary/80 mx-auto h-[120px] flex items-center justify-center px-8 hover:bg-black hover:text-white transition-all duration-500"
            >
              <span className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">Start a Conversation</span>
              <MousePointerClick className='absolute bottom-0 right-0 translate-y-[50%] translate-x-[50%] scale-300' fill='#EFECE3'/>
            </button>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {status === 'success' ? (
                <div className="py-20 flex flex-col items-center text-center">
                  <CheckCircle2 size={64} className="mb-6 text-accent" />
                  <h2 className="text-4xl font-bold uppercase tracking-tighter mb-2">Message Sent</h2>
                  <p className="font-mono text-sm opacity-60 flex gap-2">I'll get back to you as soon as I can. <Smile /> </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] uppercase opacity-100">Your Name*</label>
                      <input 
                        required
                        type="text"
                        placeholder="John Doe"
                        className="bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] uppercase opacity-100">Email Address*</label>
                      <input 
                        required
                        type="email"
                        placeholder="hello@provider.com"
                        className="bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                     <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] uppercase opacity-100">Company Name</label>
                      <input 
                        type="text"
                        placeholder="My Company"
                        className="bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors"
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                     <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] uppercase opacity-100">Phone Number</label>
                      <input 
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        className="bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors"
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase opacity-100">Inquiry*</label>
                    <textarea 
                      required
                      rows="4"
                      placeholder="Tell me about your vision..."
                      className="bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors resize-none"
                      onChange={(e) => setFormData({...formData, inquiry: e.target.value})}
                    />
                  </div>
                  
                  <button 
                    disabled={status === 'loading'}
                    type="submit"
                    className="flex items-center justify-center gap-4 bg-black text-white py-6 uppercase font-bold tracking-widest hover:bg-black/90 transition-all disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                    <Send size={18} />
                  </button>
                  {status === 'error' && (
                    <p className="text-red-500 font-mono text-xs text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;