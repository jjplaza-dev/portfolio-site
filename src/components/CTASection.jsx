import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { supabase } from '../../supabaseClient'

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

  const cornerClass = "absolute w-2 h-2 bg-accent z-10 transition-transform group-focus-within:scale-125";
  const inputBase = "w-full bg-white/40 backdrop-blur-sm border-[0.5px] border-black/10 p-5 pt-9 text-sm uppercase tracking-tight focus:outline-none focus:border-black/80 transition-colors placeholder:text-black/20";

  return (
    <section ref={sectionRef} className='section-box bg-inherit overflow-hidden'>
      <div className='section-title'><p>INITIATE</p></div>
      
      <div className='inner-section flex flex-col items-center gap-20'>
        <div className='w-full max-w-6xl px-6'>
          <p className='text-[10px] uppercase tracking-[0.4em] font-bold text-black/40'>
            LET&apos;S SHIP YOUR<br /> 
            <span className='text-accent opacity-80'>NEXT WEBSITE.</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 px-6'>
        
          <div className='cta-field group relative'>
            <div className={`${cornerClass} -top-1 -left-1`} />
            <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="NAME*" className={inputBase} />
          </div>

          <div className='cta-field group relative'>
            <div className={`${cornerClass} -top-1 -right-1`} />
            <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="EMAIL*" className={inputBase} />
          </div>

          <div className='cta-field group relative'>
            <input name="company" type="text" value={formData.company} onChange={handleChange} placeholder="COMPANY" className={inputBase} />
          </div>

          <div className='cta-field group relative'>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="PHONE" className={inputBase} />
          </div>

          <div className='cta-field group relative md:col-span-2'>
            <div className={`${cornerClass} -bottom-1 -left-1`} />
            <div className={`${cornerClass} -bottom-1 -right-1`} />
            <textarea name="inquiry" rows="5" required value={formData.inquiry} onChange={handleChange} placeholder="INQUIRY*" className={`${inputBase} resize-none`} />
          </div>

          <div className='md:col-span-2 flex flex-col items-center gap-4 mt-4'>
            <button 
              type="submit"
              disabled={loading}
              className='group relative w-full md:w-1/2 py-8 bg-primary hover:bg-accent hover:border-primary hover:text-primary text-secondary border-accent border-2 uppercase tracking-[0.4em] text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50'
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent shadow-[0_0_0_2px_#EFECE3]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent shadow-[0_0_0_2px_#EFECE3]" />
              {loading ? "TRANSMITTING..." : "SEND MESSAGE"}
            </button>

            {status === 'success' && <p className='text-[10px] font-mono text-blue-600 tracking-widest'>MESSAGE SENT</p>}
            {status === 'error' && <p className='text-[10px] font-mono text-red-500 tracking-widest'>MESSAGE FAILED. RETRY</p>}
          </div>
        </form>

      </div>
    </section>
  );
};

export default CTASection;