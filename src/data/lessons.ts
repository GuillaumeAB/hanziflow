import { LessonUnit } from '../types';

export const LESSONS_DATA: LessonUnit[] = [
  {
    id: 'lesson-1',
    hsk: 1,
    unitNumber: 1,
    title: 'First Words & Greetings',
    description: 'Master polite spoken greetings, introductions, and how to introduce yourself.',
    icon: 'HandMetal',
    category: 'Basics',
    xp: 50,
    charactersIntroduced: ['你', '好', '语', '说'],
    exercises: [
      {
        id: 'ex-1-1',
        type: 'listening_match',
        audioText: '你好，很高兴认识你！',
        pinyin: 'Nǐ hǎo, hěn gāoxìng rènshi nǐ!',
        promptQuestion: 'Listen to the native speaker. What is being said?',
        options: [
          'Hello, very nice to meet you!',
          'Goodbye, see you tomorrow!',
          'Thank you, I am very full!',
          'Excuse me, where is the toilet?'
        ],
        correctAnswer: 'Hello, very nice to meet you!',
        explanation: '很高兴认识你 is the standard spoken phrase for "Nice to meet you".'
      },
      {
        id: 'ex-1-2',
        type: 'sentence_reorder',
        audioText: '很高兴认识你',
        pinyin: 'Hěn gāoxìng rènshi nǐ',
        english: 'Very glad to meet you',
        promptQuestion: 'Listen to the audio and assemble the spoken sentence in correct order:',
        scrambledWords: ['认识', '很高兴', '你'],
        correctOrder: ['很高兴', '认识', '你'],
        explanation: 'Sentence structure: 很高兴 (Very glad) + 认识 (to meet) + 你 (you).'
      },
      {
        id: 'ex-1-3',
        type: 'audio_cloze',
        audioText: '你会说中文吗？',
        pinyin: 'Nǐ huì shuō zhōngwén ma?',
        english: 'Can you speak Chinese?',
        promptQuestion: 'Listen carefully. Which word fills the gap?',
        missingWordPinyin: 'shuō',
        options: ['说', '喝', '想', '听'],
        correctAnswer: '说',
        explanation: '说 (shuō) means "to speak". 会说 = can speak.'
      }
    ]
  },
  {
    id: 'lesson-2',
    hsk: 1,
    unitNumber: 2,
    title: 'Ordering Food & Drinks',
    description: 'Ordering drinks, dishes, and politely calling the waiter at Chinese restaurants.',
    icon: 'Utensils',
    category: 'Dining',
    xp: 60,
    charactersIntroduced: ['吃', '喝', '想'],
    exercises: [
      {
        id: 'ex-2-1',
        type: 'sentence_reorder',
        audioText: '服务员，我想喝一杯茶。',
        pinyin: 'Fúwùyuán, wǒ xiǎng hē yī bēi chá.',
        english: 'Waiter, I would like to drink a cup of tea.',
        promptQuestion: 'Listen to the customer ordering and arrange the spoken words:',
        scrambledWords: ['茶', '我想喝', '服务员', '一杯'],
        correctOrder: ['服务员', '我想喝', '一杯', '茶'],
        explanation: 'Call the waiter first: 服务员 -> subject + desire + verb: 我想喝 -> quantity + noun: 一杯茶.'
      },
      {
        id: 'ex-2-2',
        type: 'audio_cloze',
        audioText: '你今天中午吃了什么？',
        pinyin: 'Nǐ jīntiān zhōngwǔ chī le shénme?',
        english: 'What did you eat for lunch today?',
        promptQuestion: 'Listen to the question. Which character is missing?',
        missingWordPinyin: 'chī',
        options: ['吃', '喝', '说', '看'],
        correctAnswer: '吃',
        explanation: '吃 (chī, mouth 口 radical) means "to eat".'
      },
      {
        id: 'ex-2-3',
        type: 'listening_match',
        audioText: '这个中国菜真好吃！',
        pinyin: 'Zhège zhōngguó cài zhēn hǎochī!',
        promptQuestion: 'Listen to the diner\'s reaction. What do they think?',
        options: [
          'This Chinese dish is really delicious!',
          'This dish is too spicy to eat.',
          'Please bring me the bill quickly.',
          'Can I order another cup of water?'
        ],
        correctAnswer: 'This Chinese dish is really delicious!',
        explanation: '好吃 (hǎochī) = delicious / good to eat.'
      }
    ]
  },
  {
    id: 'lesson-3',
    hsk: 2,
    unitNumber: 3,
    title: 'Asking Directions & Metro',
    description: 'Asking for directions in town, locating the subway station, and understanding answers.',
    icon: 'MapPin',
    category: 'Navigation',
    xp: 75,
    charactersIntroduced: ['问', '找', '懂'],
    exercises: [
      {
        id: 'ex-3-1',
        type: 'sentence_reorder',
        audioText: '请问去最近的地铁站怎么走？',
        pinyin: 'Qǐngwèn qù zuìjìn de dìtiě zhàn zěnme zǒu?',
        english: 'Excuse me, how do I get to the nearest subway station?',
        promptQuestion: 'Listen and construct the direction inquiry:',
        scrambledWords: ['怎么走', '请问', '地铁站', '去最近的'],
        correctOrder: ['请问', '去最近的', '地铁站', '怎么走'],
        explanation: '请问 (excuse me) + 去 (destination) + 怎么走 (how to get there).'
      },
      {
        id: 'ex-3-2',
        type: 'audio_cloze',
        audioText: '请慢一点说，我听不懂。',
        pinyin: 'Qǐng màn yīdiǎn shuō, wǒ tīng bù dǒng.',
        english: 'Please speak slower, I don\'t understand.',
        promptQuestion: 'Listen to the learner request. Fill the result complement:',
        missingWordPinyin: 'dǒng',
        options: ['懂', '问', '见', '了'],
        correctAnswer: '懂',
        explanation: '听不懂 (tīng bù dǒng) = cannot understand through listening.'
      },
      {
        id: 'ex-3-3',
        type: 'listening_match',
        audioText: '我找不到我的手机了！',
        pinyin: 'Wǒ zhǎo bù dào wǒ de shǒujī le!',
        promptQuestion: 'What happened to the speaker?',
        options: [
          'I can\'t find my cell phone!',
          'My phone is out of battery.',
          'I bought a brand new phone.',
          'Please answer my phone call.'
        ],
        correctAnswer: 'I can\'t find my cell phone!',
        explanation: '找不到 (zhǎo bù dào) = unable to find / locate.'
      }
    ]
  },
  {
    id: 'lesson-4',
    hsk: 2,
    unitNumber: 4,
    title: 'Shopping & Bargaining',
    description: 'Asking prices, saying things are too expensive, and negotiating discounts comfortably.',
    icon: 'ShoppingBag',
    category: 'Shopping',
    xp: 80,
    charactersIntroduced: ['买'],
    exercises: [
      {
        id: 'ex-4-1',
        type: 'sentence_reorder',
        audioText: '有点太贵了，便宜一点吧！',
        pinyin: 'Yǒudiǎn tài guì le, piányi yīdiǎn ba!',
        english: 'A bit too expensive, make it cheaper please!',
        promptQuestion: 'Assemble the spoken bargaining sentence:',
        scrambledWords: ['便宜一点吧', '有点', '太贵了'],
        correctOrder: ['有点', '太贵了', '便宜一点吧'],
        explanation: 'Common formula: [Problem: 有点太贵了] + [Request: 便宜一点吧].'
      },
      {
        id: 'ex-4-2',
        type: 'audio_cloze',
        audioText: '服务员，买单！',
        pinyin: 'Fúwùyuán, mǎidān!',
        english: 'Waiter, check please!',
        promptQuestion: 'Listen to the restaurant customer calling for the bill:',
        missingWordPinyin: 'mǎi',
        options: ['买', '卖', '来', '做'],
        correctAnswer: '买',
        explanation: '买单 (mǎidān) = to pay the restaurant bill.'
      }
    ]
  },
  {
    id: 'lesson-5',
    hsk: 3,
    unitNumber: 5,
    title: 'Socializing & Casual Chit-Chat',
    description: 'Chatting with friends, inviting people to a café, and expressing feelings.',
    icon: 'MessageCircle',
    category: 'Social',
    xp: 90,
    charactersIntroduced: ['聊', '难', '接'],
    exercises: [
      {
        id: 'ex-5-1',
        type: 'sentence_reorder',
        audioText: '学汉字虽然难，但是非常有意思！',
        pinyin: 'Xué hànzì suīrán nán, dànshì fēicháng yǒu yìsi!',
        english: 'Although learning Hanzi is hard, it is very interesting!',
        promptQuestion: 'Listen and construct the contrasting sentence:',
        scrambledWords: ['但是', '非常有意思', '虽然难', '学汉字'],
        correctOrder: ['学汉字', '虽然难', '但是', '非常有意思'],
        explanation: 'Pattern: Topic + 虽然 (difficult) + 但是 (rewarding).'
      },
      {
        id: 'ex-5-2',
        type: 'audio_cloze',
        audioText: '有空我们找个地方坐下聊聊天。',
        pinyin: 'Yǒu kòng wǒmen zhǎo gè dìfang zuòxià liáoliáo tiān.',
        english: 'When free, let\'s find a place to sit and chat.',
        promptQuestion: 'Listen to the verb reduplication for friendly chatting:',
        missingWordPinyin: 'liáo',
        options: ['聊', '听', '说', '看'],
        correctAnswer: '聊',
        explanation: '聊聊天 (liáoliáo tiān) = casually chat.'
      }
    ]
  },
  {
    id: 'lesson-6',
    hsk: 4,
    unitNumber: 6,
    title: 'Advanced Planning & Environment',
    description: 'Making restaurant reservations in advance and discussing life environments.',
    icon: 'Calendar',
    category: 'Fluency',
    xp: 110,
    charactersIntroduced: ['预', '境', '适'],
    exercises: [
      {
        id: 'ex-6-1',
        type: 'sentence_reorder',
        audioText: '最好提前在网上预订位置。',
        pinyin: 'Zuì hǎo tíqián zài wǎngshàng yùdìng wèizhì.',
        english: 'You\'d better book a table online in advance.',
        promptQuestion: 'Reconstruct the advice on restaurant reservations:',
        scrambledWords: ['在网上', '预订位置', '最好提前'],
        correctOrder: ['最好提前', '在网上', '预订位置'],
        explanation: '最好提前 (had better in advance) + location + action.'
      },
      {
        id: 'ex-6-2',
        type: 'audio_cloze',
        audioText: '适应一个新的工作环境往往需要时间。',
        pinyin: 'Shìyìng yī gè xīn de gōngzuò huánjìng wǎngwǎng xūyào shíjiān.',
        english: 'Adapting to a new work environment often takes time.',
        promptQuestion: 'Listen to the spoken sentence. What is the missing verb?',
        missingWordPinyin: 'shì',
        options: ['适', '预', '懂', '接'],
        correctAnswer: '适',
        explanation: '适应 (shìyìng) means "to adapt / adjust to".'
      }
    ]
  },
  {
    id: 'lesson-7',
    hsk: 5,
    unitNumber: 7,
    title: 'Business Negotiation & Prosperity',
    description: 'High-register oral discussions on agreements, economic prosperity, and coordination.',
    icon: 'Briefcase',
    category: 'Professional',
    xp: 150,
    charactersIntroduced: ['繁', '综', '协'],
    exercises: [
      {
        id: 'ex-7-1',
        type: 'sentence_reorder',
        audioText: '双方终于达成了一项商业合作协议。',
        pinyin: 'Shuāngfāng zhōngyú dáchéng le yī xiàng shāngyè hézuò xiéyì.',
        english: 'Both parties finally reached a commercial cooperation agreement.',
        promptQuestion: 'Arrange the formal business conclusion sentence:',
        scrambledWords: ['达成了一项', '双方终于', '商业合作协议'],
        correctOrder: ['双方终于', '达成了一项', '商业合作协议'],
        explanation: 'Subject: 双方终于 -> Verb phrase: 达成了一项 -> Noun phrase: 商业合作协议.'
      },
      {
        id: 'ex-7-2',
        type: 'audio_cloze',
        audioText: '夜市文化也日益繁荣。',
        pinyin: 'Yèshì wénhuà yě rìyì fánróng.',
        english: 'The night market culture also prospers day by day.',
        promptQuestion: 'Listen for the HSK 5 adjective of flourishing prosperity:',
        missingWordPinyin: 'fán',
        options: ['繁', '综', '协', '境'],
        correctAnswer: '繁',
        explanation: '繁荣 (fánróng) = flourishing, prosperous.'
      }
    ]
  }
];
