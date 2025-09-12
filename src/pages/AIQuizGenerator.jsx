import React, { useState, useEffect } from 'react';

const AIQuizGenerator = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [quizSettings, setQuizSettings] = useState({
    numQuestions: 10,
    difficulty: 'medium',
    questionType: 'multiple-choice'
  });
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState('upload'); // 'upload', 'settings', 'quiz', 'results'

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll to top utility function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    setError('');
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only.');
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should not exceed 10MB.');
      return;
    }
    
    setUploadedFile(file);
    setCurrentStep('settings');
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Generate quiz using ML model
  const generateQuiz = async () => {
    if (!uploadedFile) {
      setError('Please upload a PDF file first.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setCurrentStep('quiz');
    
    try {
      // Import the real ML function
      const { generateQuizFromPDF } = await import('../utils/quizGenerator');
      
      // Generate quiz using actual ML processing
      console.log('Starting ML quiz generation...');
      const quiz = await generateQuizFromPDF(uploadedFile, quizSettings);
      
      console.log('Quiz generated successfully:', quiz);
      setGeneratedQuiz(quiz);
      scrollToTop();
      
    } catch (err) {
      setError(`Failed to generate quiz: ${err.message}`);
      console.error('Quiz generation error:', err);
      setCurrentStep('settings');
    } finally {
      setIsGenerating(false);
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFile(null);
    setGeneratedQuiz(null);
    setError('');
    setUserAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
    setCurrentStep('upload');
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, selectedOptionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptionIndex
    }));
  };

  // Check if all questions are answered
  const allQuestionsAnswered = () => {
    if (!generatedQuiz || !generatedQuiz.questions) return false;
    return generatedQuiz.questions.every(question => 
      userAnswers.hasOwnProperty(question.id)
    );
  };

  // Calculate score
  const calculateScore = () => {
    if (!generatedQuiz || !generatedQuiz.questions) return { score: 0, total: 0, percentage: 0 };
    
    let correctAnswers = 0;
    const total = generatedQuiz.questions.length;
    
    generatedQuiz.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return {
      score: correctAnswers,
      total: total,
      percentage: Math.round((correctAnswers / total) * 100)
    };
  };

  // Submit quiz and show results
  const submitQuiz = () => {
    setQuizCompleted(true);
    setShowResults(true);
    setCurrentStep('results');
    scrollToTop();
  };

  // Reset quiz to take again
  const resetQuiz = () => {
    setUserAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
    setCurrentStep('quiz');
    scrollToTop();
  };

  const steps = [
    { id: 'upload', label: 'Upload PDF', icon: '📄' },
    { id: 'settings', label: 'Quiz Settings', icon: '⚙️' },
    { id: 'quiz', label: 'Take Quiz', icon: '📝' },
    { id: 'results', label: 'View Results', icon: '🏆' }
  ];

  return (
    <div className={`quiz-generator-container ${mounted ? 'mounted' : ''}`}>
      {/* Enhanced Header */}
      <header className="quiz-header">
        <div className="header-content">
          <div className="header-icon">
            <span className="icon-emoji">🤖</span>
            <div className="icon-glow"></div>
          </div>
          <div className="header-text">
            <h1 className="header-title">AI Quiz Generator</h1>
            <p className="header-subtitle">Transform your PDFs into interactive learning experiences</p>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`step ${currentStep === step.id ? 'active' : ''} ${
                steps.findIndex(s => s.id === currentStep) > index ? 'completed' : ''
              }`}
            >
              <div className="step-icon">{step.icon}</div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="quiz-content">
        {/* Error Display */}
        {error && (
          <ErrorMessage message={error} onClose={() => setError('')} />
        )}

        {/* File Upload Section */}
        {currentStep === 'upload' && (
          <UploadSection 
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileChange={handleFileInputChange}
          />
        )}

        {/* Quiz Settings Section */}
        {currentStep === 'settings' && uploadedFile && (
          <SettingsSection 
            uploadedFile={uploadedFile}
            quizSettings={quizSettings}
            setQuizSettings={setQuizSettings}
            onRemoveFile={removeFile}
            onGenerateQuiz={generateQuiz}
            isGenerating={isGenerating}
          />
        )}

        {/* Quiz Section */}
        {currentStep === 'quiz' && generatedQuiz && !isGenerating && (
          <QuizSection 
            quiz={generatedQuiz}
            userAnswers={userAnswers}
            onAnswerSelect={handleAnswerSelect}
            onSubmitQuiz={submitQuiz}
            allQuestionsAnswered={allQuestionsAnswered()}
            quizCompleted={quizCompleted}
          />
        )}

        {/* Loading Section */}
        {isGenerating && (
          <LoadingSection />
        )}

        {/* Results Section */}
        {currentStep === 'results' && showResults && (
          <ResultsSection 
            score={calculateScore()}
            quiz={generatedQuiz}
            userAnswers={userAnswers}
            onResetQuiz={resetQuiz}
            onNewQuiz={removeFile}
          />
        )}
      </div>

      <style jsx>{`
        .quiz-generator-container {
          min-height: 100vh;
          background: var(--bg-primary);
          padding: 2rem 1rem;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .quiz-generator-container.mounted {
          opacity: 1;
        }

        .quiz-header {
          max-width: 1200px;
          margin: 0 auto 3rem;
          text-align: center;
          animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideDown {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .header-icon {
          position: relative;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-xl);
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .icon-emoji {
          font-size: 2.5rem;
          z-index: 2;
        }

        .icon-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          opacity: 0.5;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4); }
          to { box-shadow: 0 0 50px rgba(59, 130, 246, 0.8); }
        }

        .header-text {
          text-align: left;
        }

        .header-title {
          font-size: 3rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(135deg, var(--text-primary), var(--primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin: 0;
          max-width: 400px;
        }

        .progress-steps {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .step::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -2rem;
          width: 2rem;
          height: 2px;
          background: var(--border-primary);
          transform: translateY(-50%);
        }

        .step:last-child::after {
          display: none;
        }

        .step.completed::after {
          background: var(--accent);
        }

        .step-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 2px solid var(--border-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }

        .step.active .step-icon {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
          transform: scale(1.1);
          box-shadow: var(--shadow-lg);
        }

        .step.completed .step-icon {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }

        .step-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.3s ease;
        }

        .step.active .step-label {
          color: var(--text-primary);
          font-weight: 600;
        }

        .quiz-content {
          max-width: 1000px;
          margin: 0 auto;
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .quiz-generator-container {
            padding: 1rem 0.5rem;
          }

          .header-content {
            flex-direction: column;
            gap: 1rem;
          }

          .header-text {
            text-align: center;
          }

          .header-title {
            font-size: 2rem;
          }

          .progress-steps {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .step::after {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

// Error Message Component
const ErrorMessage = ({ message, onClose }) => (
  <div className="error-message">
    <div className="error-content">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
      <button className="error-close" onClick={onClose}>×</button>
    </div>
    <style jsx>{`
      .error-message {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 2rem;
        animation: slideIn 0.3s ease;
      }

      .error-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #EF4444;
      }

      .error-icon {
        font-size: 1.25rem;
      }

      .error-text {
        flex: 1;
        font-weight: 500;
      }

      .error-close {
        background: none;
        border: none;
        color: #EF4444;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
      }

      .error-close:hover {
        background: rgba(239, 68, 68, 0.1);
      }

      @keyframes slideIn {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `}</style>
  </div>
);

// Upload Section Component
const UploadSection = ({ isDragging, onDragOver, onDragLeave, onDrop, onFileChange }) => (
  <div className="upload-section">
    <div 
      className={`upload-zone ${isDragging ? 'dragging' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="upload-content">
        <div className="upload-icon">📄</div>
        <h3 className="upload-title">Upload Your PDF</h3>
        <p className="upload-description">
          Drag and drop your PDF file here, or click to browse
        </p>
        <input
          type="file"
          accept=".pdf"
          onChange={onFileChange}
          className="file-input"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="upload-button btn btn-primary">
          <span className="btn-icon">📁</span>
          Choose File
        </label>
        <div className="upload-specs">
          <span>Maximum file size: 10MB</span>
          <span>Supported format: PDF</span>
        </div>
      </div>
    </div>

    <style jsx>{`
      .upload-section {
        animation: fadeIn 0.5s ease;
      }

      .upload-zone {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 2px dashed var(--border-primary);
        border-radius: 20px;
        padding: 4rem 2rem;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .upload-zone::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .upload-zone:hover::before,
      .upload-zone.dragging::before {
        opacity: 1;
      }

      .upload-zone:hover,
      .upload-zone.dragging {
        border-color: var(--primary);
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
      }

      .upload-content {
        position: relative;
        z-index: 2;
      }

      .upload-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        animation: bounce 2s infinite;
      }

      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }

      .upload-title {
        font-size: 1.75rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      .upload-description {
        font-size: 1.125rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }

      .file-input {
        display: none;
      }

      .upload-button {
        margin-bottom: 2rem;
        transform: scale(1.1);
      }

      .upload-specs {
        display: flex;
        justify-content: center;
        gap: 2rem;
        font-size: 0.875rem;
        color: var(--text-muted);
      }

      @media (max-width: 768px) {
        .upload-zone {
          padding: 3rem 1rem;
        }

        .upload-specs {
          flex-direction: column;
          gap: 0.5rem;
        }
      }
    `}</style>
  </div>
);

export default AIQuizGenerator;

// Settings Section Component
const SettingsSection = ({ uploadedFile, quizSettings, setQuizSettings, onRemoveFile, onGenerateQuiz, isGenerating }) => (
  <div className="settings-section">
    <div className="card">
      <div className="settings-header">
        <h3 className="settings-title">Quiz Configuration</h3>
        <p className="settings-subtitle">Customize your quiz experience</p>
      </div>

      {/* File Info */}
      <div className="file-info">
        <div className="file-icon">📄</div>
        <div className="file-details">
          <h4 className="file-name">{uploadedFile.name}</h4>
          <p className="file-size">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
        <button className="btn btn-outline" onClick={onRemoveFile}>
          <span className="btn-icon">🗑️</span>
          Remove
        </button>
      </div>

      <div className="settings-grid">
        {/* Number of Questions */}
        <div className="setting-item">
          <label className="form-label">Number of Questions</label>
          <select 
            className="input"
            value={quizSettings.numQuestions}
            onChange={(e) => setQuizSettings(prev => ({ ...prev, numQuestions: parseInt(e.target.value) }))}
          >
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
            <option value={20}>20 Questions</option>
          </select>
        </div>

        {/* Difficulty */}
        <div className="setting-item">
          <label className="form-label">Difficulty Level</label>
          <select 
            className="input"
            value={quizSettings.difficulty}
            onChange={(e) => setQuizSettings(prev => ({ ...prev, difficulty: e.target.value }))}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Question Type */}
        <div className="setting-item">
          <label className="form-label">Question Type</label>
          <select 
            className="input"
            value={quizSettings.questionType}
            onChange={(e) => setQuizSettings(prev => ({ ...prev, questionType: e.target.value }))}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>

      <button 
        className={`btn btn-primary generate-btn ${isGenerating ? 'loading' : ''}`}
        onClick={onGenerateQuiz}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <div className="spinner"></div>
            Generating Quiz...
          </>
        ) : (
          <>
            <span className="btn-icon">✨</span>
            Generate Quiz
          </>
        )}
      </button>
    </div>

    <style jsx>{`
      .settings-section {
        animation: slideIn 0.5s ease;
      }

      .settings-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .settings-title {
        font-size: 1.75rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      .settings-subtitle {
        color: var(--text-secondary);
        margin: 0;
      }

      .file-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: var(--bg-secondary);
        border-radius: 12px;
        border: 1px solid var(--border-primary);
        margin-bottom: 2rem;
      }

      .file-icon {
        font-size: 2rem;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .file-details {
        flex: 1;
      }

      .file-name {
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--text-primary);
        margin: 0 0 0.25rem 0;
      }

      .file-size {
        color: var(--text-muted);
        margin: 0;
        font-size: 0.875rem;
      }

      .settings-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .setting-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .generate-btn {
        width: 100%;
        font-size: 1.125rem;
        padding: 1rem 2rem;
        transform: scale(1.02);
      }

      .generate-btn:hover {
        transform: scale(1.05) translateY(-2px);
      }

      .generate-btn.loading {
        pointer-events: none;
        opacity: 0.8;
      }

      @keyframes slideIn {
        from { transform: translateX(-50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `}</style>
  </div>
);

// Loading Section Component
const LoadingSection = () => (
  <div className="loading-section">
    <div className="loading-content">
      <div className="loading-animation">
        <div className="loading-brain">🧠</div>
        <div className="loading-waves">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
      <h3 className="loading-title">AI is Analyzing Your PDF</h3>
      <p className="loading-subtitle">Generating personalized quiz questions...</p>
      <div className="loading-steps">
        <div className="step">📄 Reading PDF content</div>
        <div className="step">🔍 Analyzing key concepts</div>
        <div className="step">🤖 Generating questions</div>
        <div className="step">✨ Finalizing quiz</div>
      </div>
    </div>

    <style jsx>{`
      .loading-section {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400px;
        animation: fadeIn 0.5s ease;
      }

      .loading-content {
        text-align: center;
        max-width: 400px;
      }

      .loading-animation {
        position: relative;
        margin-bottom: 2rem;
      }

      .loading-brain {
        font-size: 4rem;
        animation: pulse 2s ease-in-out infinite;
      }

      .loading-waves {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
      }

      .wave {
        position: absolute;
        border: 2px solid var(--primary);
        border-radius: 50%;
        opacity: 0;
        animation: wave 2s ease-out infinite;
      }

      .wave:nth-child(1) { animation-delay: 0s; }
      .wave:nth-child(2) { animation-delay: 0.5s; }
      .wave:nth-child(3) { animation-delay: 1s; }

      @keyframes wave {
        0% {
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          width: 100px;
          height: 100px;
          opacity: 0;
        }
      }

      .loading-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      .loading-subtitle {
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }

      .loading-steps {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .step {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background: var(--bg-secondary);
        border-radius: 8px;
        color: var(--text-secondary);
        font-size: 0.875rem;
        animation: stepGlow 3s ease-in-out infinite;
      }

      .step:nth-child(1) { animation-delay: 0s; }
      .step:nth-child(2) { animation-delay: 0.75s; }
      .step:nth-child(3) { animation-delay: 1.5s; }
      .step:nth-child(4) { animation-delay: 2.25s; }

      @keyframes stepGlow {
        0%, 75% { 
          background: var(--bg-secondary);
          color: var(--text-secondary);
        }
        25%, 50% { 
          background: var(--primary);
          color: white;
          transform: scale(1.02);
        }
      }
    `}</style>
  </div>
);

// Quiz Section Component  
const QuizSection = ({ quiz, userAnswers, onAnswerSelect, onSubmitQuiz, allQuestionsAnswered, quizCompleted }) => (
  <div className="quiz-section">
    <div className="quiz-header">
      <h3 className="quiz-title">📝 Your Personalized Quiz</h3>
      <div className="quiz-progress">
        <span className="progress-text">
          {Object.keys(userAnswers).length} of {quiz.questions.length} answered
        </span>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(Object.keys(userAnswers).length / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>

    <div className="questions-container">
      {quiz.questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          index={index}
          selectedAnswer={userAnswers[question.id]}
          onAnswerSelect={onAnswerSelect}
          showResults={quizCompleted}
        />
      ))}
    </div>

    {!quizCompleted && (
      <div className="quiz-actions">
        <button 
          className={`btn btn-primary submit-btn ${allQuestionsAnswered ? '' : 'disabled'}`}
          onClick={onSubmitQuiz}
          disabled={!allQuestionsAnswered}
        >
          <span className="btn-icon">🏆</span>
          Submit Quiz
        </button>
      </div>
    )}

    <style jsx>{`
      .quiz-section {
        animation: slideIn 0.5s ease;
      }

      .quiz-header {
        text-align: center;
        margin-bottom: 3rem;
        padding: 2rem;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border-radius: 16px;
        border: 1px solid var(--glass-border);
      }

      .quiz-title {
        font-size: 1.75rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1rem;
      }

      .quiz-progress {
        max-width: 300px;
        margin: 0 auto;
      }

      .progress-text {
        display: block;
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
      }

      .progress-bar {
        width: 100%;
        height: 8px;
        background: var(--bg-secondary);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, var(--primary), var(--accent));
        border-radius: 4px;
        transition: width 0.3s ease;
      }

      .questions-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .quiz-actions {
        text-align: center;
      }

      .submit-btn {
        font-size: 1.125rem;
        padding: 1rem 2rem;
        transform: scale(1.02);
      }

      .submit-btn:hover:not(.disabled) {
        transform: scale(1.05) translateY(-2px);
      }

      .submit-btn.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `}</style>
  </div>
);

// Question Card Component
const QuestionCard = ({ question, index, selectedAnswer, onAnswerSelect, showResults }) => (
  <div className="question-card card">
    <div className="question-header">
      <span className="question-number">Q{index + 1}</span>
      <h4 className="question-text">{question.question}</h4>
    </div>
    
    <div className="options-container">
      {question.options.map((option, optionIndex) => {
        const isSelected = selectedAnswer === optionIndex;
        const isCorrect = optionIndex === question.correctAnswer;
        const showCorrect = showResults && isCorrect;
        const showIncorrect = showResults && isSelected && !isCorrect;
        
        return (
          <button
            key={optionIndex}
            className={`option-btn ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showIncorrect ? 'incorrect' : ''}`}
            onClick={() => !showResults && onAnswerSelect(question.id, optionIndex)}
            disabled={showResults}
          >
            <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
            <span className="option-text">{option}</span>
            {showCorrect && <span className="result-icon">✅</span>}
            {showIncorrect && <span className="result-icon">❌</span>}
          </button>
        );
      })}
    </div>

    <style jsx>{`
      .question-card {
        transition: all 0.3s ease;
        animation: slideInUp 0.5s ease ${index * 0.1}s both;
      }

      @keyframes slideInUp {
        from {
          transform: translateY(50px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .question-header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .question-number {
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.875rem;
        flex-shrink: 0;
      }

      .question-text {
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--text-primary);
        margin: 0;
        line-height: 1.5;
      }

      .options-container {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .option-btn {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--bg-secondary);
        border: 2px solid var(--border-primary);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: left;
        width: 100%;
      }

      .option-btn:hover:not(:disabled) {
        background: var(--bg-tertiary);
        border-color: var(--border-secondary);
        transform: translateX(5px);
      }

      .option-btn.selected {
        background: var(--primary);
        border-color: var(--primary);
        color: white;
      }

      .option-btn.correct {
        background: var(--accent);
        border-color: var(--accent);
        color: white;
      }

      .option-btn.incorrect {
        background: #EF4444;
        border-color: #EF4444;
        color: white;
      }

      .option-btn:disabled {
        cursor: not-allowed;
      }

      .option-letter {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--bg-tertiary);
        color: var(--text-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.875rem;
        flex-shrink: 0;
      }

      .option-btn.selected .option-letter,
      .option-btn.correct .option-letter,
      .option-btn.incorrect .option-letter {
        background: rgba(255, 255, 255, 0.2);
        color: white;
      }

      .option-text {
        flex: 1;
        font-size: 0.95rem;
        line-height: 1.4;
      }

      .result-icon {
        font-size: 1.25rem;
        flex-shrink: 0;
      }
    `}</style>
  </div>
);

// Results Section Component
const ResultsSection = ({ score, quiz, userAnswers, onResetQuiz, onNewQuiz }) => {
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'var(--accent)';
    if (percentage >= 60) return 'var(--accent-warm)';
    return '#EF4444';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return 'Outstanding! 🌟';
    if (percentage >= 80) return 'Excellent work! 🎉';
    if (percentage >= 70) return 'Good job! 👏';
    if (percentage >= 60) return 'Not bad! 👍';
    return 'Keep practicing! 💪';
  };

  return (
    <div className="results-section">
      <div className="results-header">
        <div className="score-display">
          <div className="score-circle" style={{ borderColor: getScoreColor(score.percentage) }}>
            <span className="score-percentage" style={{ color: getScoreColor(score.percentage) }}>
              {score.percentage}%
            </span>
            <span className="score-fraction">
              {score.score}/{score.total}
            </span>
          </div>
          <div className="score-message">
            <h3 style={{ color: getScoreColor(score.percentage) }}>
              {getScoreMessage(score.percentage)}
            </h3>
            <p>You answered {score.score} out of {score.total} questions correctly</p>
          </div>
        </div>
      </div>

      <div className="results-actions">
        <button className="btn btn-primary" onClick={onResetQuiz}>
          <span className="btn-icon">🔄</span>
          Retake Quiz
        </button>
        <button className="btn btn-outline" onClick={onNewQuiz}>
          <span className="btn-icon">📄</span>
          New PDF
        </button>
      </div>

      <div className="answer-review">
        <h4 className="review-title">📋 Answer Review</h4>
        <div className="review-container">
          {quiz.questions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id} className="review-item">
                <div className="review-header">
                  <span className="review-number">Q{index + 1}</span>
                  <span className={`review-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                  </span>
                </div>
                <p className="review-question">{question.question}</p>
                <div className="review-answers">
                  <div className="answer-row">
                    <span className="answer-label">Your answer:</span>
                    <span className={`answer-value ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {question.options[userAnswer]}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="answer-row">
                      <span className="answer-label">Correct answer:</span>
                      <span className="answer-value correct">
                        {question.options[question.correctAnswer]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .results-section {
          animation: slideIn 0.5s ease;
        }

        .results-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .score-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding: 2rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          box-shadow: var(--shadow-xl);
        }

        .score-circle {
          width: 120px;
          height: 120px;
          border: 6px solid;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          animation: scoreReveal 1s ease-out;
        }

        @keyframes scoreReveal {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .score-percentage {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
        }

        .score-fraction {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .score-message {
          text-align: left;
        }

        .score-message h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .score-message p {
          color: var(--text-secondary);
          margin: 0;
        }

        .results-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .answer-review {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          border: 1px solid var(--glass-border);
          padding: 2rem;
        }

        .review-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .review-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .review-item {
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 12px;
          border: 1px solid var(--border-primary);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .review-number {
          background: var(--primary);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .review-status.correct {
          color: var(--accent);
          font-weight: 600;
        }

        .review-status.incorrect {
          color: #EF4444;
          font-weight: 600;
        }

        .review-question {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .review-answers {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .answer-row {
          display: flex;
          gap: 1rem;
        }

        .answer-label {
          color: var(--text-secondary);
          font-weight: 500;
          min-width: 120px;
        }

        .answer-value.correct {
          color: var(--accent);
          font-weight: 500;
        }

        .answer-value.incorrect {
          color: #EF4444;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .score-display {
            flex-direction: column;
            gap: 1rem;
          }

          .score-message {
            text-align: center;
          }

          .results-actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};