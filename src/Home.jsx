import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      title: 'Timetable Tracker',
      description: 'Smart schedule management with conflict detection',
      icon: '📅',
      path: '/timetable-tracker',
      gradient: 'from-blue-500 to-blue-600',
      delay: '0s'
    },
    {
      title: 'Campus Navigation',
      description: 'Interactive maps and location services',
      icon: '🗺️',
      path: '/navigation',
      gradient: 'from-purple-500 to-purple-600',
      delay: '0.1s'
    },
    {
      title: 'Latest News',
      description: 'Stay updated with campus announcements',
      icon: '📰',
      path: '/latest-news',
      gradient: 'from-amber-500 to-orange-500',
      delay: '0.2s'
    },
    {
      title: 'AI Quiz Generator',
      description: 'Transform PDFs into interactive quizzes',
      icon: '🤖',
      path: '/ai-quiz-generator',
      gradient: 'from-emerald-500 to-teal-500',
      delay: '0.3s'
    },
    {
      title: 'CGPA Calculator',
      description: 'Track academic performance and grades',
      icon: '📊',
      path: '/cgpa-calculator',
      gradient: 'from-pink-500 to-rose-500',
      delay: '0.4s'
    },
    {
      title: 'Coming Soon',
      description: 'More amazing features in development',
      icon: '🚀',
      path: '#',
      gradient: 'from-gray-500 to-gray-600',
      delay: '0.5s',
      comingSoon: true
    }
  ];

  return (
    <div className="home-container">
      <div className="home-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="home-content">
        <header className={`home-header ${mounted ? 'animate-slideIn' : ''}`}>
          <h1 className="home-title">
            Welcome to <span className="gradient-text">Gradify</span>
          </h1>
          <p className="home-subtitle">
            Your Complete Academic Companion Platform
          </p>
          <div className="title-divider"></div>
        </header>

        <div className={`features-grid ${mounted ? 'features-visible' : ''}`}>
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              feature={feature} 
              index={index}
              mounted={mounted}
            />
          ))}
        </div>

        <footer className={`home-footer ${mounted ? 'animate-fadeIn' : ''}`}>
          <p>Empowering students with AI-powered academic tools</p>
        </footer>
      </div>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          width: 100vw;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 2rem 1rem;
        }

        .home-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: float 20s infinite ease-in-out;
        }

        .shape-1 {
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, #3B82F6, #8B5CF6);
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(45deg, #10B981, #3B82F6);
          top: 60%;
          right: 15%;
          animation-delay: 7s;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #8B5CF6, #10B981);
          bottom: 20%;
          left: 20%;
          animation-delay: 14s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(20px) rotate(240deg); }
        }

        .home-content {
          max-width: 1400px;
          margin: 0 auto;
          z-index: 1;
          position: relative;
        }

        .home-header {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .home-header.animate-slideIn {
          opacity: 1;
          transform: translateY(0);
        }

        .home-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .gradient-text {
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #10B981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .home-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-weight: 400;
        }

        .title-divider {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #3B82F6, #8B5CF6, #10B981);
          margin: 0 auto;
          border-radius: 2px;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          to { box-shadow: 0 0 20px rgba(139, 92, 246, 0.8); }
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
          opacity: 0;
          transition: opacity 1s ease-in-out 0.5s;
        }

        .features-grid.features-visible {
          opacity: 1;
        }

        .home-footer {
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s;
        }

        .home-footer.animate-fadeIn {
          opacity: 1;
          transform: translateY(0);
        }

        .home-footer p {
          color: var(--text-muted);
          font-size: 1rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .home-container {
            padding: 1rem 0.5rem;
          }
          
          .home-header {
            margin-bottom: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ feature, index, mounted }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (feature.comingSoon) {
    return (
      <div
        className={`feature-card coming-soon ${mounted ? 'animate-slideIn' : ''}`}
        style={{
          animationDelay: feature.delay
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="feature-content">
          <div className="feature-icon">{feature.icon}</div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
          <div className="coming-soon-badge">Coming Soon</div>
        </div>
        <FeatureCardStyles />
      </div>
    );
  }

  return (
    <Link
      to={feature.path}
      className={`feature-card ${mounted ? 'animate-slideIn' : ''}`}
      style={{
        animationDelay: feature.delay
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="feature-content">
        <div className="feature-icon">{feature.icon}</div>
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-description">{feature.description}</p>
        <div className={`feature-gradient bg-gradient-to-r ${feature.gradient}`}></div>
      </div>
      <FeatureCardStyles />
    </Link>
  );
};

const FeatureCardStyles = () => (
  <style jsx>{`
    .feature-card {
      position: relative;
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 1.5rem;
      padding: 2rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      opacity: 0;
      transform: translateY(50px);
      box-shadow: var(--shadow-lg);
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .feature-card.animate-slideIn {
      opacity: 1;
      transform: translateY(0);
    }

    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: var(--shadow-xl);
      border-color: rgba(148, 163, 184, 0.4);
    }

    .feature-card.coming-soon {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .feature-card.coming-soon:hover {
      transform: translateY(-5px);
    }

    .feature-content {
      position: relative;
      z-index: 2;
      text-align: center;
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }

    .feature-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
      line-height: 1.2;
    }

    .feature-description {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin: 0;
    }

    .feature-gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .feature-card:hover .feature-gradient {
      opacity: 1;
    }

    .coming-soon-badge {
      display: inline-block;
      background: linear-gradient(135deg, var(--accent-warm), #D97706);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 500;
      margin-top: 1rem;
      animation: pulse 2s infinite;
    }

    .bg-gradient-to-r.from-blue-500.to-blue-600 {
      background: linear-gradient(to right, #3B82F6, #2563EB);
    }

    .bg-gradient-to-r.from-purple-500.to-purple-600 {
      background: linear-gradient(to right, #8B5CF6, #7C3AED);
    }

    .bg-gradient-to-r.from-amber-500.to-orange-500 {
      background: linear-gradient(to right, #F59E0B, #EA580C);
    }

    .bg-gradient-to-r.from-emerald-500.to-teal-500 {
      background: linear-gradient(to right, #10B981, #14B8A6);
    }

    .bg-gradient-to-r.from-pink-500.to-rose-500 {
      background: linear-gradient(to right, #EC4899, #F43F5E);
    }

    .bg-gradient-to-r.from-gray-500.to-gray-600 {
      background: linear-gradient(to right, #6B7280, #4B5563);
    }
  `}</style>
);

export default Home;
