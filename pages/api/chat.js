import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, systemPrompt } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: systemPrompt || 'You are a helpful tutor.',
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    });

    const reply = response.content?.[0]?.text || "Let's try that again. What's your thinking?";
    
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Anthropic API error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response from tutor',
      details: error.message 
    });
  }
}
