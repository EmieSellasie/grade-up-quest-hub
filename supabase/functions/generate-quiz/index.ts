import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, questionCount = 50, includeBlankQuestions = true } = await req.json();

    if (!openAIApiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const mcqCount = Math.ceil(questionCount * 0.7); // 70% multiple choice
    const blankCount = includeBlankQuestions ? questionCount - mcqCount : 0;

    const prompt = `Generate a quiz about "${topic}" with exactly ${questionCount} questions:
    
    ${mcqCount > 0 ? `- ${mcqCount} multiple choice questions with 4 options each` : ''}
    ${blankCount > 0 ? `- ${blankCount} fill-in-the-blank questions` : ''}
    
    Format the response as a JSON array with this structure:
    [
      {
        "id": "1",
        "type": "mcq",
        "question": "Question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 1
      },
      {
        "id": "2", 
        "type": "blank",
        "question": "The capital of France is ____.",
        "correctAnswer": "Paris"
      }
    ]
    
    Make questions challenging but fair, covering different aspects of the topic. For fill-in-the-blank questions, use ____ to indicate where the answer goes.`;

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
            content: 'You are an expert quiz generator. Generate educational quizzes in the exact JSON format requested. Do not include any additional text outside the JSON array.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    
    // Parse the JSON response
    let questions;
    try {
      questions = JSON.parse(generatedContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', generatedContent);
      throw new Error('Invalid response format from OpenAI');
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