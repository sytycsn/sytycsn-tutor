import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// Complete Chapter 2 Modules
const CHAPTER_2_MODULES = [
  {
    id: '2.1',
    title: 'The CMDB Serves Its Consumers',
    duration: '15 min',
    concept: 'The CMDB exists to serve processes — not itself',
    presentation: `Let's get something straight before we go any further.

The CMDB is not a trophy. It's not a documentation project. It's not an inventory system you build and admire.

**The CMDB exists to serve consumers.**

Who are those consumers?

**Incident Management** — When something breaks, the service desk needs to know: What CI is affected? What service does it support? What's upstream and downstream? Who owns it?

**Change Management** — Before someone makes a change, they need to know: What's the blast radius? What depends on this CI? Who needs to approve? What could break?

**Problem Management** — When patterns emerge, they need to trace: Which CIs are involved? What's the common thread? Where's the root cause?

**SecOps & Vulnerability Management** — When scans find vulnerabilities, they need to reconcile: Does this asset exist in our CMDB? Who owns it? What's the remediation path? What's impacted if we take it offline to patch?

Every CI, every relationship, every service model — it all exists so these processes can function.

**If your CMDB doesn't serve the consumers, it doesn't matter how accurate it is.**

A perfect CMDB that nobody uses is just an expensive spreadsheet.`,
    engageSetup: `Let's see if this principle is grounded for you.`,
    engageQuestion: `**Scenario:** You're planning a CMDB implementation. The customer says: "We want to discover everything — all servers, all network devices, all endpoints. Complete coverage."

Based on what we just discussed, what's your response? What question do you ask before agreeing to that scope?`,
    assessQuestion: `**Quick check:** In one sentence — why does the CMDB exist?`,
    keyTakeaway: `The CMDB exists to serve processes — Incident, Change, Problem, SecOps. Every scoping decision should start with: "What do the consumers need?"`,
    nextPreview: `Next we'll talk about the universal structure that exists in every customer environment — and why you don't need to know every technology to navigate it.`
  },
  {
    id: '2.2',
    title: 'The Infrastructure Pyramid',
    duration: '15 min',
    concept: 'The structure is universal — discover the flavor',
    presentation: `Here's something that will save you in every engagement:

**The structure is the same everywhere.**

Every customer — cloud or on-prem, startup or Fortune 500, hospital or bank — runs on the same fundamental layers:

• **Physical** — Something runs somewhere (data centers, hardware, facilities)
• **Network** — Things connect somehow (switches, routers, firewalls, load balancers)
• **Compute** — Workloads run on something (servers, VMs, containers, cloud instances)
• **Operating System** — Something gives it identity (Windows, Linux, what's installed)
• **Applications** — Something does the work (databases, web servers, middleware, business apps)
• **Services** — Something delivers value (the business capabilities that matter)

**The pyramid exists in every environment. The flavors change.**

One customer runs VMware on-prem. Another runs everything in AWS. A third has mainframes from the 80s alongside Kubernetes clusters. Different flavors — same structure.

**You don't need to know every technology.** You need to know the structure exists, so when a customer starts talking, you can recognize what layer you're hearing about.

"We've got F5 load balancers in front of our web tier" — that's Network.
"Everything runs in EKS clusters now" — that's Compute (containerized).
"Our core banking app is a 30-year-old COBOL system" — that's Application layer, legacy flavor.

**The skill isn't memorization. It's recognition.**`,
    engageSetup: `Let's test your structural thinking.`,
    engageQuestion: `**Scenario:** You're in a discovery session. The customer says:

"We've got a mix — some stuff in Azure, some on-prem VMware, a few physical appliances for the network team, and our main ERP is a hosted SaaS solution."

You don't need to know Azure or VMware inside-out. But based on the pyramid:

1. What layers are they describing?
2. What's one clarifying question you'd ask to understand how these pieces connect?`,
    assessQuestion: `**Quick check:** Why don't you need to memorize every technology to be effective in discovery sessions?`,
    keyTakeaway: `The pyramid is universal. Flavors change, structure doesn't. Know the layers, recognize what you're hearing, ask questions to discover the specifics.`,
    nextPreview: `Next we'll talk about the gap between how ServiceNow is built and how customers actually operate — and why your job is to bridge them.`
  },
  {
    id: '2.3',
    title: 'Greenfield Meets Brownfield',
    duration: '15 min',
    concept: 'ServiceNow expects a shape — customers have reality — bridge them',
    presentation: `ServiceNow wasn't built in a vacuum.

The platform assumes a certain structure:
• ITIL-aligned processes
• CIs with relationships and dependencies
• Services organized in a taxonomy (CSDM)
• Data models that connect Incidents → CIs → Services → Impact

**This is "greenfield" — the architecture ServiceNow needs to function.**

The platform expects:
• CIs exist and have owners
• Relationships show what depends on what
• Services are defined and mapped to infrastructure
• When something breaks, you can trace impact

**Now here's reality.**

Every customer has:
• Their own IT ecosystem (evolved over years or decades)
• Infrastructure built by people who are mostly gone
• "Temporary" solutions that became permanent
• Tribal knowledge instead of documentation
• Things that don't fit neatly into out-of-box models

**This is "brownfield" — not worse, just real.**

Your job isn't to judge brownfield or force it into greenfield. Your job is to **bridge them**.

You need to understand the customer's reality well enough to determine: How do we build a CMDB that reflects their world AND gives ServiceNow what it needs to function?

**The bridge is the strategy.**`,
    engageSetup: `Let's see how you think about this bridge.`,
    engageQuestion: `**Scenario:** A customer's Change Management process is broken. Changes go in without CI associations because "the CMDB data is never right anyway." The Change Manager says she'll start requiring CIs again "when the data is trustworthy."

You're there to fix the CMDB. But based on what we just discussed about greenfield and brownfield:

What's actually broken here? And what has to be true before CI associations in Change will work?`,
    assessQuestion: `**Quick check:** What does "bridging greenfield and brownfield" actually mean in practical terms?`,
    keyTakeaway: `ServiceNow expects a shape. Customers have reality. Your job is to understand both well enough to build a bridge — a CMDB that reflects their world AND serves the platform's needs.`,
    nextPreview: `Next we'll talk about the skill that makes all of this work — asking the right questions.`
  },
  {
    id: '2.4',
    title: 'The Right Questions',
    duration: '15 min',
    concept: 'Know the fundamentals so you can ask what matters',
    presentation: `Here's the difference between a mediocre CMDB consultant and a great one:

**The mediocre one tries to demonstrate what they know.**
**The great one asks questions that reveal what they need to learn.**

When you walk into a discovery session, you're not there to impress anyone with your ServiceNow knowledge. You're there to understand their world well enough to build something that works.

The fundamentals — the pyramid, the layers, the consumers — give you the structure. They tell you what exists everywhere. But every customer's flavor is different.

**Your job is to discover the flavor through the right questions.**

Not: "What hypervisor are you running?" (too technical, too narrow)
But: "Where do your workloads run? On-prem, cloud, or a mix?" (discovers compute layer)

Not: "Do you have a service taxonomy?" (assumes they speak ServiceNow)
But: "When something breaks, how do you know what business function is affected?" (discovers their reality)

Not: "What's your Discovery schedule?" (jumps to tooling)
But: "What data do your teams actually need when an incident comes in?" (discovers consumer needs)

**The fundamentals tell you what to ask about. The customer tells you what flavor they have.**

You're not there to map their world in your terms. You're there to understand their world so you can bridge it to what ServiceNow needs.`,
    engageSetup: `Let's practice asking the right questions.`,
    engageQuestion: `**Scenario:** You're in a discovery session for a CMDB implementation. The customer's IT Director says:

"We tried this twice before. Both times it fell apart after six months. People stopped updating it, data got stale, everyone went back to spreadsheets and tribal knowledge."

You could start proposing solutions — better governance, automated Discovery, data stewards.

**But what question do you ask first?**

Give me ONE question — the one that would reveal the most about why their previous attempts actually failed.`,
    assessQuestion: `**Quick check:** Why is asking questions more valuable than demonstrating knowledge in early discovery sessions?`,
    keyTakeaway: `The fundamentals tell you what to ask about. The customer tells you their flavor. Your job is to discover their reality through questions — not demonstrate your expertise through answers.`,
    nextPreview: `Finally, we'll talk about how discovery sessions translate into strategy — turning landscape understanding into implementation priorities.`
  },
  {
    id: '2.5',
    title: 'From Discovery to Strategy',
    duration: '15 min',
    concept: 'Discovery sessions produce prioritization, not documentation',
    presentation: `Let's be clear about what discovery sessions are actually for.

**They're not about:**
• Documenting everything the customer has
• Mapping their entire infrastructure
• Becoming an expert in their tech stack
• Creating a comprehensive inventory

**They're about:**
• Understanding the landscape — What exists? What's the shape?
• Identifying the consumers — What processes need CMDB data first?
• Determining priorities — Where do we focus to create value fastest?
• Planning the bridge — How do we get from their reality to a working CMDB?

**Discovery sessions produce strategy, not documentation.**

When you leave those early meetings, you should be able to answer:

1. **What processes are we enabling?** ITSM? SecOps? Change? All of them?
2. **What data do those processes need?** CIs, relationships, services, ownership?
3. **What does their landscape look like?** What flavors at each layer?
4. **Where are the gaps?** What exists that isn't in the CMDB? What's in the CMDB that shouldn't be?
5. **What's the priority?** Where do we focus first to serve the consumers that matter most?

That's the strategy. That's what discovery produces.

**You're not there to learn their infrastructure. You're there to determine how to build a CMDB that serves their processes.**`,
    engageSetup: `Let's put it all together.`,
    engageQuestion: `**Scenario:** You've completed initial discovery sessions at a new customer. Here's what you know:

• ITSM is live but struggling — incidents aren't linked to CIs, no service impact visibility
• SecOps is screaming — vulnerability scans return assets that don't exist in the CMDB
• They have a mix of on-prem VMware, Azure cloud, and some SaaS applications
• The previous CMDB attempt focused on "discovering everything" and collapsed under its own weight
• Change Management gave up on requiring CIs two years ago

**Based on everything we've covered in Chapter 2:**

What's your recommended first priority, and why? Where do you focus the CMDB implementation to create value fastest?`,
    assessQuestion: `**Quick check:** What's the difference between discovery sessions that produce documentation versus discovery sessions that produce strategy?`,
    keyTakeaway: `Discovery sessions aren't about mapping everything. They're about understanding the landscape well enough to prioritize. The output is strategy: What consumers matter? What data do they need? Where do we focus first?`,
    nextPreview: `Chapter 2 Complete. You've learned to think like an architect, not just a technician.`,
    isLastModule: true
  }
];

const TUTOR_SYSTEM_PROMPT = `# SYTYCSN Adaptive Learning Tutor — Aeryn

You are Aeryn, the SYTYCSN AI Tutor. You're a senior ServiceNow architect who teaches the SYTYCSN methodology. You coach practitioners to think strategically about CMDB implementations — not testing their technical knowledge.

## Your Persona

You're direct, confident, and occasionally sharp — but always supportive. You push students to think harder because you know they're capable of more. You don't accept lazy thinking, but you celebrate genuine insight.

Your tone is like a senior architect mentoring a promising junior: challenging but invested in their success.

## Your Core Belief

Nobody knows all of it. The skill isn't memorization — it's knowing the structure exists and being able to discover the flavor through the right questions. You're teaching approach and strategic thinking, not technical trivia.

## Current Module

{MODULE_CONTEXT}

## How You Evaluate Responses

You're NOT testing whether they know specific technologies.

You ARE testing whether they:
- Think about CMDB consumers first (who needs the data?)
- Recognize structural layers without needing to know every flavor
- Ask questions before proposing solutions
- Prioritize based on value to processes, not comprehensiveness
- Understand that discovery produces strategy, not documentation

## Your Coaching Style

- **Direct but encouraging** — Push them to think harder, but acknowledge when they're on track
- **Approach-focused** — Redirect technical answers toward strategic thinking
- **Practical** — Use real scenarios, not abstract theory
- **Concise** — Keep responses under 150 words unless explaining something critical

## Response Patterns

**If they jump to technical details:**
"You know your tech — but what question would you ask first to understand if that's even the right focus?"

**If they jump to solutions:**
"Good instinct, but you're solutioning before understanding. What do you need to learn first?"

**If they think about consumers/processes:**
"Exactly. You're thinking about who needs the data, not just what data exists. That's the shift."

**If they give a good answer:**
Acknowledge it genuinely, then push deeper or move on. Don't over-praise.

**If they defend a strong philosophical position:**
Don't just concede. Push on execution: "Philosophy is solid — now show me execution. How does this play out in Month 1?"

**If they try to derail or joke:**
"Nice try — but let's stay focused on the problem we're solving."

**If they give a weak or incomplete answer:**
Challenge them directly: "That's surface level. Dig deeper — what's the real problem here?"

## Key Phrases to Use

- "Who needs this data and why?"
- "What process are you enabling?"
- "You're thinking in inventory — think in impact."
- "Discovery produces strategy, not documentation."
- "The structure is universal — what's their flavor?"
- "Philosophy is solid — now show me execution."
- "Stop right there. That's the trap."

## Rules

1. Never ask technical trivia questions ("What is X technology?")
2. Always bring it back to: consumers, processes, strategy, prioritization
3. Keep responses punchy — this is dialogue, not lecture
4. One follow-up question at a time
5. Let them land the insight — don't extract it for them
6. Stay in character as Aeryn — confident, direct, invested
7. If they try to derail, redirect firmly but not harshly

## Key Takeaway for This Module

{KEY_TAKEAWAY}`;

export default function Home() {
  const [currentView, setCurrentView] = useState('welcome');
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [modulePhase, setModulePhase] = useState('present');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completedModules, setCompletedModules] = useState([]);
  const [chapterComplete, setChapterComplete] = useState(false);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const messagesEndRef = useRef(null);

  const currentModule = CHAPTER_2_MODULES[currentModuleIndex];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startChapter = () => {
    setCurrentView('module');
    setCurrentModuleIndex(0);
    setModulePhase('present');
    setMessages([]);
    setCompletedModules([]);
    setChapterComplete(false);
    setExchangeCount(0);
  };

  const proceedToEngage = () => {
    setModulePhase('engage');
    setExchangeCount(0);
    setMessages([{
      role: 'assistant',
      content: `${currentModule.engageSetup}\n\n${currentModule.engageQuestion}`
    }]);
  };

  const proceedToAssess = () => {
    setModulePhase('assess');
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `Good work. Let's lock in the learning.\n\n${currentModule.assessQuestion}`
    }]);
  };

  const completeModule = () => {
    setModulePhase('complete');
    if (!completedModules.includes(currentModule.id)) {
      setCompletedModules(prev => [...prev, currentModule.id]);
    }
    if (currentModule.isLastModule) {
      setChapterComplete(true);
      setTimeout(() => setShowCelebration(true), 500);
    }
  };

  const nextModule = () => {
    if (currentModuleIndex < CHAPTER_2_MODULES.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
      setModulePhase('present');
      setMessages([]);
      setExchangeCount(0);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setExchangeCount(prev => prev + 1);

    const conversationHistory = [...messages, { role: 'user', content: userMessage }];

    const systemPrompt = TUTOR_SYSTEM_PROMPT
      .replace('{MODULE_CONTEXT}', `
Module ${currentModule.id}: ${currentModule.title}
Phase: ${modulePhase.toUpperCase()}
Concept: ${currentModule.concept}
Exchange Count: ${exchangeCount + 1}

Core content being taught:
${currentModule.presentation}

${modulePhase === 'engage' ? `
Current question: ${currentModule.engageQuestion}

IMPORTANT: Keep this focused. If they're on the right track after 2-3 exchanges, acknowledge their understanding and let them know they can move to the assessment when ready. Don't drag it out.` : ''}

${modulePhase === 'assess' ? `
Assessment question: ${currentModule.assessQuestion}

IMPORTANT: This is a quick check. If they demonstrate understanding, validate concisely. One solid exchange should be enough.` : ''}
`)
      .replace('{KEY_TAKEAWAY}', currentModule.keyTakeaway);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory.map(m => ({ role: m.role, content: m.content })),
          systemPrompt: systemPrompt
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Technical hiccup on my end. Let's continue — what were you thinking?" 
      }]);
    }
    setIsLoading(false);
  };

  // Celebration Modal
  const CelebrationModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-lg mx-4 border border-green-500/30 shadow-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold text-white mb-2">Chapter 2 Complete!</h2>
          <p className="text-green-400 text-lg mb-6">You're thinking like an architect now.</p>
          
          <div className="bg-slate-700/50 rounded-xl p-4 mb-6 text-left">
            <h3 className="text-green-400 font-semibold mb-3">What You've Mastered:</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>The CMDB exists to serve processes — not itself</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>The Infrastructure Pyramid is universal — flavors change, structure doesn't</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Your job is to bridge greenfield and brownfield</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>The right questions reveal the flavor — that's the skill</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Discovery produces strategy, not documentation</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/aeryn.png" 
              alt="Aeryn" 
              className="w-16 h-16 rounded-full object-cover object-top border-2 border-green-500"
            />
            <p className="text-slate-300 italic text-sm text-left">
              "You're not just configuring ServiceNow anymore. You're thinking about what it means to build something that actually works."
              <br /><span className="text-green-400">— Aeryn</span>
            </p>
          </div>

          <button
            onClick={() => {
              setShowCelebration(false);
              setCurrentView('welcome');
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );

  // Welcome Screen
  if (currentView === 'welcome') {
    return (
      <>
        <Head>
          <title>SYTYCSN Adaptive Learning Tutor</title>
          <meta name="description" content="Learn ServiceNow architecture through scenario-based practice" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white">
          {/* Header */}
          <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="SYTYCSN" className="h-10 w-10" />
                <div>
                  <div className="font-bold text-lg">
                    <span className="text-white">SYTYC</span>
                    <span className="text-green-500">SN</span>
                  </div>
                  <div className="text-xs text-slate-500">Adaptive Learning Tutor</div>
                </div>
              </div>
              <div className="text-green-500 text-sm italic hidden sm:block">
                "Fix the Practice. Unlock the Platform."™
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Aeryn */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
                  <img 
                    src="/aeryn.png" 
                    alt="Aeryn - Your AI Tutor" 
                    className="relative w-64 h-auto object-contain"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-white">Meet Aeryn</h2>
                  <p className="text-green-400 text-sm">Your AI Architecture Mentor</p>
                  <p className="text-slate-400 text-sm mt-2 max-w-xs">
                    I'll challenge your thinking, catch your mistakes, and help you learn to think like a senior architect.
                  </p>
                </div>
              </div>

              {/* Right: Course Info */}
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  <span className="text-white">Learn to </span>
                  <span className="text-green-500">Think</span>
                  <span className="text-white">, Not Just Configure</span>
                </h1>
                <p className="text-slate-300 mb-8">
                  This isn't certification prep. It's architectural thinking training. 
                  Work through real scenarios, get challenged on your reasoning, and develop 
                  the judgment that separates great architects from good technicians.
                </p>

                {/* Chapter Card */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-xl font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Chapter 2: Understanding the Territory</h3>
                      <p className="text-slate-400 text-sm">Before you model it, understand it</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {CHAPTER_2_MODULES.map((mod, idx) => (
                      <div key={mod.id} className="flex items-center gap-3 text-sm">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                          completedModules.includes(mod.id) 
                            ? 'bg-green-600 text-white' 
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {completedModules.includes(mod.id) ? '✓' : idx + 1}
                        </div>
                        <span className={completedModules.includes(mod.id) ? 'text-green-400' : 'text-slate-300'}>
                          {mod.title}
                        </span>
                        <span className="text-slate-600 text-xs ml-auto">{mod.duration}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={startChapter}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-green-500/20"
                  >
                    {completedModules.length > 0 ? 'Continue Learning' : 'Begin Chapter 2'}
                  </button>
                </div>

                <p className="text-center text-slate-500 text-sm">
                  Based on "So You Think You Can ServiceNow" Book 3: CMDB & CSDM
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-800 mt-12">
            <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-sm">© 2026 SYTYCSN Inc. All rights reserved.</p>
              <p className="text-slate-600 text-xs">POC v0.5 — The Architect Simulator</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Module View
  return (
    <>
      <Head>
        <title>{currentModule.id}: {currentModule.title} | SYTYCSN Tutor</title>
      </Head>
      
      {showCelebration && <CelebrationModal />}
      
      <div className="min-h-screen bg-slate-900 text-white flex flex-col">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="SYTYCSN" className="h-8 w-8" />
              <span className="text-slate-600">|</span>
              <span className="text-sm text-green-400 font-medium">{currentModule.id}: {currentModule.title}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {CHAPTER_2_MODULES.map((mod, idx) => (
                  <div
                    key={mod.id}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      completedModules.includes(mod.id) ? 'bg-green-500' :
                      idx === currentModuleIndex ? 'bg-green-400 animate-pulse' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentView('welcome')}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                ← Menu
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6">
            
            {/* PRESENT Phase */}
            {modulePhase === 'present' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-xs px-3 py-1 rounded-full font-medium">LEARN</span>
                  <span className="text-slate-400 text-sm">{currentModule.duration}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-white">{currentModule.title}</h2>
                <p className="text-green-400 italic">{currentModule.concept}</p>
                
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="prose prose-invert max-w-none">
                    {currentModule.presentation.split('\n\n').map((para, idx) => (
                      <p key={idx} className="text-slate-200 leading-relaxed mb-4 last:mb-0">
                        {para.split('**').map((part, i) => 
                          i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
                        )}
                      </p>
                    ))}
                  </div>
                </div>

                <button
                  onClick={proceedToEngage}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-green-500/20 text-lg"
                >
                  Apply This →
                </button>
              </div>
            )}

            {/* ENGAGE & ASSESS Phases */}
            {(modulePhase === 'engage' || modulePhase === 'assess') && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    modulePhase === 'engage' ? 'bg-amber-600' : 'bg-purple-600'
                  }`}>
                    {modulePhase === 'engage' ? 'APPLY' : 'CHECK'}
                  </span>
                  <span className="text-slate-400 text-sm">{currentModule.title}</span>
                </div>

                {/* Messages */}
                <div className="space-y-4 min-h-[300px]">
                  {messages.map((m, idx) => (
                    <div key={idx} className={`flex gap-3 animate-fadeIn ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.role === 'assistant' && (
                        <div className="flex-shrink-0">
                          <img 
                            src="/aeryn.png" 
                            alt="Aeryn" 
                            className="w-10 h-10 rounded-full object-cover object-top border-2 border-green-500/50"
                          />
                        </div>
                      )}
                      <div className={`max-w-lg rounded-xl p-4 ${
                        m.role === 'user' 
                          ? 'bg-green-900/30 border border-green-700/50' 
                          : 'bg-slate-800 border border-slate-700'
                      }`}>
                        {m.role === 'assistant' && (
                          <div className="text-xs text-green-500 font-semibold mb-2">AERYN</div>
                        )}
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                          {m.content.split('**').map((part, i) => 
                            i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start animate-fadeIn">
                      <div className="flex-shrink-0">
                        <img 
                          src="/aeryn.png" 
                          alt="Aeryn" 
                          className="w-10 h-10 rounded-full object-cover object-top border-2 border-green-500/50 animate-pulse"
                        />
                      </div>
                      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                        <div className="text-xs text-green-500 font-semibold mb-2">AERYN</div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex gap-3">
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Share your thinking..."
                    className="flex-1 bg-slate-800 border border-slate-600 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 placeholder-slate-500 transition-all"
                    rows={3}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:text-slate-500 px-6 rounded-xl font-medium transition-colors self-end h-12"
                  >
                    Send
                  </button>
                </div>

                {/* Phase Controls */}
                <div className="flex gap-3 pt-2">
                  {modulePhase === 'engage' && exchangeCount >= 1 && (
                    <button
                      onClick={proceedToAssess}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl text-sm font-medium transition-colors"
                    >
                      Ready for Quick Check →
                    </button>
                  )}
                  {modulePhase === 'assess' && exchangeCount >= 1 && (
                    <button
                      onClick={completeModule}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-medium transition-colors"
                    >
                      Complete Module ✓
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* COMPLETE Phase */}
            {modulePhase === 'complete' && !showCelebration && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <span className="bg-green-600 text-xs px-3 py-1 rounded-full font-medium">✓ COMPLETE</span>
                </div>

                <h2 className="text-3xl font-bold text-white">{currentModule.title}</h2>

                <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-6">
                  <h3 className="text-green-400 font-semibold mb-3">Key Takeaway</h3>
                  <p className="text-slate-200 leading-relaxed">{currentModule.keyTakeaway}</p>
                </div>

                {!currentModule.isLastModule && (
                  <>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                      <h3 className="text-slate-400 font-semibold mb-2">Up Next</h3>
                      <p className="text-slate-300">{currentModule.nextPreview}</p>
                    </div>

                    <button
                      onClick={nextModule}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-green-500/20 text-lg"
                    >
                      Continue to {CHAPTER_2_MODULES[currentModuleIndex + 1]?.title} →
                    </button>
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
