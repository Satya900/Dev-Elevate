import type { APIRoute } from 'astro';
import { executeCode } from '../../lib/codeExecutor';
import { supportedLanguages } from '../../lib/languages';
import problems from '../../content/practice/linked-list-problems.json';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { code, languageId, problemId } = body;

    // Validate input
    if (!code || typeof code !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid code provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!languageId || typeof languageId !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid language ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!problemId || typeof problemId !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid problem ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate language
    const language = supportedLanguages.find(lang => lang.id === languageId);
    if (!language) {
      return new Response(JSON.stringify({ error: `Unsupported language: ${languageId}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate problem exists
    if (!problems || !Array.isArray(problems.problems)) {
      return new Response(JSON.stringify({ error: 'Problems data is invalid' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const problem = problems.problems.find(p => p.id === problemId);
    if (!problem) {
      return new Response(JSON.stringify({ error: `Problem not found: ${problemId}` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate test cases
    if (!Array.isArray(problem.testCases) || problem.testCases.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid test cases for problem' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Execute code and run test cases
    const result = await executeCode(code, language, problem.testCases);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Code execution error:', error);
    
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Internal server error',
      details: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}