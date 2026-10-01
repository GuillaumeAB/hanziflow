import { OralSentence } from '../types';

export const ORAL_SENTENCES_DATA: OralSentence[] = [
  // ==========================
  // HSK 1
  // ==========================
  {
    id: 's-hsk1-01',
    hsk: 1,
    topic: 'Greetings & Introduction',
    cn: '你好，很高兴认识你！',
    pinyin: 'Nǐ hǎo, hěn gāoxìng rènshi nǐ!',
    en: 'Hello, very nice to meet you!',
    words: [
      { word: '你好', pinyin: 'nǐ hǎo', en: 'hello' },
      { word: '，', pinyin: '', en: '' },
      { word: '很', pinyin: 'hěn', en: 'very' },
      { word: '高兴', pinyin: 'gāoxìng', en: 'happy / glad' },
      { word: '认识', pinyin: 'rènshi', en: 'to meet / know' },
      { word: '你', pinyin: 'nǐ', en: 'you' },
      { word: '！', pinyin: '', en: '' }
    ],
    grammarNote: '很高兴认识你 is the quintessential polite introduction formula in spoken Chinese.'
  },
  {
    id: 's-hsk1-02',
    hsk: 1,
    topic: 'Ordering Drinks',
    cn: '服务员，我想喝一杯茶。',
    pinyin: 'Fúwùyuán, wǒ xiǎng hē yī bēi chá.',
    en: 'Waiter, I would like to drink a cup of tea.',
    words: [
      { word: '服务员', pinyin: 'fúwùyuán', en: 'waiter' },
      { word: '，', pinyin: '', en: '' },
      { word: '我', pinyin: 'wǒ', en: 'I' },
      { word: '想', pinyin: 'xiǎng', en: 'would like to' },
      { word: '喝', pinyin: 'hē', en: 'drink' },
      { word: '一杯', pinyin: 'yī bēi', en: 'a cup of' },
      { word: '茶', pinyin: 'chá', en: 'tea' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: '杯 (bēi) is the measure word for cups/glasses. Use 服务员 to address a waiter directly.'
  },
  {
    id: 's-hsk1-03',
    hsk: 1,
    topic: 'Daily Conversation',
    cn: '你今天晚上吃了什么？',
    pinyin: 'Nǐ jīntiān wǎnshang chī le shénme?',
    en: 'What did you eat tonight?',
    words: [
      { word: '你', pinyin: 'nǐ', en: 'you' },
      { word: '今天', pinyin: 'jīntiān', en: 'today' },
      { word: '晚上', pinyin: 'wǎnshang', en: 'evening' },
      { word: '吃', pinyin: 'chī', en: 'eat' },
      { word: '了', pinyin: 'le', en: '[completed action]' },
      { word: '什么', pinyin: 'shénme', en: 'what' },
      { word: '？', pinyin: '', en: '' }
    ],
    grammarNote: 'Asking "吃了什么" is a standard casual greeting among friends in China.'
  },
  {
    id: 's-hsk1-04',
    hsk: 1,
    topic: 'Taking a Taxi',
    cn: '师傅，请去北京饭店。',
    pinyin: 'Shīfu, qǐng qù Běijīng Fàndiàn.',
    en: 'Driver, please take me to the Beijing Hotel.',
    words: [
      { word: '师傅', pinyin: 'shīfu', en: 'master / driver' },
      { word: '，', pinyin: '', en: '' },
      { word: '请', pinyin: 'qǐng', en: 'please' },
      { word: '去', pinyin: 'qù', en: 'go to' },
      { word: '北京', pinyin: 'Běijīng', en: 'Beijing' },
      { word: '饭店', pinyin: 'fàndiàn', en: 'hotel / restaurant' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: '师傅 (shīfu) is the standard respectful term for taxi drivers, craftsmen, and service workers.'
  },

  // ==========================
  // HSK 2
  // ==========================
  {
    id: 's-hsk2-01',
    hsk: 2,
    topic: 'Asking Directions',
    cn: '请问去最近的地铁站怎么走？',
    pinyin: 'Qǐngwèn qù zuìjìn de dìtiě zhàn zěnme zǒu?',
    en: 'Excuse me, how do I get to the nearest subway station?',
    words: [
      { word: '请问', pinyin: 'qǐngwèn', en: 'excuse me / may I ask' },
      { word: '去', pinyin: 'qù', en: 'to go to' },
      { word: '最近的', pinyin: 'zuìjìn de', en: 'the nearest' },
      { word: '地铁站', pinyin: 'dìtiě zhàn', en: 'subway station' },
      { word: '怎么走', pinyin: 'zěnme zǒu', en: 'how to get there' },
      { word: '？', pinyin: '', en: '' }
    ],
    grammarNote: '怎么走 (zěnme zǒu) specifically asks for physical directions and turn-by-turn routing.'
  },
  {
    id: 's-hsk2-02',
    hsk: 2,
    topic: 'Shopping & Bargaining',
    cn: '这个多少钱？有点太贵了，便宜一点吧！',
    pinyin: 'Zhège duōshǎo qián? Yǒudiǎn tài guì le, piányi yīdiǎn ba!',
    en: 'How much is this? A bit too expensive, make it a bit cheaper!',
    words: [
      { word: '这个', pinyin: 'zhège', en: 'this one' },
      { word: '多少钱', pinyin: 'duōshǎo qián', en: 'how much money' },
      { word: '？', pinyin: '', en: '' },
      { word: '有点', pinyin: 'yǒudiǎn', en: 'a bit' },
      { word: '太贵了', pinyin: 'tài guì le', en: 'too expensive' },
      { word: '，', pinyin: '', en: '' },
      { word: '便宜一点', pinyin: 'piányi yīdiǎn', en: 'a bit cheaper' },
      { word: '吧', pinyin: 'ba', en: '[soft suggestion]' },
      { word: '！', pinyin: '', en: '' }
    ],
    grammarNote: '便宜一点吧 (piányi yīdiǎn ba) is the quintessential spoken bargaining line at markets.'
  },
  {
    id: 's-hsk2-03',
    hsk: 2,
    topic: 'Listening & Comprehension',
    cn: '请慢一点说，我听不懂。',
    pinyin: 'Qǐng màn yīdiǎn shuō, wǒ tīng bù dǒng.',
    en: 'Please speak a bit slower, I do not understand.',
    words: [
      { word: '请', pinyin: 'qǐng', en: 'please' },
      { word: '慢一点', pinyin: 'màn yīdiǎn', en: 'a bit slower' },
      { word: '说', pinyin: 'shuō', en: 'speak' },
      { word: '，', pinyin: '', en: '' },
      { word: '我', pinyin: 'wǒ', en: 'I' },
      { word: '听不懂', pinyin: 'tīng bù dǒng', en: 'cannot understand (listening)' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: '听不懂 is a potential complement: verb 听 + 不 + result complement 懂.'
  },
  {
    id: 's-hsk2-04',
    hsk: 2,
    topic: 'Dining Preferences',
    cn: '老板，我不吃辣，请不要放辣椒。',
    pinyin: 'Lǎobǎn, wǒ bù chī là, qǐng bùyào fàng làjiāo.',
    en: 'Boss, I don\'t eat spicy, please don\'t put chili pepper.',
    words: [
      { word: '老板', pinyin: 'lǎobǎn', en: 'boss / shopkeeper' },
      { word: '，', pinyin: '', en: '' },
      { word: '我', pinyin: 'wǒ', en: 'I' },
      { word: '不吃辣', pinyin: 'bù chī là', en: 'do not eat spicy' },
      { word: '，', pinyin: '', en: '' },
      { word: '请', pinyin: 'qǐng', en: 'please' },
      { word: '不要放', pinyin: 'bùyào fàng', en: 'do not put' },
      { word: '辣椒', pinyin: 'làjiāo', en: 'chili pepper' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: 'Calling the small restaurant owner 老板 (lǎobǎn) is very natural and friendly in oral Chinese.'
  },

  // ==========================
  // HSK 3
  // ==========================
  {
    id: 's-hsk3-01',
    hsk: 3,
    topic: 'Socializing & Making Plans',
    cn: '周末有空的话，我们找个咖啡馆坐坐聊聊天。',
    pinyin: 'Zhōumò yǒu kòng dehuà, wǒmen zhǎo gè kāfēiguǎn zuòzuo liáoliáo tiān.',
    en: 'If you have time this weekend, let\'s find a café to sit and chat.',
    words: [
      { word: '周末', pinyin: 'zhōumò', en: 'weekend' },
      { word: '有空的话', pinyin: 'yǒu kòng dehuà', en: 'if free' },
      { word: '，', pinyin: '', en: '' },
      { word: '我们', pinyin: 'wǒmen', en: 'we' },
      { word: '找个', pinyin: 'zhǎo gè', en: 'find a' },
      { word: '咖啡馆', pinyin: 'kāfēiguǎn', en: 'café' },
      { word: '坐坐', pinyin: 'zuòzuo', en: 'sit a while' },
      { word: '聊聊天', pinyin: 'liáoliáo tiān', en: 'chat casually' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: 'Verb reduplication (坐坐, 聊聊天) creates an informal, relaxed tone.'
  },
  {
    id: 's-hsk3-02',
    hsk: 3,
    topic: 'Expressing Opinions',
    cn: '学汉字虽然难，但是非常有意思！',
    pinyin: 'Xué hànzì suīrán nán, dànshì fēicháng yǒu yìsi!',
    en: 'Although learning Hanzi is hard, it is extremely interesting!',
    words: [
      { word: '学汉字', pinyin: 'xué hànzì', en: 'learn characters' },
      { word: '虽然', pinyin: 'suīrán', en: 'although' },
      { word: '难', pinyin: 'nán', en: 'difficult' },
      { word: '，', pinyin: '', en: '' },
      { word: '但是', pinyin: 'dànshì', en: 'but' },
      { word: '非常', pinyin: 'fēicháng', en: 'extremely' },
      { word: '有意思', pinyin: 'yǒu yìsi', en: 'interesting' },
      { word: '！', pinyin: '', en: '' }
    ],
    grammarNote: 'The 虽然...但是... pattern pairs contrast: "although X, but Y".'
  },
  {
    id: 's-hsk3-03',
    hsk: 3,
    topic: 'Travel & Airport',
    cn: '别担心，你下飞机后我一定在出口接你。',
    pinyin: 'Bié dānxīn, nǐ xià fēijī hòu wǒ yīdìng zài chūkǒu jiē nǐ.',
    en: 'Don\'t worry, after you get off the plane I will definitely pick you up at the exit.',
    words: [
      { word: '别担心', pinyin: 'bié dānxīn', en: 'don\'t worry' },
      { word: '，', pinyin: '', en: '' },
      { word: '你', pinyin: 'nǐ', en: 'you' },
      { word: '下飞机后', pinyin: 'xià fēijī hòu', en: 'after getting off plane' },
      { word: '我', pinyin: 'wǒ', en: 'I' },
      { word: '一定', pinyin: 'yīdìng', en: 'definitely' },
      { word: '在出口', pinyin: 'zài chūkǒu', en: 'at the exit' },
      { word: '接你', pinyin: 'jiē nǐ', en: 'pick you up' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: '接 (jiē) here means to meet or pick up someone arriving from a journey.'
  },
  {
    id: 's-hsk3-04',
    hsk: 3,
    topic: 'High-Speed Railway',
    cn: '坐高铁从北京到上海只需要四个多小时。',
    pinyin: 'Zuò gāotiě cóng Běijīng dào Shànghǎi zhǐ xūyào sì gè duō xiǎoshí.',
    en: 'Taking the high-speed rail from Beijing to Shanghai only takes a bit over four hours.',
    words: [
      { word: '坐高铁', pinyin: 'zuò gāotiě', en: 'take high-speed train' },
      { word: '从...到...', pinyin: 'cóng... dào...', en: 'from... to...' },
      { word: '只', pinyin: 'zhǐ', en: 'only' },
      { word: '需要', pinyin: 'xūyào', en: 'requires' },
      { word: '四个多小时', pinyin: 'sì gè duō xiǎoshí', en: 'over 4 hours' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: '高铁 (gāotiě) is standard modern oral shorthand for high-speed rail (高速铁路).'
  },

  // ==========================
  // HSK 4
  // ==========================
  {
    id: 's-hsk4-01',
    hsk: 4,
    topic: 'Reservations & Planning',
    cn: '周末这家餐厅人特别多，最好提前在网上预订位置。',
    pinyin: 'Zhōumò zhè jiā cāntīng rén tèbié duō, zuì hǎo tíqián zài wǎngshàng yùdìng wèizhì.',
    en: 'This restaurant gets particularly crowded on weekends; you\'d better reserve a table online in advance.',
    words: [
      { word: '周末', pinyin: 'zhōumò', en: 'on weekends' },
      { word: '这家餐厅', pinyin: 'zhè jiā cāntīng', en: 'this restaurant' },
      { word: '人特别多', pinyin: 'rén tèbié duō', en: 'very crowded' },
      { word: '，', pinyin: '', en: '' },
      { word: '最好', pinyin: 'zuì hǎo', en: 'had better' },
      { word: '提前', pinyin: 'tíqián', en: 'in advance' },
      { word: '在网上', pinyin: 'zài wǎngshàng', en: 'online' },
      { word: '预订', pinyin: 'yùdìng', en: 'reserve' },
      { word: '位置', pinyin: 'wèizhì', en: 'seat / table' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: '提前 (tíqián) is widely used: 提前预订, 提前准备.'
  },
  {
    id: 's-hsk4-02',
    hsk: 4,
    topic: 'Work & Environment',
    cn: '适应一个新的工作环境往往需要几个月的时间。',
    pinyin: 'Shìyìng yī gè xīn de gōngzuò huánjìng wǎngwǎng xūyào jǐ gè yuè de shíjiān.',
    en: 'Adapting to a new work environment often requires several months of time.',
    words: [
      { word: '适应', pinyin: 'shìyìng', en: 'to adapt to' },
      { word: '一个', pinyin: 'yī gè', en: 'a' },
      { word: '新的', pinyin: 'xīn de', en: 'new' },
      { word: '工作环境', pinyin: 'gōngzuò huánjìng', en: 'work environment' },
      { word: '往往', pinyin: 'wǎngwǎng', en: 'often / tend to' },
      { word: '需要', pinyin: 'xūyào', en: 'require' },
      { word: '几个月的时间', pinyin: 'jǐ gè yuè de shíjiān', en: 'several months time' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: '往往 (wǎngwǎng) describes natural tendencies based on regular observation.'
  },

  // ==========================
  // HSK 5
  // ==========================
  {
    id: 's-hsk5-01',
    hsk: 5,
    topic: 'Professional & Business',
    cn: '经过多次协商，双方终于达成了一项长期的战略合作协议。',
    pinyin: 'Jīngguò duō cì xiéshāng, shuāngfāng zhōngyú dáchéng le yī xiàng chángqī de zhànlüè hézuò xiéyì.',
    en: 'After numerous consultations, both parties finally reached a long-term strategic cooperation agreement.',
    words: [
      { word: '经过', pinyin: 'jīngguò', en: 'after / through' },
      { word: '多次', pinyin: 'duō cì', en: 'multiple rounds of' },
      { word: '协商', pinyin: 'xiéshāng', en: 'consultation' },
      { word: '，', pinyin: '', en: '' },
      { word: '双方', pinyin: 'shuāngfāng', en: 'both sides' },
      { word: '终于', pinyin: 'zhōngyú', en: 'finally' },
      { word: '达成了一项', pinyin: 'dáchéng le yī xiàng', en: 'reached a' },
      { word: '长期的', pinyin: 'chángqī de', en: 'long-term' },
      { word: '战略合作协议', pinyin: 'zhànlüè hézuò xiéyì', en: 'strategic cooperation agreement' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: '达成...协议 (dáchéng... xiéyì) is formal business Chinese for concluding a pact.'
  },
  {
    id: 's-hsk5-02',
    hsk: 5,
    topic: 'Nuanced Expression & Culture',
    cn: '随着经济的快速发展，这座沿海城市的夜市文化也日益繁荣。',
    pinyin: 'Suízhe jīngjì de kuàisù fāzhǎn, zhè zuò yánhǎi chéngshì de yèshì wénhuà yě rìyì fánróng.',
    en: 'Along with rapid economic development, the night-market culture of this coastal city has also flourished day by day.',
    words: [
      { word: '随着', pinyin: 'suízhe', en: 'along with' },
      { word: '经济的', pinyin: 'jīngjì de', en: 'economic' },
      { word: '快速发展', pinyin: 'kuàisù fāzhǎn', en: 'rapid development' },
      { word: '，', pinyin: '', en: '' },
      { word: '这座', pinyin: 'zhè zuò', en: 'this' },
      { word: '沿海城市', pinyin: 'yánhǎi chéngshì', en: 'coastal city' },
      { word: '夜市文化', pinyin: 'yèshì wénhuà', en: 'night market culture' },
      { word: '也', pinyin: 'yě', en: 'also' },
      { word: '日益繁荣', pinyin: 'rìyì fánróng', en: 'prospering day by day' },
      { word: '。', pinyin: '', en: '' }
    ],
    grammarNote: '随着 (suízhe) + [trend], ...日益 (rìyì) + [adjective] is a sophisticated oral/written structure.'
  }
];
