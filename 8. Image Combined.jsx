import React, { useState } from 'react';
import {
  Image, Video, Brain, Book, Palette, Film, Users,
  CheckCircle, AlertCircle, Lightbulb, BookOpen, GraduationCap,
  MessageSquare, PenTool, Eye, XCircle, Play, Sparkles,
  Layers, ArrowRight, Award, RefreshCw
} from 'lucide-react';

// ============================================================
// FILE: 33. Image - 2- Video Conversion
// ============================================================

function HumanitiesImageToVideo() {
  const [activeTab, setActiveTab] = useState('introduction');
  const [activeLesson, setActiveLesson] = useState(0);
  const [selectedExample, setSelectedExample] = useState('literature');
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);

  const humanitiesExamples = {
    literature: {
      title: 'Literature & Poetry Visualization',
      icon: <Book className="w-6 h-6" />,
      prompt: 'The road not taken in a yellow wood, two paths diverging, autumn leaves falling, soft golden light filtering through trees',
      discipline: 'English Literature',
      application: 'Visualizing classic poems, creating book cover concepts, illustrating literary scenes',
      studentProject: 'Students can visualize scenes from novels they are studying, compare their interpretations',
      example: 'Visualize a scene from "The Great Gatsby" - the green light across the bay at night'
    },
    artHistory: {
      title: 'Art History Reconstruction',
      icon: <Palette className="w-6 h-6" />,
      prompt: 'Ancient Roman forum bustling with citizens, marble columns, togas, market stalls, golden afternoon light, classical architecture',
      discipline: 'Art History',
      application: 'Reconstructing lost artworks, visualizing historical art periods, creating comparative studies',
      studentProject: 'Recreate Renaissance paintings in different artistic styles, analyze compositional techniques',
      example: 'Reconstruct how the Parthenon might have looked with its original painted colors'
    },
    history: {
      title: 'Historical Event Reconstruction',
      icon: <Users className="w-6 h-6" />,
      prompt: 'Medieval marketplace in 14th century Paris, merchants selling goods, cobblestone streets, Gothic architecture in background',
      discipline: 'History',
      application: 'Visualizing historical events, understanding daily life in different eras, analyzing material culture',
      studentProject: 'Students visualize historical events from primary source descriptions',
      example: 'Visualize the signing of the Magna Carta based on historical accounts'
    },
    film: {
      title: 'Film Studies & Cinematography',
      icon: <Film className="w-6 h-6" />,
      prompt: 'Film noir scene, detective in fedora standing in rain-soaked street, neon signs reflecting in puddles, dramatic shadows, 1940s atmosphere',
      discipline: 'Film & Media Studies',
      application: 'Analyzing cinematography, creating storyboards, understanding visual composition',
      studentProject: 'Create shot-by-shot visualizations for film analysis papers',
      example: 'Recreate iconic film scenes to analyze lighting and composition techniques'
    },
    culturalStudies: {
      title: 'Cultural Studies & Anthropology',
      icon: <Eye className="w-6 h-6" />,
      prompt: 'Traditional Japanese tea ceremony, tatami room, kimono, matcha preparation, serene atmosphere, natural light through shoji screens',
      discipline: 'Cultural Studies',
      application: 'Documenting cultural practices, visualizing ethnographic research, preserving traditions',
      studentProject: 'Create visual documentation of cultural rituals and practices',
      example: 'Visualize traditional ceremonies from different cultures for comparative analysis'
    }
  };

  const simpleSteps = [
    {
      title: 'Step 1: Describe What You Want',
      subtitle: 'Writing Your Creative Vision',
      analogy: 'Like describing a scene to a friend who will paint it for you',
      whatHappens: 'You write a description in plain English of the image you want to create',
      example: 'A quiet library at sunset, old books, golden light through windows, peaceful atmosphere',
      noTechJargon: 'No coding required - just describe what you want to see in natural language',
      mathematics: 'None needed! Just creative writing skills',
      classroomActivity: 'Have students practice writing detailed, sensory-rich descriptions of scenes from texts they are studying'
    },
    {
      title: 'Step 2: AI Reads Your Description',
      subtitle: 'Understanding Your Words',
      analogy: 'Like a highly trained artist who has studied millions of paintings and can understand exactly what you mean',
      whatHappens: 'The AI converts your words into a format it can work with (like a recipe)',
      example: 'Your words "golden sunset" become a mathematical pattern the AI recognizes',
      noTechJargon: 'Think of it as the AI making a mental image from your description, just like you do when reading a book',
      mathematics: 'Each word gets a score showing how important it is. "Golden" + "Sunset" = High importance for warm colors',
      classroomActivity: 'Discuss how different words evoke different mental images - compare student interpretations'
    },
    {
      title: 'Step 3: AI Starts With Randomness',
      subtitle: 'Beginning the Creative Process',
      analogy: 'Like starting a painting with a blank canvas covered in random colors, which the artist will shape',
      whatHappens: 'The AI begins with a square of random colored dots (visual noise)',
      example: 'Imagine TV static or white noise - completely random and chaotic',
      noTechJargon: 'This randomness ensures each creation is unique, like how no two artists paint exactly the same',
      mathematics: 'Start with 1 million tiny dots, each assigned a random color (like rolling dice)',
      classroomActivity: 'Show students examples of abstract art - discuss how meaning emerges from chaos'
    },
    {
      title: 'Step 4: Gradually Shape the Image',
      subtitle: 'The Refinement Process',
      analogy: 'Like a sculptor gradually chipping away marble to reveal the statue within',
      whatHappens: 'The AI makes tiny improvements to the image over and over (usually 50 times)',
      example: 'Random dots → vague shapes → recognizable objects → detailed final image',
      noTechJargon: 'Each step removes a little randomness and adds more of what you described',
      mathematics: 'If we start at 100% random, each step reduces randomness by 2%, so after 50 steps we have 0% random = clear image',
      classroomActivity: 'Show progression images - discuss how art emerges through revision and refinement'
    },
    {
      title: 'Step 5: Your Image is Complete',
      subtitle: 'The Final Creation',
      analogy: 'Like when a photograph finishes developing in a darkroom',
      whatHappens: 'You now have a unique image that matches your description',
      example: 'A beautiful, detailed image ready to download and use',
      noTechJargon: 'The image belongs to you to use for your projects, presentations, or creative work',
      mathematics: 'Final image contains about 1 million pixels (1024 × 1024), each with a specific color',
      classroomActivity: 'Have students compare their AI-generated images with classical artworks depicting similar themes'
    },
    {
      title: 'Step 6: Analyze the Image',
      subtitle: 'Understanding Depth and Motion',
      analogy: 'Like a film director planning which parts of a scene will move',
      whatHappens: 'The AI figures out what is near and far, and what could realistically move',
      example: 'Sky is far (can drift), trees are mid-distance (can sway), water is near (can ripple)',
      noTechJargon: 'The AI understands the scene like a human would - knowing what should move and how',
      mathematics: 'Each pixel gets a depth score from 0 (very far) to 100 (very close)',
      classroomActivity: 'Discuss perspective in Renaissance art - how artists showed depth before photography'
    },
    {
      title: 'Step 7: Plan the Movement',
      subtitle: 'Choreographing the Animation',
      analogy: 'Like a choreographer planning how dancers will move across the stage',
      whatHappens: 'The AI decides how each part of the image should move to create natural motion',
      example: 'Clouds drift slowly left, leaves fall gently down, water ripples subtly',
      noTechJargon: 'The movement follows natural physics - things move the way they would in real life',
      mathematics: 'Each region gets 2 numbers: how fast to move (speed) and which direction (angle from 0-360 degrees)',
      classroomActivity: 'Analyze motion in classical paintings vs. cinema - how does movement change storytelling?'
    },
    {
      title: 'Step 8: Create the Video Frames',
      subtitle: 'Building the Animation',
      analogy: 'Like drawing each frame of a flip-book animation',
      whatHappens: 'The AI creates many slightly different versions of your image (usually 96 for a 4-second video)',
      example: 'Frame 1 shows clouds here, Frame 2 shows them slightly left, Frame 3 even more left...',
      noTechJargon: 'When played quickly (24 frames per second), these create smooth motion like a movie',
      mathematics: '4 seconds × 24 frames per second = 96 total frames needed',
      classroomActivity: 'Create flip-book animations by hand to understand frame-by-frame motion'
    },
    {
      title: 'Step 9: Your Video is Ready',
      subtitle: 'The Final Product',
      analogy: 'Like when a film editor finishes compiling all the shots into the final movie',
      whatHappens: 'All frames are combined into a video file you can watch and share',
      example: 'A 4-second video clip showing your scene with gentle, realistic motion',
      noTechJargon: 'You can use this in presentations, social media, digital art projects, or research',
      mathematics: 'Final video file is typically 10-15 megabytes (MB), compressed for easy sharing',
      classroomActivity: 'Students create short video essays using their generated content, analyzing the role of AI in creative expression'
    }
  ];

  const teachingPlan = {
    beforeClass: [
      'Review basic concepts of visual representation in art and media',
      'Prepare example prompts from humanities texts (poems, historical documents, novels)',
      'Set up demonstration with pre-selected examples',
      'Create handout with key vocabulary (not technical jargon)',
      'Prepare ethical discussion questions about AI and creativity'
    ],
    inClass: [
      {
        time: '0-10 min',
        activity: 'Introduction & Hook',
        description: 'Show stunning AI-generated video examples from famous literary scenes or historical moments',
        materials: 'Projector, examples of AI art',
        engagement: 'Ask: "How might this technology change how we study and teach humanities?"'
      },
      {
        time: '10-25 min',
        activity: 'Demonstration',
        description: 'Live demonstration: Generate an image from a poem students have read',
        materials: 'Computer with AI access, projector',
        engagement: 'Students suggest descriptive words to add to prompt, vote on best description'
      },
      {
        time: '25-40 min',
        activity: 'Hands-on Practice',
        description: 'Students work in pairs to create prompts from assigned texts',
        materials: 'Worksheets with text excerpts, laptops/tablets',
        engagement: 'Pairs share their prompts and discuss interpretation differences'
      },
      {
        time: '40-55 min',
        activity: 'Critical Discussion',
        description: 'Discuss implications: authenticity, creativity, authorship, ethics',
        materials: 'Discussion questions handout',
        engagement: 'Small group discussions followed by whole class dialogue'
      },
      {
        time: '55-60 min',
        activity: 'Wrap-up & Assignment',
        description: 'Explain assessment project, answer questions',
        materials: 'Project guidelines handout',
        engagement: 'Students begin brainstorming their project topics'
      }
    ],
    afterClass: [
      'Provide access to AI tools for student projects',
      'Create discussion forum for students to share and critique work',
      'Office hours for technical assistance',
      'Collect and curate best student examples for future classes'
    ]
  };

  const assessmentQuestions = [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'How is AI image generation similar to traditional artistic processes?',
      options: [
        'Both require expensive equipment and years of training',
        'Both start with a vision/idea and refine it through iterations',
        'Both produce exactly the same result every time',
        'Both require knowledge of computer programming'
      ],
      correct: 1,
      explanation: 'Like traditional artists who sketch, refine, and rework their creations, AI iteratively improves an image through many steps.',
      humanities: 'This connects to artistic practice throughout history - from Renaissance masters creating multiple studies to modern filmmakers shooting many takes.'
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'Why does the AI start with random noise instead of a blank canvas?',
      options: [
        'To make the process take longer',
        'Because it cannot create something from nothing',
        'To ensure each creation is unique and unpredictable',
        'It is a mistake in the programming'
      ],
      correct: 2,
      explanation: 'Starting with randomness ensures variety and uniqueness - like how no two performances of a play are identical.',
      humanities: 'This relates to concepts of creativity and originality in the arts - the role of chance and interpretation in creative work.'
    },
    {
      id: 'q3',
      type: 'short-answer',
      question: 'Describe a scene from a book you have read that you would want to visualize with AI. What details would you include in your description?',
      rubric: 'Look for: specific sensory details, understanding of visual elements, connection to text, creative interpretation',
      humanities: 'This assesses close reading skills, descriptive writing ability, and visual thinking - all key humanities competencies.'
    },
    {
      id: 'q4',
      type: 'critical-thinking',
      question: 'Some artists argue that AI-generated art is not "real" art because a human did not physically create it. Others say the human creativity is in the prompt writing. What is your position? Defend your answer.',
      rubric: 'Evaluate: clarity of position, use of evidence, consideration of multiple perspectives, engagement with concepts of authorship and creativity',
      humanities: 'This engages with fundamental questions in aesthetics, authorship theory, and the philosophy of art.'
    },
    {
      id: 'q5',
      type: 'application',
      question: 'How could this technology be used ethically in historical research? What concerns should historians have about using AI to "reconstruct" the past?',
      rubric: 'Assess: understanding of historical methodology, ethical reasoning, critical thinking about technology, awareness of bias and interpretation',
      humanities: 'This connects technology to core humanities concerns about truth, representation, and the politics of knowledge.'
    }
  ];

  const studentProjects = [
    {
      title: 'Literary Visualization Project',
      description: 'Create a visual interpretation of a classic text',
      requirements: [
        'Choose 3 key scenes from a novel or poem',
        'Write detailed prompts for each scene',
        'Generate images and convert to video',
        'Write 500-word reflection on interpretation choices',
        'Present to class, comparing with classmates\' interpretations'
      ],
      rubric: {
        'Textual Understanding': '25% - Accuracy and depth of engagement with source text',
        'Descriptive Writing': '25% - Quality and detail of prompts',
        'Visual Interpretation': '25% - Thoughtfulness of creative choices',
        'Critical Reflection': '25% - Analysis of process and results'
      },
      examples: 'Visualize the opening of "Pride and Prejudice", the climax of "1984", or a stanza from "The Waste Land"'
    },
    {
      title: 'Historical Reconstruction Essay',
      description: 'Use AI to visualize a historical period or event',
      requirements: [
        'Research a historical period using primary sources',
        'Create 5 visualizations based on historical evidence',
        'Write 1000-word essay explaining your reconstruction choices',
        'Cite historical sources for each visual element',
        'Discuss limitations and potential biases in AI reconstruction'
      ],
      rubric: {
        'Historical Research': '30% - Quality and appropriateness of sources',
        'Visual Accuracy': '25% - Fidelity to historical evidence',
        'Critical Analysis': '25% - Awareness of limitations and bias',
        'Written Communication': '20% - Clarity and organization of essay'
      },
      examples: 'Reconstruct ancient Alexandria, visualize the French Revolution, depict medieval daily life'
    },
    {
      title: 'Comparative Media Analysis',
      description: 'Compare traditional and AI-generated visual representations',
      requirements: [
        'Select a famous painting or photograph',
        'Generate AI version with similar prompt',
        'Create video animations of both',
        'Write comparative analysis (750 words)',
        'Present findings about differences in style, mood, interpretation'
      ],
      rubric: {
        'Visual Analysis': '30% - Detailed observation and comparison',
        'Conceptual Understanding': '30% - Grasp of artistic and media concepts',
        'Critical Thinking': '25% - Depth of analysis and insight',
        'Presentation': '15% - Clarity and professionalism'
      },
      examples: 'Compare Monet\'s "Water Lilies" with AI-generated impressionist landscapes'
    }
  ];

  const ethicalConsiderations = [
    {
      question: 'Who owns AI-generated art?',
      perspectives: [
        'The person who wrote the prompt (provided the creative direction)',
        'The AI company that created the tool',
        'The artists whose work trained the AI',
        'No one - it should be public domain'
      ],
      discussion: 'Current copyright law is unclear on this. What seems fair? What are the implications for artists?'
    },
    {
      question: 'Should AI art be labeled as such?',
      perspectives: [
        'Yes - transparency is important for audiences',
        'No - it is just a tool like Photoshop or a paintbrush',
        'Only in certain contexts (academic work, journalism)',
        'It depends on the purpose and use'
      ],
      discussion: 'Consider parallels to other technological advances in art history - photography, digital art, etc.'
    },
    {
      question: 'Can AI "understand" culture and history accurately?',
      perspectives: [
        'No - it lacks lived experience and cultural context',
        'It can reproduce patterns but not true understanding',
        'It can be as accurate as its training data allows',
        'Understanding is not necessary for useful representation'
      ],
      discussion: 'What are the risks of using AI to depict historical events or cultural practices? Who should be involved in these representations?'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border-t-4 border-purple-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-xl shadow-lg">
                <Palette className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">AI Image-to-Video for Humanities</h1>
                <p className="text-gray-600 mt-1">A Complete Guide for Non-Technical Students & Educators</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-lg border-2 border-purple-300">
              <p className="text-sm font-semibold text-purple-900">Generated by</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">BDI Lab</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <p className="text-sm text-gray-700">
              <strong className="text-orange-900">For Humanities Students:</strong> No technical background required! This guide uses everyday language, creative analogies, and humanities examples to help you understand and use AI image and video generation in your studies.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 flex flex-wrap gap-2">
          {['introduction', 'simple-steps', 'examples', 'teaching', 'assessment', 'ethics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg font-semibold transition-all text-sm ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Introduction Tab */}
        {activeTab === 'introduction' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is AI Image & Video Generation?</h2>
            
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl mb-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">In Simple Terms...</h3>
              <p className="text-gray-700 text-lg mb-3">
                AI image generation is like having an incredibly skilled artist who has studied millions of paintings, photographs, and artworks. 
                You describe what you want in plain English, and the AI creates a unique image matching your description.
              </p>
              <p className="text-gray-700 text-lg">
                AI video generation then brings that image to life, adding subtle motion like a gentle breeze moving leaves or clouds drifting across the sky.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-300">
                <Book className="w-10 h-10 text-amber-600 mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Why This Matters for Humanities</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✦</span>
                    <span><strong>Literature:</strong> Visualize scenes from novels and poems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✦</span>
                    <span><strong>History:</strong> Reconstruct historical events and periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✦</span>
                    <span><strong>Art History:</strong> Study artistic styles and movements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✦</span>
                    <span><strong>Film Studies:</strong> Analyze cinematography and composition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✦</span>
                    <span><strong>Cultural Studies:</strong> Document and visualize cultural practices</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300">
                <Lightbulb className="w-10 h-10 text-purple-600 mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">No Technical Skills Required!</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>No coding or programming knowledge needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>No mathematical expertise required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Use your creative and descriptive writing skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Focus on interpretation and critical thinking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Apply your humanities knowledge and perspective</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-rose-50 p-6 rounded-xl border-2 border-rose-300 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-rose-600" />
                What You Will Learn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Understanding the Process</p>
                  <p className="text-gray-700">How AI creates images and videos using simple, non-technical explanations</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Practical Applications</p>
                  <p className="text-gray-700">How to use this technology in your humanities coursework and research</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Critical Thinking</p>
                  <p className="text-gray-700">Ethical implications, limitations, and cultural considerations of AI art</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simple Steps Tab */}
        {activeTab === 'simple-steps' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9 Simple Steps: How It Works</h2>
              <p className="text-gray-600 mb-4">Click on each step to learn more. No technical jargon - just clear explanations!</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {simpleSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveLesson(idx)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeLesson === idx
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Step {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl mb-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{simpleSteps[activeLesson].title}</h3>
                <p className="text-lg opacity-90">{simpleSteps[activeLesson].subtitle}</p>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
                  <h4 className="font-bold text-blue-900 mb-3 text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Think of It Like This...
                  </h4>
                  <p className="text-gray-700 text-lg">{simpleSteps[activeLesson].analogy}</p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
                  <h4 className="font-bold text-green-900 mb-3 text-lg">What Actually Happens</h4>
                  <p className="text-gray-700">{simpleSteps[activeLesson].whatHappens}</p>
                </div>

                <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-600">
                  <h4 className="font-bold text-amber-900 mb-3 text-lg">Real Example</h4>
                  <p className="text-gray-700 italic">"{simpleSteps[activeLesson].example}"</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
                  <h4 className="font-bold text-purple-900 mb-3 text-lg">In Plain English (No Tech Speak!)</h4>
                  <p className="text-gray-700">{simpleSteps[activeLesson].noTechJargon}</p>
                </div>

                <div className="bg-rose-50 p-6 rounded-xl border-l-4 border-rose-600">
                  <h4 className="font-bold text-rose-900 mb-3 text-lg">Simple Math (If You Are Curious)</h4>
                  <p className="text-gray-700">{simpleSteps[activeLesson].mathematics}</p>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-600">
                  <h4 className="font-bold text-indigo-900 mb-3 text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Classroom Activity Idea
                  </h4>
                  <p className="text-gray-700">{simpleSteps[activeLesson].classroomActivity}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
                  disabled={activeLesson === 0}
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    activeLesson === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-800'
                  }`}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setActiveLesson(Math.min(simpleSteps.length - 1, activeLesson + 1))}
                  disabled={activeLesson === simpleSteps.length - 1}
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    activeLesson === simpleSteps.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Humanities Examples & Applications</h2>
              <p className="text-gray-600 mb-4">See how different humanities disciplines can use this technology</p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.keys(humanitiesExamples).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedExample(key)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedExample === key
                        ? 'border-purple-600 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-center mb-2 text-purple-600">
                      {humanitiesExamples[key].icon}
                    </div>
                    <p className="text-xs font-semibold text-center text-gray-900">{humanitiesExamples[key].discipline}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-xl text-white">
                  {humanitiesExamples[selectedExample].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{humanitiesExamples[selectedExample].title}</h3>
                  <p className="text-purple-600 font-semibold">{humanitiesExamples[selectedExample].discipline}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-300">
                  <h4 className="font-bold text-blue-900 mb-3 text-lg">Example Prompt</h4>
                  <p className="text-gray-800 italic text-lg bg-white p-4 rounded border border-blue-200">
                    "{humanitiesExamples[selectedExample].prompt}"
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
                  <h4 className="font-bold text-green-900 mb-3">How to Use This</h4>
                  <p className="text-gray-700">{humanitiesExamples[selectedExample].application}</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
                  <h4 className="font-bold text-purple-900 mb-3">Student Project Idea</h4>
                  <p className="text-gray-700">{humanitiesExamples[selectedExample].studentProject}</p>
                </div>

                <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-600">
                  <h4 className="font-bold text-amber-900 mb-3">Specific Example</h4>
                  <p className="text-gray-700">{humanitiesExamples[selectedExample].example}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teaching Tab */}
        {activeTab === 'teaching' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Teaching Guide for Instructors</h2>
            
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-xl mb-8 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">60-Minute Class Plan</h3>
              <p className="text-gray-700">A complete lesson plan for introducing AI image-to-video generation to humanities students</p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Before Class</h3>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <ul className="space-y-3">
                    {teachingPlan.beforeClass.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">During Class</h3>
                <div className="space-y-4">
                  {teachingPlan.inClass.map((segment, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-300">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex-shrink-0">
                          {segment.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{segment.activity}</h4>
                          <p className="text-gray-700 mb-3">{segment.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="bg-white p-3 rounded border border-amber-200">
                              <p className="font-semibold text-gray-900 mb-1">Materials:</p>
                              <p className="text-gray-700">{segment.materials}</p>
                            </div>
                            <div className="bg-white p-3 rounded border border-amber-200">
                              <p className="font-semibold text-gray-900 mb-1">Engagement:</p>
                              <p className="text-gray-700">{segment.engagement}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">After Class</h3>
                <div className="bg-green-50 p-6 rounded-xl">
                  <ul className="space-y-3">
                    {teachingPlan.afterClass.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-rose-50 p-6 rounded-xl border-2 border-rose-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Student Project Options</h3>
                <div className="space-y-6">
                  {studentProjects.map((project, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-rose-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h4>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      
                      <div className="mb-4">
                        <p className="font-semibold text-gray-900 mb-2">Requirements:</p>
                        <ul className="space-y-1 text-sm">
                          {project.requirements.map((req, reqIdx) => (
                            <li key={reqIdx} className="flex items-start gap-2">
                              <span className="text-rose-600">•</span>
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-rose-50 p-4 rounded">
                        <p className="font-semibold text-gray-900 mb-2">Grading Rubric:</p>
                        <div className="space-y-1 text-sm">
                          {Object.entries(project.rubric).map(([criterion, description]) => (
                            <div key={criterion}>
                              <span className="font-semibold text-gray-900">{criterion}:</span>
                              <span className="text-gray-700"> {description}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-gray-600 italic">
                        Examples: {project.examples}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessment Tab */}
        {activeTab === 'assessment' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Student Assessment & Exercises</h2>
            
            <div className="bg-blue-50 p-6 rounded-xl mb-8 border-l-4 border-blue-600">
              <p className="text-gray-700">
                <strong>For Students:</strong> These questions test your understanding of AI image generation and help you think critically about its use in humanities research and creative work.
              </p>
            </div>

            <div className="space-y-6">
              {assessmentQuestions.map((question, idx) => (
                <div key={question.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{question.question}</h3>
                      
                      {question.type === 'multiple-choice' && (
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optIdx) => (
                            <label key={optIdx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-purple-200 hover:bg-purple-50 cursor-pointer">
                              <input
                                type="radio"
                                name={question.id}
                                value={optIdx}
                                onChange={(e) => {
                                  setAssessmentAnswers({...assessmentAnswers, [question.id]: parseInt(e.target.value)});
                                  setShowFeedback(false);
                                }}
                                className="mt-1"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {question.type === 'short-answer' && (
                        <div className="mb-4">
                          <textarea
                            className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
                            rows="4"
                            placeholder="Write your answer here..."
                          />
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>What we are looking for:</strong> {question.rubric}
                          </p>
                        </div>
                      )}

                      {question.type === 'critical-thinking' && (
                        <div className="mb-4">
                          <textarea
                            className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
                            rows="6"
                            placeholder="Develop your argument here. Consider multiple perspectives..."
                          />
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Evaluation criteria:</strong> {question.rubric}
                          </p>
                        </div>
                      )}

                      {question.type === 'application' && (
                        <div className="mb-4">
                          <textarea
                            className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
                            rows="5"
                            placeholder="Your response..."
                          />
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Assessment focus:</strong> {question.rubric}
                          </p>
                        </div>
                      )}

                      {showFeedback && question.type === 'multiple-choice' && assessmentAnswers[question.id] !== undefined && (
                        <div className={`p-4 rounded-lg ${assessmentAnswers[question.id] === question.correct ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                          <p className="font-semibold mb-2">
                            {assessmentAnswers[question.id] === question.correct ? '✓ Correct!' : '✗ Not quite'}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">{question.explanation}</p>
                          <p className="text-sm text-gray-600 italic">{question.humanities}</p>
                        </div>
                      )}

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                        <p className="text-sm text-blue-900">
                          <strong>Why this matters in humanities:</strong> {question.humanities}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setShowFeedback(true)}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Check Multiple Choice Answers
              </button>
            </div>
          </div>
        )}

        {/* Ethics Tab */}
        {activeTab === 'ethics' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ethical Considerations & Critical Questions</h2>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-xl mb-8 border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Why Ethics Matter</h3>
              <p className="text-gray-700 mb-3">
                As humanities scholars, we must think critically about new technologies. AI raises important questions about creativity, 
                authorship, cultural representation, and power.
              </p>
              <p className="text-gray-700">
                These are not just technical questions - they are fundamentally humanistic questions about what it means to create, 
                who has authority to represent cultures and histories, and how technology shapes society.
              </p>
            </div>

            <div className="space-y-8">
              {ethicalConsiderations.map((consideration, idx) => (
                <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                    {consideration.question}
                  </h3>
                  
                  <div className="mb-6">
                    <p className="font-semibold text-gray-900 mb-3">Different Perspectives:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {consideration.perspectives.map((perspective, pIdx) => (
                        <div key={pIdx} className="bg-white p-4 rounded-lg border border-purple-200">
                          <div className="flex items-start gap-2">
                            <span className="text-purple-600 font-bold">{pIdx + 1}.</span>
                            <p className="text-gray-700 text-sm">{perspective}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                    <p className="font-semibold text-amber-900 mb-2">Discussion Prompt:</p>
                    <p className="text-gray-700 text-sm">{consideration.discussion}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-xl border-2 border-blue-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Critical Questions for Class Discussion</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-800">• How does AI image generation relate to historical debates about photography and artistic authenticity?</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-800">• What are the implications of AI trained primarily on Western art for representing non-Western cultures?</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-800">• Should historians use AI to reconstruct historical events? What are the ethical boundaries?</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-800">• How might AI change the role of the artist, writer, or creative professional?</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-800">• What responsibilities do we have when using AI to represent cultures or historical periods we are not part of?</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600">
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              <strong>Educational Resource:</strong> Designed specifically for humanities students and educators with no technical background required
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Developed & Generated by</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                BDI Lab
              </p>
              <p className="text-sm text-gray-600">Blockchain & Distributed Intelligence Laboratory</p>
              <p className="text-xs text-gray-500 mt-2">Penn State University</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const IMAGE_RECOGNITION_PY = [
  "\"\"\"",
  "IMAGE RECOGNITION WITH CONVOLUTIONAL NEURAL NETWORKS",
  "Complete Python Implementation Guide",
  "",
  "This file contains production-ready code for:",
  "1. Building CNNs from scratch",
  "2. Image classification on MNIST and CIFAR-10",
  "3. Transfer learning with pre-trained models",
  "4. Feature visualization",
  "5. Real-time inference",
  "6. Complete training pipelines",
  "\"\"\"",
  "",
  "import numpy as np",
  "import tensorflow as tf",
  "from tensorflow import keras",
  "from tensorflow.keras import layers, models",
  "from tensorflow.keras.datasets import mnist, cifar10",
  "from tensorflow.keras.utils import to_categorical",
  "from tensorflow.keras.applications import ResNet50",
  "from tensorflow.keras.preprocessing import image",
  "from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions",
  "import matplotlib.pyplot as plt",
  "from sklearn.metrics import classification_report, confusion_matrix",
  "import time",
  "",
  "print(\"=\"*80)",
  "print(\"IMAGE RECOGNITION WITH CNN - COMPLETE IMPLEMENTATION\")",
  "print(\"=\"*80)",
  "",
  "# =============================================================================",
  "# 1. UNDERSTANDING IMAGE DATA",
  "# =============================================================================",
  "",
  "def demonstrate_image_data():",
  "    \"\"\"Show how images are represented as numerical arrays\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"1. UNDERSTANDING IMAGE DATA\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Load sample MNIST image",
  "    (x_train, y_train), _ = mnist.load_data()",
  "    sample_image = x_train[0]",
  "    sample_label = y_train[0]",
  "    ",
  "    print(f\"\\\\n📊 Image Properties:\")",
  "    print(f\"   Shape: {sample_image.shape}\")",
  "    print(f\"   Data type: {sample_image.dtype}\")",
  "    print(f\"   Value range: [{sample_image.min()}, {sample_image.max()}]\")",
  "    print(f\"   Label: {sample_label}\")",
  "    print(f\"   Total pixels: {sample_image.size:,}\")",
  "    ",
  "    print(f\"\\\\n🔢 Pixel values (top-left 8x8 region):\")",
  "    print(sample_image[:8, :8])",
  "    ",
  "    print(f\"\\\\n💾 Memory usage: {sample_image.nbytes} bytes\")",
  "    print(f\"   For 60,000 images: {(x_train.nbytes / 1024**2):.2f} MB\")",
  "    ",
  "    return sample_image, sample_label",
  "",
  "",
  "# =============================================================================",
  "# 2. MANUAL CONVOLUTION IMPLEMENTATION",
  "# =============================================================================",
  "",
  "def manual_convolution():",
  "    \"\"\"Implement convolution from scratch to understand the operation\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"2. CONVOLUTION FROM SCRATCH\")",
  "    print(\"=\"*80)",
  "    ",
  "    def convolve2d(image, kernel):",
  "        \"\"\"Apply 2D convolution\"\"\"",
  "        img_h, img_w = image.shape",
  "        ker_h, ker_w = kernel.shape",
  "        ",
  "        # Calculate output dimensions",
  "        out_h = img_h - ker_h + 1",
  "        out_w = img_w - ker_w + 1",
  "        ",
  "        output = np.zeros((out_h, out_w))",
  "        ",
  "        # Perform convolution",
  "        for i in range(out_h):",
  "            for j in range(out_w):",
  "                # Extract patch",
  "                patch = image[i:i+ker_h, j:j+ker_w]",
  "                # Element-wise multiplication and sum",
  "                output[i, j] = np.sum(patch * kernel)",
  "        ",
  "        return output",
  "    ",
  "    # Create test image",
  "    test_image = np.array([",
  "        [0, 0, 0, 255, 255, 255],",
  "        [0, 0, 0, 255, 255, 255],",
  "        [0, 0, 0, 255, 255, 255],",
  "        [0, 0, 0, 255, 255, 255],",
  "        [0, 0, 0, 255, 255, 255],",
  "        [0, 0, 0, 255, 255, 255]",
  "    ], dtype=np.float32)",
  "    ",
  "    # Different kernels",
  "    kernels = {",
  "        'Vertical Edge': np.array([[-1, 0, 1],",
  "                                   [-1, 0, 1],",
  "                                   [-1, 0, 1]]),",
  "        'Horizontal Edge': np.array([[-1, -1, -1],",
  "                                     [ 0,  0,  0],",
  "                                     [ 1,  1,  1]]),",
  "        'Sharpen': np.array([[ 0, -1,  0],",
  "                            [-1,  5, -1],",
  "                            [ 0, -1,  0]])",
  "    }",
  "    ",
  "    print(f\"\\\\n📐 Input image shape: {test_image.shape}\")",
  "    print(f\"Input:\\\\n{test_image.astype(int)}\")",
  "    ",
  "    for name, kernel in kernels.items():",
  "        result = convolve2d(test_image, kernel)",
  "        print(f\"\\\\n🔍 {name} Detection:\")",
  "        print(f\"   Kernel:\\\\n{kernel}\")",
  "        print(f\"   Output shape: {result.shape}\")",
  "        print(f\"   Output:\\\\n{result.astype(int)}\")",
  "",
  "",
  "# =============================================================================",
  "# 3. BUILD CNN FOR MNIST (DIGIT CLASSIFICATION)",
  "# =============================================================================",
  "",
  "def build_mnist_cnn():",
  "    \"\"\"Build and train CNN for MNIST digit recognition\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"3. MNIST DIGIT CLASSIFICATION WITH CNN\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Load data",
  "    print(\"\\\\n📥 Loading MNIST dataset...\")",
  "    (x_train, y_train), (x_test, y_test) = mnist.load_data()",
  "    ",
  "    print(f\"   Training samples: {x_train.shape[0]:,}\")",
  "    print(f\"   Test samples: {x_test.shape[0]:,}\")",
  "    print(f\"   Image size: {x_train.shape[1]}×{x_train.shape[2]}\")",
  "    print(f\"   Classes: {len(np.unique(y_train))}\")",
  "    ",
  "    # Preprocess",
  "    x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0",
  "    x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0",
  "    ",
  "    y_train_cat = to_categorical(y_train, 10)",
  "    y_test_cat = to_categorical(y_test, 10)",
  "    ",
  "    # Build model",
  "    print(\"\\\\n🏗️  Building CNN Architecture...\")",
  "    model = models.Sequential([",
  "        # Conv Block 1",
  "        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1), name='conv1'),",
  "        layers.MaxPooling2D((2, 2), name='pool1'),",
  "        ",
  "        # Conv Block 2",
  "        layers.Conv2D(64, (3, 3), activation='relu', name='conv2'),",
  "        layers.MaxPooling2D((2, 2), name='pool2'),",
  "        ",
  "        # Conv Block 3",
  "        layers.Conv2D(64, (3, 3), activation='relu', name='conv3'),",
  "        ",
  "        # Classifier",
  "        layers.Flatten(name='flatten'),",
  "        layers.Dense(64, activation='relu', name='fc1'),",
  "        layers.Dropout(0.5, name='dropout'),",
  "        layers.Dense(10, activation='softmax', name='output')",
  "    ], name='MNIST_CNN')",
  "    ",
  "    # Display architecture",
  "    print(\"\\\\n\" + \"=\"*60)",
  "    model.summary()",
  "    print(\"=\"*60)",
  "    ",
  "    # Compile",
  "    model.compile(",
  "        optimizer='adam',",
  "        loss='categorical_crossentropy',",
  "        metrics=['accuracy']",
  "    )",
  "    ",
  "    # Train",
  "    print(\"\\\\n🎓 Training CNN...\")",
  "    history = model.fit(",
  "        x_train, y_train_cat,",
  "        batch_size=128,",
  "        epochs=5,",
  "        validation_split=0.1,",
  "        verbose=1",
  "    )",
  "    ",
  "    # Evaluate",
  "    print(\"\\\\n📊 Evaluating on Test Set...\")",
  "    test_loss, test_accuracy = model.evaluate(x_test, y_test_cat, verbose=0)",
  "    ",
  "    print(f\"\\\\n✅ RESULTS:\")",
  "    print(f\"   Test Accuracy: {test_accuracy*100:.2f}%\")",
  "    print(f\"   Test Loss: {test_loss:.4f}\")",
  "    ",
  "    # Make predictions",
  "    print(\"\\\\n🔮 Sample Predictions:\")",
  "    predictions = model.predict(x_test[:10], verbose=0)",
  "    ",
  "    for i in range(10):",
  "        pred_class = np.argmax(predictions[i])",
  "        true_class = y_test[i]",
  "        confidence = predictions[i][pred_class] * 100",
  "        ",
  "        status = \"✓\" if pred_class == true_class else \"✗\"",
  "        print(f\"   {status} Image {i+1}: True={true_class}, Pred={pred_class}, Confidence={confidence:.2f}%\")",
  "    ",
  "    return model, history",
  "",
  "",
  "# =============================================================================",
  "# 4. VISUALIZE LEARNED FEATURES",
  "# =============================================================================",
  "",
  "def visualize_cnn_features(model):",
  "    \"\"\"Visualize what the CNN has learned\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"4. VISUALIZING LEARNED FEATURES\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Get Conv1 filters",
  "    conv1_weights = model.get_layer('conv1').get_weights()[0]",
  "    print(f\"\\\\n🔍 Conv1 Filters:\")",
  "    print(f\"   Shape: {conv1_weights.shape}\")",
  "    print(f\"   Number of filters: {conv1_weights.shape[-1]}\")",
  "    print(f\"   Kernel size: {conv1_weights.shape[0]}×{conv1_weights.shape[1]}\")",
  "    ",
  "    # Show filter statistics",
  "    print(f\"\\\\n📊 Filter Statistics:\")",
  "    print(f\"   Min value: {conv1_weights.min():.4f}\")",
  "    print(f\"   Max value: {conv1_weights.max():.4f}\")",
  "    print(f\"   Mean value: {conv1_weights.mean():.4f}\")",
  "    print(f\"   Std dev: {conv1_weights.std():.4f}\")",
  "    ",
  "    # Create activation model",
  "    layer_outputs = [layer.output for layer in model.layers[:6]]",
  "    activation_model = keras.Model(inputs=model.input, outputs=layer_outputs)",
  "    ",
  "    # Get sample image",
  "    (x_test, _), _ = mnist.load_data()",
  "    sample = x_test[0:1].reshape(-1, 28, 28, 1).astype('float32') / 255.0",
  "    ",
  "    # Get activations",
  "    activations = activation_model.predict(sample, verbose=0)",
  "    ",
  "    print(f\"\\\\n📈 Layer Activations:\")",
  "    layer_names = ['conv1', 'pool1', 'conv2', 'pool2', 'conv3', 'flatten']",
  "    for name, activation in zip(layer_names, activations):",
  "        print(f\"   {name:10s}: {activation.shape}\")",
  "        if 'conv' in name:",
  "            n_active = np.sum(activation > 0)",
  "            total = activation.size",
  "            print(f\"              {n_active}/{total} neurons active ({n_active/total*100:.1f}%)\")",
  "",
  "",
  "# =============================================================================",
  "# 5. CIFAR-10 COLOR IMAGE CLASSIFICATION",
  "# =============================================================================",
  "",
  "def build_cifar10_cnn():",
  "    \"\"\"Build CNN for CIFAR-10 (32x32 color images)\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"5. CIFAR-10 COLOR IMAGE CLASSIFICATION\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Load CIFAR-10",
  "    print(\"\\\\n📥 Loading CIFAR-10 dataset...\")",
  "    (x_train, y_train), (x_test, y_test) = cifar10.load_data()",
  "    ",
  "    class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',",
  "                   'dog', 'frog', 'horse', 'ship', 'truck']",
  "    ",
  "    print(f\"   Training samples: {x_train.shape[0]:,}\")",
  "    print(f\"   Test samples: {x_test.shape[0]:,}\")",
  "    print(f\"   Image size: {x_train.shape[1]}×{x_train.shape[2]}×{x_train.shape[3]}\")",
  "    print(f\"   Classes: {len(class_names)}\")",
  "    print(f\"   Class names: {', '.join(class_names)}\")",
  "    ",
  "    # Preprocess",
  "    x_train = x_train.astype('float32') / 255.0",
  "    x_test = x_test.astype('float32') / 255.0",
  "    ",
  "    y_train_cat = to_categorical(y_train, 10)",
  "    y_test_cat = to_categorical(y_test, 10)",
  "    ",
  "    # Build larger model for color images",
  "    print(\"\\\\n🏗️  Building CNN for Color Images...\")",
  "    model = models.Sequential([",
  "        # Block 1",
  "        layers.Conv2D(32, (3, 3), activation='relu', padding='same', ",
  "                     input_shape=(32, 32, 3)),",
  "        layers.BatchNormalization(),",
  "        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),",
  "        layers.MaxPooling2D((2, 2)),",
  "        layers.Dropout(0.25),",
  "        ",
  "        # Block 2",
  "        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),",
  "        layers.BatchNormalization(),",
  "        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),",
  "        layers.MaxPooling2D((2, 2)),",
  "        layers.Dropout(0.25),",
  "        ",
  "        # Block 3",
  "        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),",
  "        layers.BatchNormalization(),",
  "        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),",
  "        layers.MaxPooling2D((2, 2)),",
  "        layers.Dropout(0.25),",
  "        ",
  "        # Classifier",
  "        layers.Flatten(),",
  "        layers.Dense(256, activation='relu'),",
  "        layers.BatchNormalization(),",
  "        layers.Dropout(0.5),",
  "        layers.Dense(10, activation='softmax')",
  "    ], name='CIFAR10_CNN')",
  "    ",
  "    print(f\"\\\\n📊 Model Parameters: {model.count_params():,}\")",
  "    ",
  "    # Compile",
  "    model.compile(",
  "        optimizer=keras.optimizers.Adam(learning_rate=0.001),",
  "        loss='categorical_crossentropy',",
  "        metrics=['accuracy']",
  "    )",
  "    ",
  "    # Train (fewer epochs for demo)",
  "    print(\"\\\\n🎓 Training on CIFAR-10...\")",
  "    history = model.fit(",
  "        x_train[:10000], y_train_cat[:10000],  # Subset for demo",
  "        batch_size=64,",
  "        epochs=3,",
  "        validation_split=0.1,",
  "        verbose=1",
  "    )",
  "    ",
  "    # Evaluate",
  "    print(\"\\\\n📊 Evaluating...\")",
  "    test_loss, test_accuracy = model.evaluate(",
  "        x_test[:1000], y_test_cat[:1000], verbose=0",
  "    )",
  "    ",
  "    print(f\"\\\\n✅ RESULTS:\")",
  "    print(f\"   Test Accuracy: {test_accuracy*100:.2f}%\")",
  "    print(f\"   Test Loss: {test_loss:.4f}\")",
  "    ",
  "    # Sample predictions",
  "    print(\"\\\\n🔮 Sample Predictions:\")",
  "    predictions = model.predict(x_test[:5], verbose=0)",
  "    ",
  "    for i in range(5):",
  "        pred_idx = np.argmax(predictions[i])",
  "        true_idx = y_test[i][0]",
  "        confidence = predictions[i][pred_idx] * 100",
  "        ",
  "        status = \"✓\" if pred_idx == true_idx else \"✗\"",
  "        print(f\"   {status} Image {i+1}: True={class_names[true_idx]:10s}, \"",
  "              f\"Pred={class_names[pred_idx]:10s}, Conf={confidence:.2f}%\")",
  "    ",
  "    return model",
  "",
  "",
  "# =============================================================================",
  "# 6. TRANSFER LEARNING WITH PRE-TRAINED RESNET50",
  "# =============================================================================",
  "",
  "def transfer_learning_demo():",
  "    \"\"\"Demonstrate transfer learning with ResNet50\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"6. TRANSFER LEARNING WITH RESNET50\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Load pre-trained ResNet50",
  "    print(\"\\\\n📥 Loading pre-trained ResNet50...\")",
  "    model = ResNet50(weights='imagenet', include_top=True)",
  "    ",
  "    print(f\"   Model: ResNet50\")",
  "    print(f\"   Trained on: ImageNet (1.4M images, 1000 classes)\")",
  "    print(f\"   Total parameters: {model.count_params():,}\")",
  "    ",
  "    # Model structure",
  "    print(f\"\\\\n🏗️  Architecture Overview:\")",
  "    print(f\"   Input: 224×224×3 RGB image\")",
  "    print(f\"   Depth: 50 layers\")",
  "    print(f\"   Key innovation: Residual connections (skip connections)\")",
  "    print(f\"   Output: 1000 ImageNet classes\")",
  "    ",
  "    # Create a synthetic image (random for demo)",
  "    print(\"\\\\n🔮 Making Prediction on Sample Image...\")",
  "    ",
  "    # In production, load actual image:",
  "    # img = image.load_img('path/to/image.jpg', target_size=(224, 224))",
  "    # x = image.img_to_array(img)",
  "    ",
  "    # For demo, use random image",
  "    x = np.random.rand(224, 224, 3) * 255",
  "    x = np.expand_dims(x, axis=0)",
  "    x = preprocess_input(x)",
  "    ",
  "    # Predict",
  "    start_time = time.time()",
  "    preds = model.predict(x, verbose=0)",
  "    inference_time = (time.time() - start_time) * 1000",
  "    ",
  "    # Decode predictions",
  "    top_preds = decode_predictions(preds, top=5)[0]",
  "    ",
  "    print(f\"\\\\n📊 Top 5 Predictions:\")",
  "    for i, (imagenet_id, label, score) in enumerate(top_preds, 1):",
  "        print(f\"   {i}. {label:25s} {score*100:6.2f}%\")",
  "    ",
  "    print(f\"\\\\n⚡ Inference time: {inference_time:.1f}ms\")",
  "    ",
  "    # Show how to fine-tune",
  "    print(\"\\\\n🔧 Fine-tuning Strategy:\")",
  "    print(\"   1. Freeze early layers (keep ImageNet features)\")",
  "    print(\"   2. Replace final classification layer\")",
  "    print(\"   3. Train on your dataset\")",
  "    print(\"   4. Optionally unfreeze later layers and train more\")",
  "    ",
  "    return model",
  "",
  "",
  "# =============================================================================",
  "# 7. DATA AUGMENTATION",
  "# =============================================================================",
  "",
  "def demonstrate_augmentation():",
  "    \"\"\"Show data augmentation techniques\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"7. DATA AUGMENTATION\")",
  "    print(\"=\"*80)",
  "    ",
  "    from tensorflow.keras.preprocessing.image import ImageDataGenerator",
  "    ",
  "    # Create augmentation pipeline",
  "    datagen = ImageDataGenerator(",
  "        rotation_range=20,",
  "        width_shift_range=0.2,",
  "        height_shift_range=0.2,",
  "        horizontal_flip=True,",
  "        zoom_range=0.2,",
  "        fill_mode='nearest'",
  "    )",
  "    ",
  "    print(\"\\\\n🔄 Augmentation Techniques:\")",
  "    print(\"   ✓ Rotation: ±20 degrees\")",
  "    print(\"   ✓ Width shift: ±20%\")",
  "    print(\"   ✓ Height shift: ±20%\")",
  "    print(\"   ✓ Horizontal flip: Yes\")",
  "    print(\"   ✓ Zoom: ±20%\")",
  "    ",
  "    # Load sample image",
  "    (x_train, _), _ = mnist.load_data()",
  "    sample = x_train[0:1].reshape(-1, 28, 28, 1)",
  "    ",
  "    print(f\"\\\\n📊 Effect on Training:\")",
  "    print(f\"   Original dataset: 60,000 images\")",
  "    print(f\"   With augmentation: Effectively infinite variations\")",
  "    print(f\"   Benefit: Reduces overfitting, improves generalization\")",
  "    ",
  "    # Generate augmented samples",
  "    print(\"\\\\n🎨 Generating augmented samples...\")",
  "    aug_iter = datagen.flow(sample, batch_size=1)",
  "    ",
  "    for i in range(3):",
  "        batch = next(aug_iter)",
  "        print(f\"   Generated augmented image {i+1}: shape {batch.shape}\")",
  "",
  "",
  "# =============================================================================",
  "# 8. MODEL EVALUATION & METRICS",
  "# =============================================================================",
  "",
  "def detailed_evaluation():",
  "    \"\"\"Comprehensive model evaluation\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"8. COMPREHENSIVE MODEL EVALUATION\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Load data and train simple model",
  "    (x_train, y_train), (x_test, y_test) = mnist.load_data()",
  "    x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0",
  "    x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0",
  "    ",
  "    # Quick model",
  "    model = models.Sequential([",
  "        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),",
  "        layers.MaxPooling2D((2, 2)),",
  "        layers.Flatten(),",
  "        layers.Dense(10, activation='softmax')",
  "    ])",
  "    ",
  "    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', ",
  "                  metrics=['accuracy'])",
  "    model.fit(x_train[:5000], y_train[:5000], epochs=3, verbose=0)",
  "    ",
  "    # Predict",
  "    y_pred = model.predict(x_test[:1000], verbose=0)",
  "    y_pred_classes = np.argmax(y_pred, axis=1)",
  "    y_true = y_test[:1000]",
  "    ",
  "    # Classification report",
  "    print(\"\\\\n📊 Classification Report:\")",
  "    print(classification_report(y_true, y_pred_classes, ",
  "                               target_names=[str(i) for i in range(10)]))",
  "    ",
  "    # Confusion matrix",
  "    cm = confusion_matrix(y_true, y_pred_classes)",
  "    print(\"\\\\n🔢 Confusion Matrix:\")",
  "    print(\"   Rows: True labels, Columns: Predicted labels\")",
  "    print(cm)",
  "    ",
  "    # Per-class accuracy",
  "    print(\"\\\\n📈 Per-Class Accuracy:\")",
  "    for i in range(10):",
  "        class_acc = cm[i, i] / cm[i, :].sum() * 100",
  "        print(f\"   Digit {i}: {class_acc:.2f}%\")",
  "",
  "",
  "# =============================================================================",
  "# 9. PRODUCTION DEPLOYMENT TIPS",
  "# =============================================================================",
  "",
  "def deployment_guide():",
  "    \"\"\"Guide for deploying CNNs in production\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"9. PRODUCTION DEPLOYMENT GUIDE\")",
  "    print(\"=\"*80)",
  "    ",
  "    print(\"\\\\n🚀 Optimization Strategies:\")",
  "    print(\"\\\\n1. Model Quantization:\")",
  "    print(\"   • Convert float32 → int8\")",
  "    print(\"   • 4x smaller model, 2-4x faster inference\")",
  "    print(\"   • Minimal accuracy loss (<1%)\")",
  "    ",
  "    print(\"\\\\n2. Model Pruning:\")",
  "    print(\"   • Remove redundant neurons\")",
  "    print(\"   • 50-90% size reduction\")",
  "    print(\"   • Requires retraining\")",
  "    ",
  "    print(\"\\\\n3. Batching:\")",
  "    print(\"   • Process multiple images together\")",
  "    print(\"   • Better GPU utilization\")",
  "    print(\"   • Higher throughput\")",
  "    ",
  "    print(\"\\\\n4. TensorRT (NVIDIA):\")",
  "    print(\"   • Optimized for NVIDIA GPUs\")",
  "    print(\"   • 2-5x speedup\")",
  "    print(\"   • Production-grade\")",
  "    ",
  "    print(\"\\\\n5. ONNX Format:\")",
  "    print(\"   • Framework-agnostic\")",
  "    print(\"   • Deploy across platforms\")",
  "    print(\"   • Hardware optimization\")",
  "    ",
  "    print(\"\\\\n⚡ Typical Latencies:\")",
  "    print(\"   • ResNet50 on CPU: 100-300ms\")",
  "    print(\"   • ResNet50 on GPU: 5-15ms\")",
  "    print(\"   • MobileNet on mobile: 20-50ms\")",
  "    print(\"   • EfficientNet-B0 on GPU: 3-8ms\")",
  "",
  "",
  "# =============================================================================",
  "# MAIN EXECUTION",
  "# =============================================================================",
  "",
  "if __name__ == \"__main__\":",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"RUNNING ALL DEMONSTRATIONS\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Run all demonstrations",
  "    try:",
  "        # 1. Image data",
  "        demonstrate_image_data()",
  "        ",
  "        # 2. Manual convolution",
  "        manual_convolution()",
  "        ",
  "        # 3. MNIST CNN",
  "        mnist_model, mnist_history = build_mnist_cnn()",
  "        ",
  "        # 4. Visualize features",
  "        visualize_cnn_features(mnist_model)",
  "        ",
  "        # 5. CIFAR-10",
  "        cifar_model = build_cifar10_cnn()",
  "        ",
  "        # 6. Transfer learning",
  "        resnet_model = transfer_learning_demo()",
  "        ",
  "        # 7. Data augmentation",
  "        demonstrate_augmentation()",
  "        ",
  "        # 8. Evaluation",
  "        detailed_evaluation()",
  "        ",
  "        # 9. Deployment",
  "        deployment_guide()",
  "        ",
  "        print(\"\\\\n\" + \"=\"*80)",
  "        print(\"✅ ALL DEMONSTRATIONS COMPLETED SUCCESSFULLY!\")",
  "        print(\"=\"*80)",
  "        ",
  "        print(\"\\\\n📝 Summary:\")",
  "        print(\"   ✓ Understood image representation\")",
  "        print(\"   ✓ Implemented convolution from scratch\")",
  "        print(\"   ✓ Built CNN for MNIST (99%+ accuracy possible)\")",
  "        print(\"   ✓ Built CNN for CIFAR-10 (color images)\")",
  "        print(\"   ✓ Used transfer learning with ResNet50\")",
  "        print(\"   ✓ Applied data augmentation\")",
  "        print(\"   ✓ Evaluated model with comprehensive metrics\")",
  "        print(\"   ✓ Learned deployment best practices\")",
  "        ",
  "    except Exception as e:",
  "        print(f\"\\\\n❌ Error: {e}\")",
  "        import traceback",
  "        traceback.print_exc()",
  "",
  "print(\"\\\\n\" + \"=\"*80)",
  "print(\"PROGRAM COMPLETE\")",
  "print(\"=\"*80)",
];


// ============================================================
// FILE: 34. Image Recognition (Python)
// ============================================================

function ImageRecognitionPy() {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(IMAGE_RECOGNITION_PY.join('\n')).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', padding: '24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h1 style={{ color: '#58a6ff', fontFamily: 'monospace', fontSize: 20, margin: 0 }}>Image Recognition</h1>
            <p style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 12, margin: '4px 0 0' }}>34. Image Recognition.py — CNN Implementation Guide</p>
          </div>
          <button onClick={handleCopy} style={{ padding: '8px 16px', background: copied ? '#238636' : '#21262d', color: copied ? '#fff' : '#c9d1d9', border: '1px solid #30363d', borderRadius: 6, fontFamily: 'monospace', fontSize: 12, cursor: 'pointer' }}>
            {copied ? '✓ Copied' : 'Copy Code'}
          </button>
        </div>
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 8, overflow: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', background: '#21262d', borderBottom: '1px solid #30363d', borderRadius: '8px 8px 0 0' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', marginRight: 6 }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', marginRight: 6 }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', marginRight: 8 }} />
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 12 }}>image_recognition.py</span>
          </div>
          <pre style={{ margin: 0, padding: 16, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, color: '#e6edf3', whiteSpace: 'pre', overflowX: 'auto' }}>
            {IMAGE_RECOGNITION_PY.map((line, i) => (
              <div key={i} style={{ display: 'flex', minHeight: '1.6em' }}>
                <span style={{ color: '#6e7681', userSelect: 'none', minWidth: 40, textAlign: 'right', paddingRight: 16 }}>{i + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FILE: 35. Image To Video Education
// ============================================================


function ImageToVideoEducation() {
  const [activeTab, setActiveTab] = useState('introduction');
  const [activeStep, setActiveStep] = useState(0);
  const [expandedDemo, setExpandedDemo] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const learningObjectives = [
    'Understand how AI transforms text descriptions into images',
    'Learn the process of animating static images into videos',
    'Explore real-world applications in arts, culture, and media',
    'Recognize the creative potential and limitations of AI tools',
    'Apply knowledge to evaluate and create AI-generated content'
  ];

  const pipelineSteps = [
    {
      title: 'Writing Your Vision',
      subtitle: 'Describing what you imagine',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      simpleExplanation: 'You describe what you want to see using words, just like describing a scene to someone who will paint it.',
      culturalExample: 'Imagine describing a scene from Shakespeare: "A moonlit forest with fairies dancing among ancient oak trees, magical glow illuminating their wings"',
      howItWorks: 'The AI reads your description and converts each word into numbers it can understand. Think of it like translating English into a universal mathematical language.',
      visualAnalogy: 'Picture a translator converting your English sentence into thousands of numbers, like coordinates on a map that guide the AI.',
      commonTerms: [
        { term: 'Prompt', definition: 'The text description you write (like a creative writing assignment)' },
        { term: 'Embedding', definition: 'Converting words to numbers (like assigning each word a unique code)' }
      ]
    },
    {
      title: 'Starting with Chaos',
      subtitle: 'Beginning with random patterns',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-cyan-500 to-teal-500',
      simpleExplanation: 'The AI starts with a completely random, static-like image - pure visual noise with no recognizable shapes.',
      culturalExample: 'Like Jackson Pollock\'s abstract expressionism, but purely random - imagine TV static or white noise made visible.',
      howItWorks: 'The computer generates millions of random dots of color, creating a chaotic starting point. This randomness ensures each creation is unique.',
      visualAnalogy: 'Think of a blank canvas covered in random paint splatters - no pattern, no meaning, just pure chaos waiting to be sculpted.',
      commonTerms: [
        { term: 'Noise', definition: 'Random visual static, like a TV with no signal' },
        { term: 'Random Seed', definition: 'The starting point that makes each creation unique' }
      ]
    },
    {
      title: 'Gradual Refinement',
      subtitle: 'Sculpting order from chaos',
      icon: <Layers className="w-8 h-8" />,
      color: 'from-teal-500 to-green-500',
      simpleExplanation: 'The AI gradually removes the randomness, step by step, guided by your words. Like a sculptor chipping away stone to reveal a statue.',
      culturalExample: 'Michelangelo said he saw David in the marble and just removed everything that wasn\'t David. The AI does this digitally, removing noise to reveal your vision.',
      howItWorks: 'In 50 small steps, the AI predicts what noise to remove each time. Each step makes the image slightly clearer, more aligned with your description.',
      visualAnalogy: 'Imagine developing a Polaroid photograph - the image slowly appears from blankness, getting clearer with each passing second.',
      commonTerms: [
        { term: 'Denoising', definition: 'Removing randomness step-by-step (like developing a photograph)' },
        { term: 'Iteration', definition: 'Each small refinement step (the AI makes 20-50 iterations)' }
      ]
    },
    {
      title: 'Revealing the Image',
      subtitle: 'Completing the creation',
      icon: <Image className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      simpleExplanation: 'After all refinement steps, you have a complete, detailed image that matches your description.',
      culturalExample: 'Like revealing a Renaissance painting after restoration - vibrant, detailed, and ready to be appreciated or shared.',
      howItWorks: 'The final mathematical representation is converted into pixels you can see - millions of colored dots arranged to form the complete image.',
      visualAnalogy: 'The moment when a darkroom photograph fully develops, revealing every detail clearly for the first time.',
      commonTerms: [
        { term: 'Resolution', definition: 'Image detail level (like 1024×1024 means over 1 million pixels)' },
        { term: 'Rendering', definition: 'Converting AI\'s math into visible pixels' }
      ]
    },
    {
      title: 'Analyzing the Scene',
      subtitle: 'Understanding depth and space',
      icon: <Eye className="w-8 h-8" />,
      color: 'from-emerald-500 to-lime-500',
      simpleExplanation: 'The AI examines the image to understand which parts are close, which are far, and what objects exist in the scene.',
      culturalExample: 'Like how Renaissance artists used linear perspective to create depth - the AI identifies foreground (near) and background (far).',
      howItWorks: 'A specialized neural network analyzes the image, creating a "depth map" that shows distance. Closer objects appear brighter, distant ones darker.',
      visualAnalogy: 'Imagine looking at a photograph and mentally noting what would move if wind blew - trees sway, clouds drift, mountains stay still.',
      commonTerms: [
        { term: 'Depth Map', definition: 'A grayscale image showing distance (bright=near, dark=far)' },
        { term: 'Segmentation', definition: 'Identifying different objects in the scene' }
      ]
    },
    {
      title: 'Planning the Motion',
      subtitle: 'Choreographing movement',
      icon: <Play className="w-8 h-8" />,
      color: 'from-lime-500 to-yellow-500',
      simpleExplanation: 'The AI decides how different parts of the image should move - like directing actors in a film.',
      culturalExample: 'Like a choreographer planning a ballet - clouds drift slowly left, water ripples gently, leaves flutter in the breeze.',
      howItWorks: 'The AI creates motion patterns based on physics and realism. It knows water flows, clouds drift, and solid objects stay still unless there\'s reason to move.',
      visualAnalogy: 'Think of stop-motion animation planning - deciding exactly how each element moves frame by frame to create realistic motion.',
      commonTerms: [
        { term: 'Motion Vector', definition: 'An arrow showing which direction and how fast something moves' },
        { term: 'Optical Flow', definition: 'The pattern of motion across the entire image' }
      ]
    },
    {
      title: 'Creating Frames',
      subtitle: 'Building the animation',
      icon: <Video className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      simpleExplanation: 'The AI generates each individual frame of the video - typically 24 frames for every second of video.',
      culturalExample: 'Like traditional animation where artists drew 24 drawings per second. Disney\'s "Snow White" had 24 hand-drawn images for each second of film.',
      howItWorks: 'Starting from the original image, the AI creates each subsequent frame by applying the planned motion patterns. Each frame is slightly different from the last.',
      visualAnalogy: 'Flip-book animation - each page shows a tiny change from the previous, creating smooth motion when pages flip quickly.',
      commonTerms: [
        { term: 'Frame Rate', definition: 'Images per second (24 fps means 24 images in one second)' },
        { term: 'Interpolation', definition: 'Creating in-between frames for smooth motion' }
      ]
    },
    {
      title: 'Assembling the Video',
      subtitle: 'Combining into final form',
      icon: <Award className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      simpleExplanation: 'All frames are combined into a video file that can be played on any device.',
      culturalExample: 'Like binding all pages of an illuminated manuscript into a complete book, or editing all film reels into a finished movie.',
      howItWorks: 'The frames are compressed and encoded into standard video format (MP4), balancing quality with file size for easy sharing.',
      visualAnalogy: 'Think of assembling a flipbook - binding all individual pages together so they can be flipped to create the illusion of motion.',
      commonTerms: [
        { term: 'Encoding', definition: 'Compressing video to smaller file size while keeping quality' },
        { term: 'MP4', definition: 'Common video format playable on phones, computers, and web browsers' }
      ]
    }
  ];

  const demonstrations = [
    {
      title: 'Literary Scene Animation',
      category: 'Literature',
      description: 'Bringing classic literary descriptions to life',
      prompt: 'The misty moors of Victorian England, a lone figure in a dark cloak walking through fog, gothic mansion silhouette in distance',
      reference: 'Inspired by Emily Brontë\'s "Wuthering Heights"',
      process: [
        'Original text describes the atmospheric moors and mysterious setting',
        'AI generates image: foggy moorland, cloaked figure, distant mansion',
        'Depth analysis: fog closest, figure middle distance, mansion far',
        'Motion planning: fog drifts slowly, cloak billows, mansion looms',
        'Result: 4-second atmospheric video capturing the mood'
      ],
      learningPoint: 'Notice how AI interprets descriptive language into visual elements and natural motion'
    },
    {
      title: 'Historical Moment Recreation',
      category: 'History',
      description: 'Visualizing pivotal historical moments',
      prompt: 'Ancient Library of Alexandria at sunset, scholars in togas discussing scrolls under marble columns, golden light streaming through windows',
      reference: 'Reconstructing what might have been lost to history',
      process: [
        'Historical details inform the description: architecture, clothing, atmosphere',
        'AI creates image blending historical accuracy with artistic interpretation',
        'Scene analysis identifies architectural elements and human figures',
        'Motion: gentle torch flames, fabric movement, dust particles in light beams',
        'Result: Brings history to life in a way static images cannot'
      ],
      learningPoint: 'AI can help visualize historical periods we have only written records of'
    },
    {
      title: 'Artistic Movement Exploration',
      category: 'Art',
      description: 'Generating scenes in historical art styles',
      prompt: 'A bustling Parisian café in Impressionist style, dappled sunlight through trees, people in 1870s attire, soft brushstrokes and vibrant colors',
      reference: 'Homage to Renoir\'s café scenes',
      process: [
        'Prompt specifies both subject (café) and style (Impressionist)',
        'AI understands artistic movements and applies characteristic techniques',
        'Generated image mimics brush strokes, color palette, and composition style',
        'Animation adds subtle movement: people gesturing, leaves rustling, light shifting',
        'Result: Living artwork that moves like an Impressionist painting come to life'
      ],
      learningPoint: 'AI has learned from thousands of artworks and can recreate specific artistic styles'
    },
    {
      title: 'Mythological Narrative',
      category: 'Mythology',
      description: 'Visualizing ancient myths and legends',
      prompt: 'Greek goddess Athena emerging from golden clouds atop Mount Olympus, owl perched on her shoulder, aegis shield gleaming, ethereal divine light',
      reference: 'Classical Greek mythology visualization',
      process: [
        'Mythological description combines multiple symbolic elements',
        'AI integrates cultural symbols: owl (wisdom), aegis (protection), Mount Olympus (divine realm)',
        'Image captures both realism and supernatural quality',
        'Motion: clouds swirl, divine light pulses, fabric flows, owl turns head',
        'Result: Dynamic portrayal of mythological figure with appropriate gravitas'
      ],
      learningPoint: 'AI can combine cultural knowledge to create meaningful, symbol-rich imagery'
    },
    {
      title: 'Cultural Heritage Preservation',
      category: 'Cultural Studies',
      description: 'Documenting and animating traditional practices',
      prompt: 'Traditional Japanese tea ceremony in serene room with tatami mats, kimono-clad figure performing precise movements, cherry blossoms visible through shoji screens',
      reference: 'Preserving cultural practices through digital media',
      process: [
        'Description includes cultural details: tatami, kimono, shoji, ceremonial precision',
        'AI recognizes and respects cultural elements and their arrangement',
        'Image maintains cultural authenticity while adding artistic beauty',
        'Motion: graceful hand movements, steam rising from tea, subtle fabric shifts',
        'Result: Respectful documentation that can educate about cultural traditions'
      ],
      learningPoint: 'AI tools can help preserve and share cultural heritage in engaging formats'
    }
  ];

  const assessmentQuestions = [
    {
      id: 'q1',
      question: 'What is the primary purpose of starting with random noise in image generation?',
      options: [
        'To make the process faster',
        'To ensure each creation is unique',
        'To save computer memory',
        'To make the image more colorful'
      ],
      correct: 1,
      explanation: 'Starting with random noise ensures that each generation is unique, even with the same prompt. Like how two artists painting the same scene create different interpretations.',
      culturalContext: 'Similar to how improvisational jazz starts from spontaneity and develops into structured melody'
    },
    {
      id: 'q2',
      question: 'In the video generation process, what does "depth analysis" accomplish?',
      options: [
        'Makes the video file smaller',
        'Identifies which elements are near or far in the scene',
        'Adds color to the image',
        'Increases the frame rate'
      ],
      correct: 1,
      explanation: 'Depth analysis creates a map of distances in the scene, crucial for realistic motion. Objects at different depths move differently.',
      culturalContext: 'Like how Renaissance painters used linear perspective to create the illusion of three-dimensional space on a flat canvas'
    },
    {
      id: 'q3',
      question: 'How many frames are typically needed for one second of smooth video?',
      options: [
        '10 frames',
        '24 frames',
        '100 frames',
        '5 frames'
      ],
      correct: 1,
      explanation: '24 frames per second is the cinema standard, established in the 1920s and still used today. It creates the illusion of continuous motion.',
      culturalContext: 'This is the same frame rate used in classic films like "Casablanca" and modern movies like "The Grand Budapest Hotel"'
    },
    {
      id: 'q4',
      question: 'What is an "embedding" in the context of AI text processing?',
      options: [
        'Hiding secret messages in images',
        'Converting words into numerical codes the AI can process',
        'Making images smaller',
        'Adding watermarks to protect artwork'
      ],
      correct: 1,
      explanation: 'Embedding converts text into numbers (vectors) that AI can mathematically process. Each word becomes a point in multidimensional space.',
      culturalContext: 'Like how musical notes are represented on a staff - a symbolic system that converts sound into something readable and analyzable'
    },
    {
      id: 'q5',
      question: 'What is the best analogy for the iterative denoising process?',
      options: [
        'Painting a picture from scratch with no reference',
        'Developing a Polaroid photograph that slowly becomes clear',
        'Taking a photograph with a camera',
        'Printing a document on a printer'
      ],
      correct: 1,
      explanation: 'Denoising is gradual revelation - the image slowly appears from chaos, getting clearer with each step, just like a developing photograph.',
      culturalContext: 'Or like Michelangelo\'s concept of sculpture: revealing the form that already exists by removing what doesn\'t belong'
    },
    {
      id: 'q6',
      question: 'Why might AI-generated videos of historical scenes be valuable for education?',
      options: [
        'They are always 100% accurate',
        'They help visualize periods we only have written records of',
        'They replace the need to study primary sources',
        'They are cheaper than photographs'
      ],
      correct: 1,
      explanation: 'AI visualizations can bring historical descriptions to life, making abstract written records more tangible and engaging for learning.',
      culturalContext: 'Like how historical novels bring periods to life while being informed by, not replacing, historical research'
    }
  ];

  const practicalExercise = {
    title: 'Create Your Own Literary Visualization',
    scenario: 'Choose a passage from literature, history, or art history that creates a vivid scene.',
    steps: [
      {
        task: 'Select a Source',
        examples: [
          'Opening of "Pride and Prejudice" - Netherfield Park estate',
          'Homer\'s Odyssey - Odysseus and the sirens',
          'Virginia Woolf\'s description of London in "Mrs. Dalloway"',
          'Historical account of ancient Rome\'s Forum'
        ],
        guidance: 'Choose something with strong visual imagery and cultural significance'
      },
      {
        task: 'Extract Visual Details',
        examples: [
          'Architecture: columns, windows, materials',
          'Atmosphere: lighting, weather, time of day',
          'Characters: clothing, positioning, activities',
          'Setting: natural or built environment, era indicators'
        ],
        guidance: 'List specific visual elements mentioned or implied in the text'
      },
      {
        task: 'Write Your Prompt',
        template: '[Setting/Location], [key elements], [atmosphere/mood], [style if applicable]',
        example: 'Regency-era English estate at golden hour, grand manor house with Palladian architecture, manicured gardens, elegant figures in period dress strolling paths, warm soft lighting',
        guidance: 'Be specific but allow room for AI interpretation'
      },
      {
        task: 'Consider Motion Elements',
        questions: [
          'What would naturally move in this scene?',
          'What should remain still?',
          'How fast or slow should movements be?',
          'What mood does the motion convey?'
        ],
        guidance: 'Think about how animation enhances or changes the meaning of the scene'
      },
      {
        task: 'Reflect on Results',
        questions: [
          'How does the AI interpretation compare to your mental image?',
          'What cultural or historical details did the AI capture or miss?',
          'How does motion change your understanding of the scene?',
          'What are the ethical implications of AI recreating historical or cultural imagery?'
        ],
        guidance: 'Critical reflection is as important as creation'
      }
    ]
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const calculateScore = () => {
    let correct = 0;
    assessmentQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  const submitQuiz = () => {
    setShowQuizResults(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setShowQuizResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border-t-4 border-indigo-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl shadow-lg">
                <Palette className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">AI Image-to-Video Creation</h1>
                <p className="text-gray-600 mt-1">Understanding Artificial Intelligence in Creative Practice</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-lg border-2 border-indigo-300">
              <p className="text-sm font-semibold text-indigo-900">Generated by</p>
              <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Blockchain Data Intelligence Lab
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {learningObjectives.map((obj, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-indigo-200">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-700">{obj}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 flex flex-wrap gap-2">
          {['introduction', 'process', 'demonstrations', 'assessment', 'practice'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-lg font-semibold transition-all text-sm ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Introduction Tab */}
        {activeTab === 'introduction' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is AI Image and Video Generation?</h2>
              
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Artificial Intelligence can now create images and videos from simple text descriptions. This technology represents a 
                  significant shift in how visual content is created, similar to how the printing press revolutionized text distribution 
                  or how photography changed visual documentation.
                </p>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl mb-6 border-l-4 border-amber-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-amber-600" />
                    A Simple Analogy
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Imagine you could describe a scene to a master artist who has studied every painting, photograph, and film ever created. 
                    Within seconds, they produce exactly what you described. Then, an animator brings that image to life with natural motion. 
                    That is essentially what AI image-to-video systems do.
                  </p>
                  <p className="text-gray-700">
                    The difference: instead of a human artist and animator, sophisticated mathematical models (trained on millions of images) 
                    perform these tasks computationally.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">How This Impacts Creative Fields</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Visual Arts:</strong> New medium for artistic expression and experimentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>History:</strong> Visualizing lost or described-only historical moments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Literature:</strong> Bringing textual descriptions to visual life</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Cultural Studies:</strong> Documenting and preserving traditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Media Production:</strong> Rapid prototyping of visual concepts</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Critical Considerations</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span><strong>Authenticity:</strong> How do we distinguish AI-created from human-created work?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span><strong>Copyright:</strong> Who owns AI-generated imagery?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span><strong>Bias:</strong> AI reflects biases in training data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span><strong>Cultural Sensitivity:</strong> Responsible representation of cultures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span><strong>Labor Impact:</strong> Effects on creative professionals</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-900 mb-3">The Two-Stage Process</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Image className="w-5 h-5 text-green-600" />
                        Stage 1: Text-to-Image Generation
                      </h4>
                      <p className="text-sm text-gray-700">
                        Your written description → Mathematical processing → Gradual refinement from noise → Complete image
                      </p>
                      <p className="text-xs text-gray-600 mt-2">Time: 5-10 seconds | Output: High-resolution still image</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Video className="w-5 h-5 text-green-600" />
                        Stage 2: Image-to-Video Animation
                      </h4>
                      <p className="text-sm text-gray-700">
                        Generated image → Depth analysis → Motion planning → Frame generation → Compiled video
                      </p>
                      <p className="text-xs text-gray-600 mt-2">Time: 30-60 seconds | Output: 2-4 second animated video</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Complete Process: Step by Step</h2>
              <p className="text-gray-600 mb-4">Select each step to understand how it works</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {pipelineSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      activeStep === idx
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-xs font-semibold mb-1">Step {idx + 1}</div>
                    <div className="text-xs">{step.title}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className={`bg-gradient-to-r ${pipelineSteps[activeStep].color} p-6 rounded-xl mb-6`}>
                <div className="flex items-center gap-4 text-white">
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                    {pipelineSteps[activeStep].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{pipelineSteps[activeStep].title}</h3>
                    <p className="text-white text-opacity-90 mt-1">{pipelineSteps[activeStep].subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
                  <h4 className="font-bold text-blue-900 mb-3 text-lg">In Plain Language</h4>
                  <p className="text-gray-700 leading-relaxed">{pipelineSteps[activeStep].simpleExplanation}</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
                  <h4 className="font-bold text-purple-900 mb-3 text-lg">Cultural Example</h4>
                  <p className="text-gray-700 leading-relaxed italic">{pipelineSteps[activeStep].culturalExample}</p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
                  <h4 className="font-bold text-green-900 mb-3 text-lg">How It Actually Works</h4>
                  <p className="text-gray-700 leading-relaxed">{pipelineSteps[activeStep].howItWorks}</p>
                </div>

                <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-600">
                  <h4 className="font-bold text-amber-900 mb-3 text-lg">Visual Analogy</h4>
                  <p className="text-gray-700 leading-relaxed">{pipelineSteps[activeStep].visualAnalogy}</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-300">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">Key Terms to Know</h4>
                  <div className="space-y-3">
                    {pipelineSteps[activeStep].commonTerms.map((term, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="font-semibold text-indigo-900 mb-1">{term.term}</p>
                        <p className="text-sm text-gray-700">{term.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                    activeStep === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-800'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(pipelineSteps.length - 1, activeStep + 1))}
                  disabled={activeStep === pipelineSteps.length - 1}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                    activeStep === pipelineSteps.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Demonstrations Tab */}
        {activeTab === 'demonstrations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Applied Examples Across Disciplines</h2>
              <p className="text-gray-600">See how this technology applies to different fields of study</p>
            </div>

            {demonstrations.map((demo, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <button
                  onClick={() => setExpandedDemo(expandedDemo === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-lg">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">{demo.title}</h3>
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {demo.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{demo.description}</p>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">
                    {expandedDemo === idx ? '−' : '+'}
                  </span>
                </button>

                {expandedDemo === idx && (
                  <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-t-2 border-indigo-200">
                    <div className="space-y-4">
                      <div className="bg-white p-5 rounded-lg border border-indigo-200">
                        <h4 className="font-bold text-indigo-900 mb-2">Prompt Used</h4>
                        <p className="text-gray-700 italic font-mono text-sm bg-gray-50 p-3 rounded">"{demo.prompt}"</p>
                        <p className="text-xs text-gray-600 mt-2">{demo.reference}</p>
                      </div>

                      <div className="bg-white p-5 rounded-lg border border-purple-200">
                        <h4 className="font-bold text-purple-900 mb-3">Complete Process</h4>
                        <div className="space-y-2">
                          {demo.process.map((step, stepIdx) => (
                            <div key={stepIdx} className="flex items-start gap-3 bg-purple-50 p-3 rounded">
                              <div className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                {stepIdx + 1}
                              </div>
                              <p className="text-sm text-gray-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-500">
                        <h4 className="font-bold text-amber-900 mb-2">Key Learning Point</h4>
                        <p className="text-gray-700">{demo.learningPoint}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Assessment Tab */}
        {activeTab === 'assessment' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Assessment</h2>
              <p className="text-gray-600">Test your understanding of AI image-to-video generation</p>
            </div>

            {!showQuizResults ? (
              <div className="space-y-6">
                {assessmentQuestions.map((question, qIdx) => (
                  <div key={question.id} className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Question {qIdx + 1} of {assessmentQuestions.length}
                      </h3>
                      <p className="text-gray-700">{question.question}</p>
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleQuizAnswer(question.id, oIdx)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            quizAnswers[question.id] === oIdx
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-gray-200 hover:border-indigo-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              quizAnswers[question.id] === oIdx
                                ? 'border-indigo-600 bg-indigo-600'
                                : 'border-gray-300'
                            }`}>
                              {quizAnswers[question.id] === oIdx && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="text-gray-700">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center">
                  <button
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < assessmentQuestions.length}
                    className={`px-8 py-4 rounded-lg font-bold text-lg ${
                      Object.keys(quizAnswers).length < assessmentQuestions.length
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl'
                    }`}
                  >
                    Submit Assessment
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-full mb-4">
                      <Award className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
                    <p className="text-xl text-gray-600">
                      You scored <span className="text-indigo-600 font-bold">{calculateScore()}</span> out of{' '}
                      <span className="font-bold">{assessmentQuestions.length}</span>
                    </p>
                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full transition-all duration-1000"
                          style={{ width: `${(calculateScore() / assessmentQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {assessmentQuestions.map((question, qIdx) => {
                      const isCorrect = quizAnswers[question.id] === question.correct;
                      return (
                        <div
                          key={question.id}
                          className={`p-5 rounded-xl border-2 ${
                            isCorrect
                              ? 'bg-green-50 border-green-300'
                              : 'bg-red-50 border-red-300'
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            {isCorrect ? (
                              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 mb-2">Question {qIdx + 1}: {question.question}</p>
                              <p className="text-sm text-gray-700 mb-2">
                                <strong>Your answer:</strong> {question.options[quizAnswers[question.id]]}
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-gray-700 mb-2">
                                  <strong>Correct answer:</strong> {question.options[question.correct]}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-700 mb-2">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                            <p className="text-xs text-gray-600 italic">
                              <strong>Cultural Context:</strong> {question.culturalContext}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 flex items-center gap-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Retake Assessment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{practicalExercise.title}</h2>
              <p className="text-lg text-gray-700 mb-6">{practicalExercise.scenario}</p>

              <div className="space-y-6">
                {practicalExercise.steps.map((step, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.task}</h3>
                        <p className="text-sm text-gray-700 italic mb-4">{step.guidance}</p>
                      </div>
                    </div>

                    {step.examples && (
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <p className="font-semibold text-gray-900 mb-2">Examples:</p>
                        <ul className="space-y-1">
                          {step.examples.map((example, eIdx) => (
                            <li key={eIdx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-indigo-600">•</span>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.questions && (
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <p className="font-semibold text-gray-900 mb-2">Consider:</p>
                        <ul className="space-y-1">
                          {step.questions.map((question, qIdx) => (
                            <li key={qIdx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-purple-600">?</span>
                              <span>{question}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.template && (
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-2">Template:</p>
                        <p className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded mb-2">{step.template}</p>
                        <p className="font-semibold text-gray-900 mb-2 mt-3">Example:</p>
                        <p className="text-sm text-gray-700 italic bg-indigo-50 p-3 rounded">{step.example}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                  Reflection Questions for Discussion
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Creativity & Authorship</p>
                    <p className="text-gray-700">If AI generates the image, who is the artist? The person who wrote the prompt, the AI model creators, or the artists whose work trained the AI?</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Historical Accuracy</p>
                    <p className="text-gray-700">When visualizing historical scenes, how do we balance artistic interpretation with scholarly accuracy? What are the risks of visual reconstruction?</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Cultural Representation</p>
                    <p className="text-gray-700">How can we ensure AI-generated imagery respects and accurately represents diverse cultures, especially those underrepresented in training data?</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Future of Creative Work</p>
                    <p className="text-gray-700">How might these tools change creative professions? What new skills become valuable? What remains uniquely human?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-600">
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              <strong>Educational Resource:</strong> Designed to make AI technology accessible and understandable across all fields of study
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Research & Development by</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Blockchain Data Intelligence Lab
              </p>
              <p className="text-sm text-gray-600">Advancing AI Education & Understanding</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMBINED NAVIGATION WRAPPER
// ============================================================
export default function ImageCombined() {
  const [activeModule, setActiveModule] = React.useState(0);

  const modules = [
    { id: 0, label: '33. Image to Video Conversion' },
    { id: 1, label: '34. Image Recognition (Py)' },
    { id: 2, label: '35. Image to Video Education' },
  ];

  const navBg = '#0a0e1a';
  const navBorder = '#1e3a5f';
  const activeColor = '#00d4ff';
  const inactiveColor = '#475569';

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        gap: '6px',
        padding: '10px 16px',
        background: navBg,
        borderBottom: `2px solid ${navBorder}`,
        flexWrap: 'wrap',
        position: 'sticky',
        top: 0,
        zIndex: 9999,
      }}>
        <span style={{
          color: activeColor,
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          display: 'flex',
          alignItems: 'center',
          marginRight: 8,
          fontWeight: 700,
          letterSpacing: 1,
        }}>
          Image Suite:
        </span>
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            style={{
              padding: '5px 14px',
              borderRadius: 5,
              border: `1px solid ${activeModule === mod.id ? activeColor : navBorder}`,
              background: activeModule === mod.id ? `${activeColor}18` : 'transparent',
              color: activeModule === mod.id ? activeColor : inactiveColor,
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {mod.label}
          </button>
        ))}
      </div>
      <div>
        {activeModule === 0 && <HumanitiesImageToVideo />}
        {activeModule === 1 && <ImageRecognitionPy />}
        {activeModule === 2 && <ImageToVideoEducation />}
      </div>
    </div>
  );
}
