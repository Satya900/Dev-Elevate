import type { APIRoute } from 'astro';
import { submitCode, LANGUAGE_IDS } from '../../lib/judge0';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { code, language, input = '' } = body;

    // Validate input
    if (!code || typeof code !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid code provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get Judge0 language ID
    const languageId = LANGUAGE_IDS[language as keyof typeof LANGUAGE_IDS];
    if (!languageId) {
      return new Response(JSON.stringify({ error: `Unsupported language: ${language}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Submit code to Judge0
    const result = await submitCode(code, languageId, input);

    // Process the result
    const response: { output?: string; error?: string } = {};

    if (result.status.id === 3) { // Accepted
      response.output = result.stdout || 'Program completed successfully with no output';
    } else {
      // Collect all possible error messages
      const errorParts = [
        result.compile_output,
        result.stderr,
        result.message,
        result.status.description
      ].filter(Boolean);

      response.error = errorParts.join('\n');
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Compile API Error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};