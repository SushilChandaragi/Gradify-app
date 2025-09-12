// Quiz Helper Functions

/**
 * Validate quiz generation response
 * @param {Object} quizData - The response from ML model
 * @returns {boolean} Whether the response is valid
 */
export function validateQuizResponse(quizData) {
  if (!quizData || typeof quizData !== 'object') {
    return false;
  }

  // Check if required fields exist
  if (!quizData.questions || !Array.isArray(quizData.questions)) {
    return false;
  }

  // Validate each question
  for (const question of quizData.questions) {
    if (!question.question || !question.options || !Array.isArray(question.options)) {
      return false;
    }
    
    if (question.options.length < 2) {
      return false;
    }
    
    if (typeof question.correctAnswer !== 'number' || 
        question.correctAnswer < 0 || 
        question.correctAnswer >= question.options.length) {
      return false;
    }
  }

  return true;
}

/**
 * Format quiz for export
 * @param {Object} quizData - The generated quiz
 * @returns {string} Formatted quiz text
 */
export function formatQuizForExport(quizData) {
  let output = `${quizData.title}\n`;
  output += '='.repeat(quizData.title.length) + '\n\n';

  quizData.questions.forEach((question, index) => {
    output += `${index + 1}. ${question.question}\n`;
    
    question.options.forEach((option, optionIndex) => {
      const letter = String.fromCharCode(65 + optionIndex); // A, B, C, D
      const marker = optionIndex === question.correctAnswer ? `${letter}) ✓ ` : `${letter}) `;
      output += `   ${marker}${option}\n`;
    });
    
    if (question.explanation) {
      output += `\n   Explanation: ${question.explanation}\n`;
    }
    
    output += '\n';
  });

  return output;
}

/**
 * Download quiz as text file
 * @param {Object} quizData - The generated quiz
 */
export function downloadQuizAsFile(quizData) {
  const content = formatQuizForExport(quizData);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${quizData.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Calculate quiz statistics
 * @param {Object} quizData - The generated quiz
 * @returns {Object} Quiz statistics
 */
export function calculateQuizStats(quizData) {
  const stats = {
    totalQuestions: quizData.questions.length,
    questionTypes: {},
    averageOptionsPerQuestion: 0,
    hasExplanations: 0
  };

  let totalOptions = 0;

  quizData.questions.forEach(question => {
    // Count options
    totalOptions += question.options.length;
    
    // Count explanations
    if (question.explanation && question.explanation.trim()) {
      stats.hasExplanations++;
    }
    
    // Determine question type
    const optionCount = question.options.length;
    if (optionCount === 2) {
      stats.questionTypes['True/False'] = (stats.questionTypes['True/False'] || 0) + 1;
    } else if (optionCount >= 4) {
      stats.questionTypes['Multiple Choice'] = (stats.questionTypes['Multiple Choice'] || 0) + 1;
    } else {
      stats.questionTypes['Short Answer'] = (stats.questionTypes['Short Answer'] || 0) + 1;
    }
  });

  stats.averageOptionsPerQuestion = Math.round((totalOptions / stats.totalQuestions) * 10) / 10;
  stats.explanationCoverage = Math.round((stats.hasExplanations / stats.totalQuestions) * 100);

  return stats;
}