import OpenAI from 'openai';

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not configured. AI features are disabled.');
    }
    openaiClient = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }
  return openaiClient;
}

// Check if OpenAI is available
export function isOpenAIAvailable(): boolean {
  return !!import.meta.env.VITE_OPENAI_API_KEY;
}

// Generate AI response for the learning coach
export async function generateAIResponse(input: string, category: string): Promise<string> {
  try {
    if (!isOpenAIAvailable()) {
      return 'AI features are currently disabled. Please add your OpenAI API key to environment variables.';
    }
    
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
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
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content?.trim() || 'I apologize, but I could not generate a response. Please try asking your question again.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    if (error instanceof Error && error.message.includes('API key not configured')) {
      return 'AI features are currently disabled. Please add your OpenAI API key to environment variables.';
    }
    return 'I apologize, but I encountered an error. Please try asking your question again.';
  }
}

// Generate speech for AI responses
export async function generateSpeech(text: string): Promise<string> {
  try {
    if (!isOpenAIAvailable()) {
      throw new Error('AI features are currently disabled.');
    }
    
    const openai = getOpenAIClient();
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const buffer = await response.arrayBuffer();
    const blob = new Blob([buffer], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
}

// Generate logo using DALL·E
export async function generateLogo(params: {
  name: string;
  tagline?: string;
  personality: string;
  industry: string;
  typography: string;
  colors: string[];
  style: 'icon-text' | 'text-only' | 'emblem';
}): Promise<string> {
  try {
    if (!isOpenAIAvailable()) {
      throw new Error('AI features are currently disabled. Please add your OpenAI API key to environment variables.');
    }
    
    const openai = getOpenAIClient();
    
    const prompt = `Design a high-quality, modern logo for an educational technology brand.

Brand Name: "${params.name}"
${params.tagline ? `Tagline: "${params.tagline}"` : ''}
Brand Personality: ${params.personality}
Industry: ${params.industry}
Typography Style: ${params.typography}
Color Palette: ${params.colors.join(', ')}

Preferred Logo Style: ${params.style}

The logo should be:
- Clean, minimalist, and scalable
- Professional with a modern tech aesthetic
- Balanced and visually appealing
- Suitable for both digital and print media
- With a transparent background
- Using the specified colors thoughtfully
- Following the specified typography style
- Conveying trust and educational expertise

Make it ${params.personality.toLowerCase()} in style while maintaining a professional, tech-forward appearance.
Focus on symbolizing growth, learning, and leadership in the design.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "natural",
      response_format: "url"
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating logo:', error);
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
    if (!isOpenAIAvailable()) {
      return {
        name: 'Sample Brand',
        tagline: 'Your Success Story',
        description: 'A brand focused on success and innovation',
        colors: ['#4F46E5', '#7C3AED', '#EC4899']
      };
    }
    
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a branding expert providing color, typography, and design suggestions based on brand values and industry."
        },
        {
          role: "user",
          content: `Generate brand suggestions for:
            Industry: ${data.industry}
            Target Audience: ${data.target_audience}
            Values: ${data.values.join(', ')}
            
            Please provide:
            1. A unique brand name
            2. A catchy tagline
            3. A brief description
            4. Three brand colors (in hex format)
            
            Format the response as JSON.`
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No content in response');

    try {
      return JSON.parse(content);
    } catch {
      // If JSON parsing fails, try to extract information using regex
      const nameMatch = content.match(/name["']?\s*:\s*["']([^"']+)["']/i);
      const taglineMatch = content.match(/tagline["']?\s*:\s*["']([^"']+)["']/i);
      const descriptionMatch = content.match(/description["']?\s*:\s*["']([^"']+)["']/i);
      const colorMatches = content.match(/#[0-9A-F]{6}/gi);

      return {
        name: nameMatch?.[1] || 'AI Generated Brand',
        tagline: taglineMatch?.[1] || 'Powered by Innovation',
        description: descriptionMatch?.[1] || 'An innovative brand concept',
        colors: colorMatches || ['#4F46E5', '#7C3AED', '#EC4899']
      };
    }
  } catch (error) {
    console.error('Error generating brand suggestions:', error);
    return {
      name: 'Creative Brand',
      tagline: 'Innovation Meets Excellence',
      description: 'A forward-thinking brand built for success',
      colors: ['#4F46E5', '#7C3AED', '#EC4899']
    };
  }
}

// Business Model Canvas Analysis
export async function analyzeBusinessModel(components: any[]): Promise<{
  suggestions: string[];
  analysis: string;
}> {
  try {
    if (!isOpenAIAvailable()) {
      return {
        suggestions: ['Consider your target market', 'Define your value proposition', 'Plan your revenue streams'],
        analysis: 'AI analysis is currently disabled. Please add your OpenAI API key to use this feature.'
      };
    }
    
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a business strategy expert analyzing business model components. Provide actionable insights and suggestions for improvement."
        },
        {
          role: "user",
          content: `Analyze this business model canvas and provide suggestions: ${JSON.stringify(components)}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const analysis = response.choices[0]?.message?.content?.trim() || '';
    const suggestions = analysis.split('\n').filter(s => s.startsWith('- ')).map(s => s.slice(2));

    return {
      suggestions,
      analysis
    };
  } catch (error) {
    console.error('Error analyzing business model:', error);
    return {
      suggestions: ['Review your business model components', 'Consider market validation', 'Plan your go-to-market strategy'],
      analysis: 'Failed to analyze business model. Please try again.'
    };
  }
}

// Simplified stubs for other functions
export async function analyzeFinancials(): Promise<any> {
  return { insights: 'Financial analysis available with OpenAI API key', recommendations: [], healthScore: 0 };
}

export async function analyzeMarketing(): Promise<any> {
  return { predictions: { reach: 0, engagement: 0, conversion: 0 }, suggestions: [], channels: [] };
}

export async function analyzePitch(): Promise<any> {
  return {
    feedback: { strengths: [], weaknesses: [], clarity: 0, innovation: 0, businessModel: 0, audienceRelevance: 0, delivery: 0 },
    score: 0,
    improvements: [],
    enhancedPitch: '',
    oneLiner: '',
    motivationalNote: ''
  };
}

export async function analyzeSubmission(): Promise<any> {
  return { score: 0, strengths: [], improvements: [], summary: '' };
}
