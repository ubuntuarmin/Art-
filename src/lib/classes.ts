export interface ClassStep {
  title: string
  description: string
}

export interface ClassProgram {
  slug: string
  icon: string
  title: string
  shortDescription: string
  seoTitle: string
  seoDescription: string
  heroDescription: string
  longDescription: string
  ages: string
  duration: string
  price: string
  level: string
  sessions: string
  accent: string
  subject: string
  whatYouLearn: string[]
  process?: ClassStep[]
  benefits: string[]
}

export const CLASS_PROGRAMS: ClassProgram[] = [
  {
    slug: 'oil-painting-katy-tx',
    icon: '🖌️',
    title: 'Oil Painting Classes',
    shortDescription:
      'Build mastery in blending, layering, glazing, and color control with guided oil painting instruction in Katy, TX.',
    seoTitle: 'Oil Painting Classes in Katy, TX | Beyond the Canvas Art Studio',
    seoDescription:
      'Join oil painting classes in Katy, TX at Beyond the Canvas Art Studio. Learn drawing, composition, color harmony, and professional oil painting techniques step by step.',
    heroDescription:
      'Our oil painting classes in Katy, Texas are designed for beginners and experienced artists who want to build strong technical skills and create expressive, gallery-worthy work.',
    longDescription:
      'At Beyond the Canvas Art Studio, oil painting students learn a complete artistic workflow instead of isolated exercises. You begin by strengthening your drawing and proportion skills, move into color-planning studies, and then transfer your work to canvas for refined oil painting. This layered method helps you understand light, structure, and color harmony before committing each brushstroke. Students in Katy choose this class for personal growth, portfolio development, and confidence with professional painting methods in a supportive studio environment.',
    ages: 'Ages 14+',
    duration: '10 weeks',
    price: 'From $250',
    level: 'Beginner to Intermediate',
    sessions: 'Tue & Thu 6–8pm',
    accent: '#C4622D',
    subject: 'Book a Class',
    whatYouLearn: [
      'Blending, layering, glazing, and brush control for clean, intentional oil technique',
      'Composition, values, and color mixing for still life, landscape, and portrait studies',
      'How to plan paintings from sketch to finished canvas with professional structure',
      'How to develop your personal painting style with direct instructor feedback',
    ],
    process: [
      {
        title: 'Step 1: Drawing Practice',
        description:
          'Students start with focused drawing exercises to build confidence in proportion, structure, shading, and observation.',
      },
      {
        title: 'Step 2: Subject Selection & Color Planning',
        description:
          'Each student selects a subject and prepares a color study using pencils or crayons to test composition and palette harmony.',
      },
      {
        title: 'Step 3: Canvas Transfer & Oil Painting',
        description:
          'Students transfer the drawing to canvas and apply professional oil painting techniques to complete a finished artwork.',
      },
    ],
    benefits: [
      'Taught by a professional artist with 25+ years of experience',
      'Structured progression that supports both skill-building and creativity',
      'Ideal for adults and teens seeking high-quality art classes in Katy, TX',
    ],
  },
  {
    slug: 'drawing-charcoal-classes-katy-tx',
    icon: '✏️',
    title: 'Drawing & Charcoal Pencil Classes',
    shortDescription:
      'Strengthen your fundamentals in line, form, value, perspective, and expressive charcoal work in Katy, TX.',
    seoTitle: 'Drawing & Charcoal Classes in Katy, TX | Beyond the Canvas',
    seoDescription:
      'Enroll in drawing and charcoal classes in Katy, TX. Learn shading, proportion, perspective, composition, portraits, and still life with guided instruction.',
    heroDescription:
      'Our drawing and charcoal classes help students build a strong visual-art foundation with practical instruction, guided practice, and clear progression.',
    longDescription:
      'These drawing classes are built for students who want lasting fundamentals, not quick shortcuts. You will train your eye to observe accurately, simplify complex forms, and create depth through value control. Charcoal introduces dramatic contrast and expressive texture while pencil work refines precision and structure. Whether you are a beginner or returning artist in Katy, this class develops confidence, artistic discipline, and technical control that supports every other medium.',
    ages: 'Ages 10+',
    duration: '8 weeks',
    price: 'From $160',
    level: 'All Levels',
    sessions: 'Wed 4–6pm',
    accent: '#5A4A3C',
    subject: 'Book a Class',
    whatYouLearn: [
      'Line, shape, form, and structural drawing for strong visual foundations',
      'Shading methods for realistic light and shadow',
      'Proportion, perspective, and composition for balanced artwork',
      'Still life, portrait, and figure drawing in pencil and charcoal',
      'Charcoal handling techniques for depth, contrast, and expressive mark-making',
    ],
    benefits: [
      'Excellent preparation for painting, design, and portfolio work',
      'Supports focus, patience, and creative confidence',
      'Welcoming instruction for beginner and intermediate students in Katy, TX',
    ],
  },
  {
    slug: 'dot-mandala-classes-katy-tx',
    icon: '⚪',
    title: 'Dot Mandala Art Classes & Workshops',
    shortDescription:
      'Create calming, symmetrical dot mandala art while learning mindful color layering and pattern flow in Katy, TX.',
    seoTitle: 'Dot Mandala Classes in Katy, TX | Beyond the Canvas Art Studio',
    seoDescription:
      'Join Dot Mandala art workshops in Katy, TX. Learn dotting tools, symmetry, color harmony, and relaxing mindful painting techniques for all ages.',
    heroDescription:
      'Dot Mandala is a meditative painting practice where simple dots become intricate, balanced designs that calm the mind and inspire creativity.',
    longDescription:
      'Our Dot Mandala workshops in Katy, Texas are designed for students of all backgrounds, including complete beginners. You will learn how to plan patterns, build symmetry, and layer color in clean, rhythmic steps that produce beautiful results. Beyond technique, this class supports focus and stress reduction through mindful creation. Every session balances technical guidance with personal expression so you can leave with artwork that feels both intentional and meaningful.',
    ages: 'All Ages',
    duration: '4 weeks',
    price: 'From $140',
    level: 'All Levels',
    sessions: 'Sat 1–3pm',
    accent: '#7A5C9E',
    subject: 'Book a Class',
    whatYouLearn: [
      'How to use dotting tools and brushes for consistent pattern work',
      'Layering and spacing techniques for clean symmetry and flow',
      'Color harmony for vibrant and balanced mandala compositions',
      'The symbolic meaning and calming energy behind mandala design',
    ],
    benefits: [
      'No prior art experience required',
      'Great for stress relief, focus, and mindful creativity',
      'Perfect family-friendly and adult-friendly art activity in Katy, TX',
    ],
  },
  {
    slug: 'advanced-oil-painting-katy-tx',
    icon: '🎨',
    title: 'Advanced Oil Painting',
    shortDescription:
      'Refine your technique with impasto, palette knife work, and expressive finishing methods.',
    seoTitle: 'Advanced Oil Painting Class in Katy, TX | Beyond the Canvas',
    seoDescription:
      'Take advanced oil painting in Katy, TX with guided instruction in impasto, alla prima, glazing, and personal style development for experienced artists.',
    heroDescription:
      'Advanced oil painting is ideal for artists ready to move beyond fundamentals and produce stronger, more personal work.',
    longDescription:
      'This advanced class helps experienced students in Katy elevate technical control and artistic voice. Sessions focus on edge quality, controlled texture, tonal balance, and strategic color decisions that create depth and impact. You will work through challenging projects with critique-driven coaching, allowing you to solve complex visual problems and finish paintings with professional polish.',
    ages: 'Ages 16+',
    duration: '8 weeks',
    price: 'From $320',
    level: 'Advanced',
    sessions: 'Mon & Wed 6–8:30pm',
    accent: '#D4A843',
    subject: 'Book a Class',
    whatYouLearn: [
      'Impasto, palette knife, and alla prima techniques for expressive painting surfaces',
      'Advanced glazing and layering for atmospheric depth',
      'Composition refinement and visual storytelling',
      'How to evaluate and strengthen your own painting process',
    ],
    benefits: [
      'High-level critique and mentorship for serious painters',
      'Strong fit for portfolio-building and exhibition goals',
      'Professional advanced art training in Katy, TX',
    ],
  },
  {
    slug: 'watercolor-classes-katy-tx',
    icon: '💧',
    title: 'Watercolor Workshop',
    shortDescription:
      'Learn luminous watercolor techniques, controlled washes, and layering for dynamic results.',
    seoTitle: 'Watercolor Classes in Katy, TX | Beyond the Canvas Art Studio',
    seoDescription:
      'Discover watercolor classes in Katy, TX with instruction in wet-on-wet, glazing, brush control, and composition for all skill levels.',
    heroDescription:
      'Our watercolor workshop teaches you to control water, pigment, and timing to create clean, vibrant paintings.',
    longDescription:
      'Watercolor requires both planning and spontaneity. In this class, students in Katy learn to manage moisture, preserve highlights, and build transparent layers without muddiness. You will practice foundational techniques and complete guided projects that improve confidence with brushwork, value control, and composition. The result is a clearer process and stronger watercolor outcomes from start to finish.',
    ages: 'Ages 10+',
    duration: '6 weeks',
    price: 'From $180',
    level: 'All Levels',
    sessions: 'Sat 10am–12pm',
    accent: '#7A9E7E',
    subject: 'Book a Class',
    whatYouLearn: [
      'Wet-on-wet, dry brush, and glazing methods',
      'Value planning and transparent color layering',
      'How to preserve highlights and prevent overworking',
      'Composition strategies for still life and landscape watercolor',
    ],
    benefits: [
      'Excellent class for beginners and returning artists',
      'Improves patience, observation, and brush control',
      'Trusted watercolor instruction in Katy, TX',
    ],
  },
  {
    slug: 'resin-art-classes-katy-tx',
    icon: '✨',
    title: 'Resin Art & Craft Classes',
    shortDescription:
      'Create glossy, modern resin artworks while learning safe pouring and design techniques.',
    seoTitle: 'Resin Art Classes in Katy, TX | Beyond the Canvas Art Studio',
    seoDescription:
      'Book resin art classes in Katy, TX to learn safe handling, pigment mixing, layering, and custom geode or ocean-inspired designs.',
    heroDescription:
      'Our resin art classes combine technical safety with creative exploration for beautiful, durable pieces.',
    longDescription:
      'Resin art offers bold color, depth, and modern texture when done correctly. In this Katy workshop, students learn safe setup, material ratios, pigment control, and pour direction for predictable results. You will create decorative and gift-ready projects while developing confidence in layering effects, metallic accents, and finishing details that produce a clean, professional look.',
    ages: 'Ages 14+',
    duration: '4 weeks',
    price: 'From $220',
    level: 'Beginner',
    sessions: 'Sun 1–4pm',
    accent: '#9B5DE5',
    subject: 'Book a Class',
    whatYouLearn: [
      'Resin safety protocols and workspace preparation',
      'Pigment blending, cells, lacing, and flow control',
      'Layering for geode, ocean, and abstract effects',
      'Finishing and curing best practices for long-lasting pieces',
    ],
    benefits: [
      'Hands-on guidance with professional materials',
      'Create custom home décor and giftable artworks',
      'Unique resin art training available in Katy, TX',
    ],
  },
  {
    slug: 'kids-art-camp-katy-tx',
    icon: '🌟',
    title: 'Kids Art Camp',
    shortDescription:
      'A creative camp where children explore painting, drawing, sculpture, and mixed media projects.',
    seoTitle: 'Kids Art Camp in Katy, TX | Beyond the Canvas Art Studio',
    seoDescription:
      'Enroll in kids art camp in Katy, TX. Children explore painting, drawing, sculpture, and crafts in a fun, structured, confidence-building studio environment.',
    heroDescription:
      'Our kids art camp gives young artists a joyful place to create, experiment, and build artistic confidence.',
    longDescription:
      'Designed for children who love to create, this Katy art camp combines structured instruction with playful exploration. Campers work across multiple mediums and complete projects they are proud to share at home. Lessons support fine-motor skills, creative thinking, and positive self-expression while maintaining a warm, encouraging studio atmosphere that helps every child feel successful.',
    ages: 'Ages 5–12',
    duration: '1 week (Summer)',
    price: 'From $299',
    level: 'Beginner',
    sessions: 'Mon–Fri 9am–12pm',
    accent: '#D4A843',
    subject: 'Book a Class',
    whatYouLearn: [
      'Painting, drawing, collage, and sculpture basics',
      'Creative problem-solving through guided projects',
      'Color, shape, and composition fundamentals for kids',
      'How to build confidence through positive artistic practice',
    ],
    benefits: [
      'Small-group support with age-appropriate instruction',
      'Great summer enrichment activity for families in Katy, TX',
      'Encourages creativity, focus, and joyful learning',
    ],
  },
  {
    slug: 'private-art-lessons-katy-tx',
    icon: '👑',
    title: 'Private One-on-One Art Lessons',
    shortDescription:
      'Personalized private instruction tailored to your goals, pace, and preferred medium.',
    seoTitle: 'Private Art Lessons in Katy, TX | Beyond the Canvas Art Studio',
    seoDescription:
      'Schedule private art lessons in Katy, TX for customized coaching in oil painting, drawing, watercolor, and mixed media for all ages and levels.',
    heroDescription:
      'Private lessons provide focused, one-on-one coaching designed around your personal artistic goals.',
    longDescription:
      'Private classes are perfect for students who want flexible scheduling and individualized attention. Your instructor builds a personalized path around your interests, current level, and long-term goals. Whether you are preparing a portfolio, returning to art after a break, or simply want faster progress, these sessions in Katy deliver targeted coaching and clear improvement from week to week.',
    ages: 'All Ages',
    duration: 'Ongoing',
    price: 'From $85/hr',
    level: 'All Levels',
    sessions: 'By appointment',
    accent: '#C4622D',
    subject: 'Private Lesson',
    whatYouLearn: [
      'Customized technique training in your chosen medium',
      'Goal-based practice plans and progress checkpoints',
      'Portfolio or project support with direct feedback',
      'Confidence-building instruction paced for your learning style',
    ],
    benefits: [
      'Maximum flexibility for busy schedules in Katy, TX',
      'Ideal for accelerated growth and individualized outcomes',
      'Available for children, teens, adults, and advanced learners',
    ],
  },
  {
    slug: 'art-birthday-party-packages-katy-tx',
    icon: '🎉',
    title: 'Art Birthday Party Packages',
    shortDescription:
      'Celebrate with a guided art party that includes materials, instruction, and take-home creations.',
    seoTitle: 'Art Birthday Parties in Katy, TX | Beyond the Canvas Art Studio',
    seoDescription:
      'Book kids art birthday party packages in Katy, TX. Enjoy guided projects, all materials included, and a memorable creative celebration for your group.',
    heroDescription:
      'Our art birthday parties turn special occasions into fun, creative studio experiences that guests remember.',
    longDescription:
      'Birthday party packages are designed for families in Katy who want a stress-free celebration with meaningful activities. We provide project planning, materials, and guided instruction so guests can enjoy the experience from start to finish. Hosts can choose age-appropriate themes and leave with finished artwork as keepsakes, making the event both memorable and beautifully organized.',
    ages: 'Ages 5–16',
    duration: '2 hours',
    price: 'From $450',
    level: 'N/A',
    sessions: 'Weekends',
    accent: '#7A9E7E',
    subject: 'Birthday Party',
    whatYouLearn: [
      'A guided creative project tailored to your group age and theme',
      'Basic painting or mixed-media techniques in a fun format',
      'Collaborative creativity and artistic confidence for young guests',
      'How to complete a polished artwork within an event session',
    ],
    benefits: [
      'Private studio setup and all materials included',
      'Simple planning for parents with professional facilitation',
      'Top-rated creative birthday option in Katy, TX',
    ],
  },
]

export const CLASS_PROGRAMS_BY_SLUG = Object.fromEntries(
  CLASS_PROGRAMS.map((program) => [program.slug, program]),
) as Record<string, ClassProgram>
