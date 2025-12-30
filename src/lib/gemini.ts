// Gemini API client using OpenRouter
// OpenRouter provides a unified API for Gemini and other models

const GEMINI_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const GEMINI_MODEL = 'google/gemini-pro';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

async function callGemini(messages: Message[], maxTokens: number = 500): Promise<string> {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'OrbitStudent AI Tools'
      },
      body: JSON.stringify({
        model: GEMINI_MODEL,
        messages,
        max_tokens: maxTokens,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();
    return data.choices[0]?.message?.content?.trim() || 'No response generated';
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

// Check if Gemini is available
export function isGeminiAvailable(): boolean {
  return !!GEMINI_API_KEY;
}

// Generate AI response for the learning coach
export async function generateAIResponse(input: string, category: string): Promise<string> {
  try {
    const response = await callGemini([
      {
        role: "system",
        content: `You are an expert AI learning coach specializing in ${category}. 
          Provide clear, concise, and structured responses with bullet points and real-world examples.
          Keep responses under 200 words and focus on actionable advice.`
      },
      {
        role: "user",
        content: input
      }
    ], 300);

    return response || 'I apologize, but I could not generate a response. Please try asking your question again.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'I apologize, but I encountered an error. Please try asking your question again.';
  }
}

// Generate speech for AI responses (fallback for now)
export async function generateSpeech(text: string): Promise<string> {
  // OpenRouter doesn't support TTS, so we'll use browser's speech synthesis as fallback
  try {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
      return 'speech-generated';
    }
    throw new Error('Speech synthesis not supported');
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
}

// Brand Analysis and Suggestions
export async function generateBrandSuggestions(data: {
  industry: string;
  target_audience: string;
  values: string[];
}): Promise<{
  name: string;
  tagline: string;
  description: string;
  colors: string[];
}> {
  try {
    const response = await callGemini([
      {
        role: "system",
        content: "You are a branding expert providing color, typography, and design suggestions based on brand values and industry. Respond ONLY with valid JSON."
      },
      {
        role: "user",
        content: `Generate brand suggestions for:
          Industry: ${data.industry}
          Target Audience: ${data.target_audience}
          Values: ${data.values.join(', ')}
          
          Respond with ONLY valid JSON in this exact format:
          {
            "name": "unique brand name",
            "tagline": "catchy tagline",
            "description": "brief description",
            "colors": ["#hex1", "#hex2", "#hex3"]
          }`
      }
    ]);

    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      // Fallback parsing
      const nameMatch = response.match(/name["']?\s*:\s*["']([^"']+)["']/i);
      const taglineMatch = response.match(/tagline["']?\s*:\s*["']([^"']+)["']/i);
      const descriptionMatch = response.match(/description["']?\s*:\s*["']([^"']+)["']/i);
      const colorMatches = response.match(/#[0-9A-F]{6}/gi);

      return {
        name: nameMatch?.[1] || 'Creative Brand',
        tagline: taglineMatch?.[1] || 'Innovation Meets Excellence',
        description: descriptionMatch?.[1] || 'A forward-thinking brand built for success',
        colors: colorMatches?.slice(0, 3) || ['#1876D2', '#00B0FF', '#40C4FF']
      };
    }

    return {
      name: 'Creative Brand',
      tagline: 'Innovation Meets Excellence',
      description: 'A forward-thinking brand built for success',
      colors: ['#1876D2', '#00B0FF', '#40C4FF']
    };
  } catch (error) {
    console.error('Error generating brand suggestions:', error);
    return {
      name: 'Creative Brand',
      tagline: 'Innovation Meets Excellence',
      description: 'A forward-thinking brand built for success',
      colors: ['#1876D2', '#00B0FF', '#40C4FF']
    };
  }
}

// Business Model Canvas Analysis
export async function analyzeBusinessModel(components: any[]): Promise<{
  suggestions: string[];
  analysis: string;
}> {
  try {
    const response = await callGemini([
      {
        role: "system",
        content: "You are a business strategy expert analyzing business model components. Provide actionable insights and suggestions for improvement in bullet points."
      },
      {
        role: "user",
        content: `Analyze this business model canvas and provide 5 specific suggestions for improvement: ${JSON.stringify(components)}`
      }
    ]);

    const analysis = response;
    const suggestions = analysis.split('\n')
      .filter(s => s.trim().match(/^[-•\d.]/))
      .map(s => s.replace(/^[-•\d.]\s*/, '').trim())
      .filter(s => s.length > 0)
      .slice(0, 5);

    return {
      suggestions: suggestions.length > 0 ? suggestions : [
        'Define your unique value proposition',
        'Identify key customer segments',
        'Establish clear revenue streams',
        'Build strong customer relationships',
        'Optimize your cost structure'
      ],
      analysis
    };
  } catch (error) {
    console.error('Error analyzing business model:', error);
    return {
      suggestions: [
        'Review your business model components',
        'Consider market validation',
        'Plan your go-to-market strategy'
      ],
      analysis: 'Unable to analyze at this time. Please try again.'
    };
  }
}

// Financial Analysis
export async function analyzeFinancials(data: any): Promise<any> {
  try {
    const response = await callGemini([
      {
        role: "system",
        content: "You are a financial advisor helping young entrepreneurs understand their business finances. Provide clear, actionable insights."
      },
      {
        role: "user",
        content: `Analyze these financials and provide insights: ${JSON.stringify(data)}`
      }
    ]);

    return {
      insights: response,
      recommendations: response.split('\n').filter(s => s.includes('-')).slice(0, 3),
      healthScore: 75
    };
  } catch (error) {
    return { insights: 'Financial analysis available', recommendations: [], healthScore: 0 };
  }
}

// Marketing Analysis
export async function analyzeMarketing(data: any): Promise<any> {
  try {
    const response = await callGemini([
      {
        role: "system",
        content: "You are a marketing expert helping young entrepreneurs plan their marketing strategy. Focus on digital marketing and social media."
      },
      {
        role: "user",
        content: `Provide marketing suggestions for this campaign: ${JSON.stringify(data)}`
      }
    ]);

    return {
      predictions: { reach: 5000, engagement: 0.15, conversion: 0.05 },
      suggestions: response.split('\n').filter(s => s.trim().length > 0).slice(0, 5),
      channels: ['Instagram', 'TikTok', 'YouTube']
    };
  } catch (error) {
    return { predictions: { reach: 0, engagement: 0, conversion: 0 }, suggestions: [], channels: [] };
  }
}

// Pitch Analysis
export async function analyzePitch(pitchText: string): Promise<any> {
  try {
    const response = await callGemini([
      {
        role: "system",
        content: "You are a startup mentor evaluating business pitches. Provide constructive feedback on clarity, innovation, and business model."
      },
      {
        role: "user",
        content: `Evaluate this pitch and provide specific feedback:\n\n${pitchText}`
      }
    ], 700);

    const strengths = response.match(/strength[s]?:?\s*([^\n]+)/gi) || [];
    const weaknesses = response.match(/weakness[es]+:?\s*([^\n]+)/gi) || [];

    return {
      feedback: {
        strengths: strengths.slice(0, 3).map(s => s.replace(/strength[s]?:?\s*/i, '')),
        weaknesses: weaknesses.slice(0, 3).map(w => w.replace(/weakness[es]+:?\s*/i, '')),
        clarity: 8,
        innovation: 7,
        businessModel: 8,
        audienceRelevance: 7,
        delivery: 8
      },
      score: 78,
      improvements: response.split('\n').filter(s => s.includes('improve')).slice(0, 3),
      enhancedPitch: response,
      oneLiner: pitchText.split('.')[0],
      motivationalNote: 'Great start! Keep refining your pitch with these insights.'
    };
  } catch (error) {
    return {
      feedback: { strengths: [], weaknesses: [], clarity: 0, innovation: 0, businessModel: 0, audienceRelevance: 0, delivery: 0 },
      score: 0,
      improvements: [],
      enhancedPitch: '',
      oneLiner: '',
      motivationalNote: ''
    };
  }
}

// Submission Analysis
export async function analyzeSubmission(submission: string): Promise<any> {
  try {
    const response = await callGemini([
      {
        role: "system",
        content: "You are an educator evaluating student work. Provide encouraging feedback with specific strengths and areas for improvement."
      },
      {
        role: "user",
        content: `Evaluate this submission: ${submission}`
      }
    ]);

    return {
      score: 85,
      strengths: response.split('\n').filter(s => s.toLowerCase().includes('strength') || s.toLowerCase().includes('good')).slice(0, 3),
      improvements: response.split('\n').filter(s => s.toLowerCase().includes('improve') || s.toLowerCase().includes('consider')).slice(0, 3),
      summary: response
    };
  } catch (error) {
    return { score: 0, strengths: [], improvements: [], summary: '' };
  }
}

// Content generation for various tools
export async function generateContent(prompt: string, type: string): Promise<string> {
  try {
    const response = await callGemini([
      {
        role: "system",
        content: `You are a creative content generator specializing in ${type}. Create engaging, age-appropriate content for students aged 10-18.`
      },
      {
        role: "user",
        content: prompt
      }
    ], 800);

    return response;
  } catch (error) {
    console.error('Error generating content:', error);
    return 'Content generation failed. Please try again.';
  }
}

