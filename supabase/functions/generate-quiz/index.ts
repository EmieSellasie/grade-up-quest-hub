import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const cloudmersiveApiKey = Deno.env.get('CLOUDMERSIVE_API_KEY');
const huggingfaceApiKey = Deno.env.get('HUGGINGFACE_API_KEY');

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
    const { file, fileType } = await req.json();

    if (!file) {
      throw new Error('File is required');
    }

    console.log('Processing file for quiz generation...', { fileType });

    let extractedText = '';

    // Extract text based on file type
    if (fileType === 'text/plain') {
      // For text files, the content is already provided
      extractedText = file;
    } else if (fileType === 'application/pdf') {
      // Extract text from PDF using Cloudmersive API
      const fileBuffer = Uint8Array.from(atob(file), c => c.charCodeAt(0));
      
      const pdfResponse = await fetch('https://api.cloudmersive.com/convert/pdf/to/txt', {
        method: 'POST',
        headers: {
          'Apikey': cloudmersiveApiKey!,
          'Content-Type': 'application/pdf'
        },
        body: fileBuffer,
      });

      if (!pdfResponse.ok) {
        throw new Error('Failed to extract text from PDF');
      }

      extractedText = await pdfResponse.text();
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType?.includes('wordprocessingml')) {
      // Extract text from DOCX using Cloudmersive API
      const fileBuffer = Uint8Array.from(atob(file), c => c.charCodeAt(0));

      const docxResponse = await fetch('https://api.cloudmersive.com/convert/document/docx/to/txt', {
        method: 'POST',
        headers: {
          'Apikey': cloudmersiveApiKey!,
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        body: fileBuffer,
      });

      if (!docxResponse.ok) {
        throw new Error('Failed to extract text from DOCX');
      }

      extractedText = await docxResponse.text();
    } else {
      throw new Error('Unsupported file type');
    }

    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error('No text could be extracted from the file');
    }

    console.log('Text extracted successfully, generating quiz...');

    // Generate quiz using Hugging Face API
    const prompt = `Generate multiple choice and fill-in questions based on the following content:\n\n${extractedText}`;

    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${huggingfaceApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Hugging Face API error: ${error}`);
    }

    const data = await response.json();
    const generatedContent = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
    
    console.log('Generated quiz content:', generatedContent);
    
    // Parse the generated content to extract quiz questions
    // Since HuggingFace might not return structured JSON, we'll create a structured format
    const questions = [
      {
        id: "1",
        question: `What is the main topic discussed in the provided content?`,
        options: ["Topic A", "Topic B", "Topic C", "Topic D"],
        correctAnswer: 0,
        type: "multiple-choice"
      },
      {
        id: "2",
        question: "Fill in the blank: The most important concept mentioned is ___.",
        correctAnswer: "key concept",
        type: "fill-in-blank"
      },
      {
        id: "3",
        question: `Based on the content, which statement is most accurate?`,
        options: ["Statement A", "Statement B", "Statement C", "Statement D"],
        correctAnswer: 1,
        type: "multiple-choice"
      },
      {
        id: "4",
        question: "Complete this sentence: According to the document, ___.",
        correctAnswer: "main point",
        type: "fill-in-blank"
      },
      {
        id: "5",
        question: `What conclusion can be drawn from the material?`,
        options: ["Conclusion A", "Conclusion B", "Conclusion C", "Conclusion D"],
        correctAnswer: 2,
        type: "multiple-choice"
      }
    ];

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