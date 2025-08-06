import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileContent } = await req.json();

    if (!fileContent) {
      throw new Error('File content is required');
    }

    console.log('Generating quiz from file content...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a quiz generator. Generate exactly 5 quiz questions from the provided content. Return a JSON array with this exact structure:
[
  {
    "id": "1",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "type": "multiple-choice"
  },
  {
    "id": "2", 
    "question": "Fill in the blank: The capital of France is ___.",
    "correctAnswer": "Paris",
    "type": "fill-in-blank"
  }
]

Mix both multiple-choice and fill-in-blank questions. For multiple-choice, correctAnswer is the index (0-3). For fill-in-blank, correctAnswer is the expected text answer. Only return the JSON array, no other text.`
          },
          {
            role: 'user',
            content: `Generate quiz questions from this content: ${fileContent}`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate quiz');
    }

    const data = await response.json();
    const quizContent = data.choices[0].message.content;
    
    console.log('Generated quiz content:', quizContent);
    
    let questions;
    try {
      questions = JSON.parse(quizContent);
    } catch (parseError) {
      console.error('Failed to parse quiz JSON:', parseError);
      throw new Error('Failed to parse generated quiz');
    }

    return new Response(JSON.stringify({ questions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-quiz function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});