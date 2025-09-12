import React, { useState } from 'react';

const AIQuizGenerator = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
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
    
    try {
      // Import the real ML function
      const { generateQuizFromPDF } = await import('../utils/quizGenerator');
      
      // Generate quiz using actual ML processing
      console.log('Starting ML quiz generation...');
      const quiz = await generateQuizFromPDF(uploadedFile, quizSettings);
      
      console.log('Quiz generated successfully:', quiz);
      setGeneratedQuiz(quiz);
      scrollToTop(); // Scroll to top when quiz is generated
      
    } catch (err) {
      setError(`Failed to generate quiz: ${err.message}`);
      console.error('Quiz generation error:', err);
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
    scrollToTop(); // Scroll to top when results are shown
  };

  // Reset quiz to take again
  const resetQuiz = () => {
    setUserAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
    scrollToTop(); // Scroll to top when quiz is reset
  };

  return (
    <div style={{ 
      backgroundColor: '#F9FAFB', 
      minHeight: '100vh', 
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#1E3A8A', fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
            🤖 AI Quiz Generator
          </h2>
          <p style={{ color: '#6B7280', marginBottom: '2rem', textAlign: 'center', fontSize: '1.1rem' }}>
            Upload your PDF notes and let AI generate personalized quizzes for you
          </p>

          {/* Error Display */}
          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          {/* File Upload Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#374151', marginBottom: '1rem' }}>📁 Upload PDF Document</h3>
            
            {!uploadedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  border: `3px dashed ${isDragging ? '#3B82F6' : '#D1D5DB'}`,
                  borderRadius: '12px',
                  padding: '3rem',
                  textAlign: 'center',
                  backgroundColor: isDragging ? '#EFF6FF' : '#F9FAFB',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                <p style={{ color: '#6B7280', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  Drag and drop your PDF file here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInputChange}
                  style={{ display: 'none' }}
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  style={{
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    border: 'none',
                    display: 'inline-block'
                  }}
                >
                  Choose PDF File
                </label>
                <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginTop: '1rem' }}>
                  Supported: PDF files up to 10MB
                </p>
              </div>
            ) : (
              <div style={{
                border: '2px solid #10B981',
                borderRadius: '12px',
                padding: '1.5rem',
                backgroundColor: '#ECFDF5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '2rem', marginRight: '1rem' }}>📄</span>
                  <div>
                    <p style={{ color: '#065F46', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      {uploadedFile.name}
                    </p>
                    <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  style={{
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Quiz Settings */}
          {uploadedFile && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#374151', marginBottom: '1rem' }}>⚙️ Quiz Settings</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                backgroundColor: '#F9FAFB',
                padding: '1.5rem',
                borderRadius: '8px'
              }}>
                <div>
                  <label style={{ color: '#374151', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
                    Number of Questions
                  </label>
                  <select
                    value={quizSettings.numQuestions}
                    onChange={(e) => setQuizSettings({...quizSettings, numQuestions: parseInt(e.target.value)})}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid #D1D5DB',
                      fontSize: '1rem'
                    }}
                  >
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions</option>
                    <option value={20}>20 Questions</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ color: '#374151', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
                    Difficulty Level
                  </label>
                  <select
                    value={quizSettings.difficulty}
                    onChange={(e) => setQuizSettings({...quizSettings, difficulty: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid #D1D5DB',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ color: '#374151', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
                    Question Type
                  </label>
                  <select
                    value={quizSettings.questionType}
                    onChange={(e) => setQuizSettings({...quizSettings, questionType: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid #D1D5DB',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button
                  onClick={generateQuiz}
                  disabled={isGenerating}
                  style={{
                    backgroundColor: isGenerating ? '#9CA3AF' : '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isGenerating ? '🔄 Generating Quiz...' : '✨ Generate Quiz'}
                </button>
              </div>
            </div>
          )}

          {/* Generated Quiz Display */}
          {generatedQuiz && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#374151', marginBottom: '1rem' }}>📝 Generated Quiz</h3>
              <div style={{
                backgroundColor: '#F0F9FF',
                border: '2px solid #0EA5E9',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h4 style={{ color: '#0C4A6E', marginBottom: '1rem', fontSize: '1.3rem' }}>
                  {generatedQuiz.title}
                </h4>
                
                {!showResults ? (
                  // Interactive Quiz Mode
                  <>
                    {generatedQuiz.questions.map((question, index) => (
                      <div key={question.id} style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        marginBottom: '1rem',
                        border: '1px solid #E0E7FF'
                      }}>
                        <p style={{ 
                          color: '#1E40AF', 
                          fontWeight: 'bold', 
                          marginBottom: '1rem',
                          fontSize: '1.1rem'
                        }}>
                          {index + 1}. {question.question}
                        </p>
                        
                        <div style={{ marginLeft: '1rem' }}>
                          {question.options.map((option, optionIndex) => (
                            <div 
                              key={optionIndex} 
                              onClick={() => handleAnswerSelect(question.id, optionIndex)}
                              style={{
                                padding: '0.75rem',
                                marginBottom: '0.5rem',
                                backgroundColor: userAnswers[question.id] === optionIndex ? '#DBEAFE' : '#F9FAFB',
                                border: `2px solid ${userAnswers[question.id] === optionIndex ? '#3B82F6' : '#E5E7EB'}`,
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <span style={{ 
                                marginRight: '0.75rem',
                                color: userAnswers[question.id] === optionIndex ? '#3B82F6' : '#6B7280',
                                fontSize: '1.1rem'
                              }}>
                                {userAnswers[question.id] === optionIndex ? '●' : '○'}
                              </span>
                              <span style={{ 
                                color: userAnswers[question.id] === optionIndex ? '#1E40AF' : '#374151',
                                fontWeight: userAnswers[question.id] === optionIndex ? 'bold' : 'normal'
                              }}>
                                {option}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                      <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
                        Answered: {Object.keys(userAnswers).length} / {generatedQuiz.questions.length}
                      </p>
                      
                      <button
                        onClick={submitQuiz}
                        disabled={!allQuestionsAnswered()}
                        style={{
                          backgroundColor: allQuestionsAnswered() ? '#10B981' : '#9CA3AF',
                          color: 'white',
                          padding: '0.75rem 2rem',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          cursor: allQuestionsAnswered() ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {allQuestionsAnswered() ? 'Submit Quiz' : 'Answer All Questions'}
                      </button>
                    </div>
                  </>
                ) : (
                  // Results Mode
                  <>
                    <div style={{
                      backgroundColor: '#F0FDF4',
                      border: '2px solid #22C55E',
                      borderRadius: '12px',
                      padding: '2rem',
                      textAlign: 'center',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{ color: '#15803D', marginBottom: '1rem', fontSize: '1.5rem' }}>
                        🎉 Quiz Completed!
                      </h3>
                      <div style={{ fontSize: '2rem', color: '#15803D', marginBottom: '0.5rem' }}>
                        {calculateScore().score} / {calculateScore().total}
                      </div>
                      <div style={{ fontSize: '1.2rem', color: '#15803D', marginBottom: '1rem' }}>
                        {calculateScore().percentage}% Score
                      </div>
                      <p style={{ color: '#166534' }}>
                        {calculateScore().percentage >= 80 ? 'Excellent work!' : 
                         calculateScore().percentage >= 60 ? 'Good job!' : 
                         'Keep practicing!'}
                      </p>
                    </div>

                    {generatedQuiz.questions.map((question, index) => (
                      <div key={question.id} style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        marginBottom: '1rem',
                        border: '1px solid #E0E7FF'
                      }}>
                        <p style={{ 
                          color: '#1E40AF', 
                          fontWeight: 'bold', 
                          marginBottom: '1rem',
                          fontSize: '1.1rem'
                        }}>
                          {index + 1}. {question.question}
                        </p>
                        
                        <div style={{ marginLeft: '1rem' }}>
                          {question.options.map((option, optionIndex) => {
                            const isCorrect = optionIndex === question.correctAnswer;
                            const isUserAnswer = userAnswers[question.id] === optionIndex;
                            const isWrongUserAnswer = isUserAnswer && !isCorrect;
                            
                            return (
                              <div key={optionIndex} style={{
                                padding: '0.75rem',
                                marginBottom: '0.5rem',
                                backgroundColor: 
                                  isCorrect ? '#DCFCE7' : 
                                  isWrongUserAnswer ? '#FEE2E2' : '#F9FAFB',
                                border: `2px solid ${
                                  isCorrect ? '#16A34A' : 
                                  isWrongUserAnswer ? '#EF4444' : '#E5E7EB'}`,
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center'
                              }}>
                                <span style={{ 
                                  marginRight: '0.75rem',
                                  color: isCorrect ? '#16A34A' : isWrongUserAnswer ? '#EF4444' : '#6B7280',
                                  fontSize: '1.1rem'
                                }}>
                                  {isCorrect ? '✓' : isWrongUserAnswer ? '✗' : '○'}
                                </span>
                                <span style={{ 
                                  color: isCorrect ? '#16A34A' : isWrongUserAnswer ? '#EF4444' : '#374151',
                                  fontWeight: isCorrect || isUserAnswer ? 'bold' : 'normal'
                                }}>
                                  {option}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        
                        {question.explanation && (
                          <div style={{
                            marginTop: '1rem',
                            padding: '0.75rem',
                            backgroundColor: '#FEF3C7',
                            borderRadius: '6px',
                            border: '1px solid #F59E0B'
                          }}>
                            <p style={{ color: '#92400E', fontSize: '0.9rem', margin: 0 }}>
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                      <button
                        onClick={resetQuiz}
                        style={{
                          backgroundColor: '#3B82F6',
                          color: 'white',
                          padding: '0.75rem 2rem',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          marginRight: '1rem'
                        }}
                      >
                        Take Quiz Again
                      </button>
                      
                      <button
                        onClick={() => {
                          // TODO: Add export functionality
                          alert('Export functionality will be implemented next!');
                        }}
                        style={{
                          backgroundColor: '#7C3AED',
                          color: 'white',
                          padding: '0.75rem 1.5rem',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        Export Results
                      </button>
                    </div>
                  </>
                )}
                
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button
                    onClick={() => {
                      setGeneratedQuiz(null);
                      setUploadedFile(null);
                    }}
                    style={{
                      backgroundColor: '#6B7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem 1.5rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Generate New Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center' }}>
          <a href="/home" style={{
            backgroundColor: '#1E3A8A',
            color: '#F9FAFB',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block',
            border: '2px solid #EAB308'
          }}>← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default AIQuizGenerator;
