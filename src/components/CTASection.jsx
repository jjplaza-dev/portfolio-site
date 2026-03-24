import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { supabase } from '../../supabaseClient'
import { Send, Smile } from 'lucide-react';

const CTASection = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiry: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useGSAP(() => {
    gsap.from('.cta-field', {
      y: 30,
      opacity: 0, // Added opacity fade for smoother entrance
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });
  }, { scope: sectionRef });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase
      .from('contacts') 
      .insert([formData]);

    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', inquiry: '' });
    }
    setLoading(false);
  };

  return (
    <section ref={sectionRef} className='section-box bg-inherit overflow-hidden pb-20'>
      <div className='section-title'><p>INITIATE</p></div>
      
      <div className='inner-section flex flex-col items-center gap-20'>
        <div className='w-full max-w-6xl px-6'>
          <p className='text-[10px] uppercase tracking-[0.4em] font-bold text-black/40'>
            LET&apos;S SHIP YOUR<br /> 
            <span className='text-accent opacity-80'>NEXT WEBSITE.</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 px-6'>
        
          <div className='cta-field flex flex-col gap-2'>
            <label className="font-mono text-[10px] uppercase opacity-100">Your Name*</label>
            <input 
              name="name" 
              type="text" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="John Doe" 
              className="bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors"
            />
          </div>

          <div className='cta-field flex flex-col gap-2'>
            <label className="font-mono text-[10px] uppercase opacity-100">Email Address*</label>
            <input 
              name="email" 
              type="email" 
              required 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="hello@provider.com" 
              className="bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors"
            />
          </div>

          <div className='cta-field flex flex-col gap-2'>
            <label className="font-mono text-[10px] uppercase opacity-100">Company Name</label>
            <input 
              name="company" 
              type="text" 
              value={formData.company} 
              onChange={handleChange} 
              placeholder="My Company" 
              className="bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors"
            />
          </div>

          <div className='cta-field flex flex-col gap-2'>
            <label className="font-mono text-[10px] uppercase opacity-100">Phone Number</label>
            <input 
              name="phone" 
              type="tel" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="+1 (555) 000-0000" 
              className="bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors"
            />
          </div>

          <div className='cta-field flex flex-col gap-2 md:col-span-2'>
            <label className="font-mono text-[10px] uppercase opacity-100">Inquiry*</label>
            <textarea 
              name="inquiry" 
              rows="4" 
              required 
              value={formData.inquiry} 
              onChange={handleChange} 
              placeholder="Tell me about your vision..." 
              className="bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors resize-none"
            />
          </div>

          <div className='cta-field md:col-span-2 flex flex-col items-center gap-4 mt-8'>
           <button 
                    disabled={loading === true}
                    type="submit"
                    className="flex w-full items-center justify-center gap-4 bg-black text-white py-6 uppercase font-bold tracking-widest hover:bg-black/90 transition-all disabled:opacity-50"
                  >
                    {loading === true ? 'Sending...' : 'Send Message'}
                    <Send size={18} />
                  </button>
                  {loading === 'error' && (
                    <p className="text-red-500 font-mono text-xs text-center">Something went wrong. Please try again.</p>
                  )}

            {status === 'success' && <p className='text-[10px] font-mono text-blue-600 tracking-widest flex gap-2'>MESSAGE SENT <Smile /></p>}
            {status === 'error' && <p className='text-[10px] font-mono text-red-500 tracking-widest'>MESSAGE FAILED. RETRY</p>}
          </div>
        </form>

      </div>
    </section>
  );
};

export default CTASection;