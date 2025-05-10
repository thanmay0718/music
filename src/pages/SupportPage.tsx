import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Mail, Phone } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    
    // Reset submitted state after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const faqs: FAQ[] = [
    {
      question: "How do I create a playlist?",
      answer: "To create a playlist, click the 'Create Playlist' option in the left sidebar. You can then add songs to your playlist by finding a song you like, clicking the three dots next to it, and selecting 'Add to Playlist'."
    },
    {
      question: "How can I download music for offline listening?",
      answer: "Premium subscribers can download music for offline listening by clicking the download button on albums, playlists, or individual songs. Downloaded content is available in the 'Your Library' section when you're offline."
    },
    {
      question: "How do I change my account settings?",
      answer: "To access your account settings, click on your profile picture in the top-right corner and select 'Account' from the dropdown menu. From there, you can manage your personal details, subscription, and privacy settings."
    },
    {
      question: "Can I use the same account on multiple devices?",
      answer: "Yes, you can use your account on multiple devices. However, with a free account, you can only actively stream on one device at a time. Premium subscribers can stream on multiple devices simultaneously."
    },
    {
      question: "How do I find new music?",
      answer: "There are several ways to discover new music. You can check out the 'Home' page for personalized recommendations, use the 'Search' feature to find specific artists or genres, or explore curated playlists in the 'Browse' section."
    }
  ];

  return (
    <div className="pb-20 max-w-4xl mx-auto fade-in">
      <h1 className="text-3xl font-bold text-white mb-8">Help & Support</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#181818] rounded-md overflow-hidden">
              <button 
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-white font-medium">{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp size={20} className="text-[#b3b3b3]" />
                ) : (
                  <ChevronDown size={20} className="text-[#b3b3b3]" />
                )}
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-[#b3b3b3] text-sm border-t border-[#282828]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#181818] p-6 rounded-md text-center hover:bg-[#282828] transition-all">
            <div className="bg-[#282828] rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={24} className="text-[#1DB954]" />
            </div>
            <h3 className="text-white font-medium mb-2">Live Chat</h3>
            <p className="text-[#b3b3b3] text-sm mb-4">Available 24/7 for Premium users</p>
            <button className="text-white text-sm font-medium hover:text-[#1DB954]">
              Start chat
            </button>
          </div>
          
          <div className="bg-[#181818] p-6 rounded-md text-center hover:bg-[#282828] transition-all">
            <div className="bg-[#282828] rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
              <Mail size={24} className="text-[#1DB954]" />
            </div>
            <h3 className="text-white font-medium mb-2">Email Support</h3>
            <p className="text-[#b3b3b3] text-sm mb-4">We'll respond within 24 hours</p>
            <a href="mailto:support@spotifake.com" className="text-white text-sm font-medium hover:text-[#1DB954]">
              support@spotifake.com
            </a>
          </div>
          
          <div className="bg-[#181818] p-6 rounded-md text-center hover:bg-[#282828] transition-all">
            <div className="bg-[#282828] rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
              <Phone size={24} className="text-[#1DB954]" />
            </div>
            <h3 className="text-white font-medium mb-2">Call Us</h3>
            <p className="text-[#b3b3b3] text-sm mb-4">Mon-Fri, 9am-5pm</p>
            <a href="tel:+18001234567" className="text-white text-sm font-medium hover:text-[#1DB954]">
              +1 (800) 123-4567
            </a>
          </div>
        </div>
        
        <div className="bg-[#181818] p-6 rounded-md">
          <h3 className="text-xl font-bold text-white mb-4">Send us a message</h3>
          {submitted ? (
            <div className="bg-[#1DB954] bg-opacity-20 border border-[#1DB954] rounded-md p-4 text-[#1DB954]">
              Thank you! Your message has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-[#b3b3b3] mb-1">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#282828] border-none rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#b3b3b3] mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#282828] border-none rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-[#b3b3b3] mb-1">
                  Your message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-[#282828] border-none rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-[#1DB954] text-black font-bold py-3 px-6 rounded-full hover:bg-opacity-80 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default SupportPage;