import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '91XXXXXXXXXX'; // Replace with seller's actual phone number
  const whatsappMessage = encodeURIComponent('Hi, I want to customize a handmade gift.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
  const instagramUrl = 'https://instagram.com/the_sewcreative'; // Replace with seller's Instagram URL

  return (
    <div 
      className="position-fixed d-flex flex-column gap-2" 
      style={{ 
        bottom: '24px', 
        right: '24px', 
        zIndex: 1020,
        pointerEvents: 'auto'
      }}
    >
      {/* Instagram Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="btn rounded-circle d-flex align-items-center justify-content-center shadow-lg"
        style={{
          width: '50px',
          height: '50px',
          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          color: '#ffffff',
          border: 'none',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0)'}
        title="Follow us on Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
      </a>


      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="btn rounded-circle d-flex align-items-center justify-content-center shadow-lg"
        style={{
          width: '56px',
          height: '56px',
          background: '#25D366',
          color: '#ffffff',
          border: 'none',
          position: 'relative',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Chat with us on WhatsApp"
      >
        {/* Pulsing ring animation */}
        <span 
          className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
          style={{
            border: '2px solid #25D366',
            animation: 'pulse-ring 1.5s infinite ease-in-out',
            pointerEvents: 'none',
            opacity: 0.7
          }}
        />
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(1.4); opacity: 0; }
          }
        `}} />
        <MessageCircle size={26} fill="#ffffff" />
      </a>
    </div>
  );
}
