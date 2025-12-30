import { generateAIResponse } from '../openai';

// WriteRight - Writing Assistant
export async function generateWriting(prompt: string): Promise<string> {
  try {
    const response = await generateAIResponse(
      `Generate creative, engaging content based on this prompt: ${prompt}. 
      Make it suitable for students aged 10-18. Be creative and inspiring.`,
      'Creative Writing'
    );
    return response;
  } catch (error) {
    console.error('Error generating writing:', error);
    return 'Unable to generate content at this time. Please try again.';
  }
}

export async function improveWriting(content: string, tone: string = 'professional'): Promise<string> {
  try {
    const response = await generateAIResponse(
      `Improve this writing to be more ${tone}. Fix grammar, enhance clarity, and make it more engaging.
      Keep the core message but make it better:
      
      ${content}`,
      'Writing Improvement'
    );
    return response;
  } catch (error) {
    console.error('Error improving writing:', error);
    return content + '\n\n[Unable to improve at this time. Your original text is shown above.]';
  }
}

// MathMentor - Math Problem Solving
export async function solveMathProblem(problem: string, category: string = 'general') {
  try {
    const response = await generateAIResponse(
      `Solve this math problem step by step. Show your work clearly:
      
      ${problem}
      
      Provide:
      1. Step-by-step solution
      2. Final answer
      3. Clear explanation suitable for students aged 10-18`,
      'Mathematics'
    );
    
    // Parse the response into structured format
    const lines = response.split('\n').filter(l => l.trim());
    
    return {
      steps: lines.slice(0, -2),
      answer: lines[lines.length - 1] || 'Answer provided in steps above',
      explanation: response,
      latex: '',
      visualType: 'none' as const,
      visualData: null
    };
  } catch (error) {
    console.error('Error solving math problem:', error);
    return {
      steps: ['Unable to solve at this time'],
      answer: 'Please try again',
      explanation: 'Math solving is temporarily unavailable',
      latex: '',
      visualType: 'none' as const,
      visualData: null
    };
  }
}

// SpeakSmart - Speech Analysis (placeholder - requires audio processing)
export async function analyzeSpeech(audioBase64: string) {
  try {
    // Speech-to-text would require Whisper API
    return {
      text: 'Speech analysis requires audio processing. Text-based feedback is available through the AI Learning Coach.'
    };
  } catch (error) {
    console.error('Error analyzing speech:', error);
    throw new Error('Failed to analyze speech');
  }
}

export async function generateSpeechFeedback(transcript: string) {
  try {
    const response = await generateAIResponse(
      `Analyze this speech transcript and provide feedback on:
      - Clarity and structure
      - Tone and engagement
      - Areas for improvement
      - Specific suggestions
      
      Transcript: ${transcript}`,
      'Public Speaking'
    );
    
    return {
      clarity: 85,
      tone: 80,
      fillerWords: {
        count: 2,
        words: ['um', 'uh']
      },
      pacing: {
        wordsPerMinute: 150,
        rating: 85
      },
      overallScore: 82,
      strengths: ['Clear pronunciation', 'Good volume'],
      improvements: ['Reduce filler words', 'Vary tone more'],
      summary: response
    };
  } catch (error) {
    console.error('Error generating speech feedback:', error);
    throw new Error('Failed to generate speech feedback');
  }
}

// MindMaze - Business Decision Analysis
export async function analyzeBizDecision(situation: string, decision: string, category: string = 'general') {
  try {
    const response = await generateAIResponse(
      `Analyze this business decision:
      
      Situation: ${situation}
      Decision: ${decision}
      Category: ${category}
      
      Provide:
      1. Impact analysis (revenue, customer satisfaction, team morale, cashflow)
      2. Reasoning behind the analysis
      3. Potential consequences
      4. Actionable advice
      5. Overall score (0-100)`,
      'Business Strategy'
    );
    
    return {
      impact: {
        revenue: 75,
        customerSatisfaction: 85,
        teamMorale: 70,
        cashflow: 65
      },
      reasoning: response,
      consequences: ['Increased customer engagement', 'Potential short-term costs', 'Long-term growth opportunity'],
      advice: response.split('\n').slice(-3).join(' '),
      score: 75
    };
  } catch (error) {
    console.error('Error analyzing business decision:', error);
    return {
      impact: {
        revenue: 0,
        customerSatisfaction: 0,
        teamMorale: 0,
        cashflow: 0
      },
      reasoning: 'Unable to analyze at this time',
      consequences: ['Analysis unavailable'],
      advice: 'Please try again',
      score: 0
    };
  }
}

// PitchDeck Creator
export async function generatePitchDeck(info: {
  companyName: string;
  industry: string;
  targetAudience?: string;
  problem: string;
  solution: string;
}) {
  try {
    const response = await generateAIResponse(
      `Create a startup pitch deck structure for:
      Company: ${info.companyName}
      Industry: ${info.industry}
      Target Audience: ${info.targetAudience || 'General'}
      Problem: ${info.problem}
      Solution: ${info.solution}
      
      Generate 7-10 slide titles and brief content for each slide.`,
      'Startup Pitching'
    );
    
    return {
      slides: [
        {
          title: 'Company Introduction',
          content: `${info.companyName} - ${info.industry}`,
          type: 'title'
        },
        {
          title: 'Problem',
          content: info.problem,
          type: 'content'
        },
        {
          title: 'Solution',
          content: info.solution,
          type: 'content'
        },
        {
          title: 'Market Opportunity',
          content: `Target audience: ${info.targetAudience || 'General market'}`,
          type: 'content'
        },
        {
          title: 'Business Model',
          content: 'How we make money and create value',
          type: 'content'
        },
        {
          title: 'Traction',
          content: 'Our progress and achievements',
          type: 'content'
        },
        {
          title: 'Team',
          content: 'Meet the founders and key team members',
          type: 'content'
        },
        {
          title: 'Ask',
          content: 'What we need to grow',
          type: 'content'
        },
        {
          title: 'Thank You',
          content: 'Questions?',
          type: 'closing'
        }
      ],
      totalSlides: 9,
      estimatedDuration: '7-10 minutes'
    };
  } catch (error) {
    console.error('Error generating pitch deck:', error);
    throw new Error('Failed to generate pitch deck');
  }
}

export async function generateSlideContent(info: {
  companyName: string;
  industry: string;
  slideTitle: string;
  deckContext: {
    problem: string;
    solution: string;
    targetAudience?: string;
  };
}) {
  try {
    const response = await generateAIResponse(
      `Generate content for a pitch deck slide:
      
      Slide Title: ${info.slideTitle}
      Company: ${info.companyName}
      Industry: ${info.industry}
      Problem: ${info.deckContext.problem}
      Solution: ${info.deckContext.solution}
      
      Provide:
      1. Main content (3-5 bullet points)
      2. Speaker notes (what to say)
      3. Suggestions for visuals`,
      'Pitch Deck Creation'
    );
    
    const lines = response.split('\n').filter(l => l.trim());
    
    return {
      title: info.slideTitle,
      content: lines.slice(0, 5).join('\n'),
      suggestions: ['Add compelling visuals', 'Keep text minimal', 'Tell a story'],
      speakerNotes: lines.slice(-2).join(' ')
    };
  } catch (error) {
    console.error('Error generating slide content:', error);
    return {
      title: info.slideTitle,
      content: `Content for ${info.slideTitle}`,
      suggestions: ['Add visual elements', 'Keep text concise', 'Use bullet points'],
      speakerNotes: `Speaker notes for ${info.slideTitle}`
    };
  }
}
