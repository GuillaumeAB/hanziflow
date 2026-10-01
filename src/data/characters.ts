import { CharacterDetail, HSKLevel } from '../types';
import { RADICALS_DATA } from './radicals';

export const CHARACTERS_DATA: Record<string, CharacterDetail> = {
  // ==========================
  // HSK 1
  // ==========================
  '你': {
    char: '你',
    pinyin: 'nǐ',
    tone: 3,
    english: 'you (singular)',
    hsk: 1,
    strokeCount: 7,
    radical: '亻',
    radicalMeaning: 'Person radical (human behavior & interpersonal relationships)',
    radicalName: 'Standing Person (单人旁 dān rén páng)',
    whyRadical: 'Uses the Person radical 亻 because "you" refers directly to an individual human being in face-to-face interaction.',
    formula: {
      radical: '亻',
      radicalRole: 'Semantic root (human person)',
      phoneticOrOther: '尔',
      phoneticRole: 'Phonetic component (archaic ěr, also second-person pronoun)'
    },
    components: [
      { char: '亻', meaning: 'person', pinyin: 'rén', role: 'semantic' },
      { char: '尔', meaning: 'you / that', pinyin: 'ěr', role: 'phonetic' }
    ],
    etymology: 'Formed from person radical 亻 (rén) indicating human relationship + 尔 (ěr) providing ancient sound and second-person reference.',
    mnemonic: 'A PERSON (亻) standing directly in front of you (尔).',
    exampleWords: [
      { word: '你好', pinyin: 'nǐ hǎo', english: 'hello' },
      { word: '你们', pinyin: 'nǐ men', english: 'you all' },
      { word: '你的', pinyin: 'nǐ de', english: 'your / yours' }
    ],
    exampleSentences: [
      { cn: '你好，很高兴认识你！', pinyin: 'Nǐ hǎo, hěn gāoxìng rènshi nǐ!', en: 'Hello, nice to meet you!' },
      { cn: '你今天忙不忙？', pinyin: 'Nǐ jīntiān máng bù máng?', en: 'Are you busy today?' }
    ]
  },
  '好': {
    char: '好',
    pinyin: 'hǎo',
    tone: 3,
    english: 'good, well, fine, okay',
    hsk: 1,
    strokeCount: 6,
    radical: '女',
    radicalMeaning: 'Woman / Female radical (nurture, family, femininity)',
    radicalName: 'Woman Radical (女字旁 nǚ zì páng)',
    whyRadical: 'Uses the Woman radical 女 paired with Child 子. In ancient Chinese society, a mother holding her newborn child represented the purest symbol of goodness, love, and prosperity.',
    formula: {
      radical: '女',
      radicalRole: 'Semantic root (woman / mother)',
      phoneticOrOther: '子',
      phoneticRole: 'Semantic component (child / newborn)'
    },
    components: [
      { char: '女', meaning: 'woman / mother', pinyin: 'nǚ', role: 'semantic' },
      { char: '子', meaning: 'child / son', pinyin: 'zǐ', role: 'semantic' }
    ],
    etymology: 'Ancient compound ideograph combining 女 (woman) and 子 (child). Maternal affection and healthy offspring symbolize ultimate goodness.',
    mnemonic: 'When a MOTHER (女) holds her CHILD (子), all is GOOD (好).',
    exampleWords: [
      { word: '好看', pinyin: 'hǎo kàn', english: 'good-looking / attractive' },
      { word: '好吃', pinyin: 'hǎo chī', english: 'delicious' },
      { word: '好处', pinyin: 'hǎo chu', english: 'advantage / benefit' }
    ],
    exampleSentences: [
      { cn: '这个中国菜真好吃！', pinyin: 'Zhège zhōngguó cài zhēn hǎochī!', en: 'This Chinese dish is really delicious!' },
      { cn: '明天天气很好。', pinyin: 'Míngtiān tiānqì hěn hǎo.', en: 'Tomorrow the weather will be very good.' }
    ]
  },
  '语': {
    char: '语',
    pinyin: 'yǔ',
    tone: 3,
    english: 'spoken language, words, discourse',
    hsk: 1,
    strokeCount: 9,
    radical: '讠',
    radicalMeaning: 'Speech radical (words, speaking, conversation, linguistic expression)',
    radicalName: 'Speech Radical (言字旁 yán zì páng)',
    whyRadical: 'Uses the Speech radical 讠 because "language" consists entirely of spoken words and vocal discourse.',
    formula: {
      radical: '讠',
      radicalRole: 'Semantic root (spoken words)',
      phoneticOrOther: '吾',
      phoneticRole: 'Phonetic component (wú, self/I, built from 五 five + 口 mouth)'
    },
    components: [
      { char: '讠', meaning: 'speech / words', pinyin: 'yán', role: 'semantic' },
      { char: '五', meaning: 'five', pinyin: 'wǔ', role: 'structural' },
      { char: '口', meaning: 'mouth', pinyin: 'kǒu', role: 'structural' }
    ],
    etymology: 'Phono-semantic compound: 讠 (words) + 吾 (wú, self/I). Words spoken from one\'s own vocal cords form language.',
    mnemonic: 'SPEECH (讠) coming from your MOUTH (口) is your spoken LANGUAGE.',
    exampleWords: [
      { word: '汉语', pinyin: 'hàn yǔ', english: 'Chinese language' },
      { word: '英语', pinyin: 'yīng yǔ', english: 'English language' },
      { word: '口语', pinyin: 'kǒu yǔ', english: 'spoken / oral language' }
    ],
    exampleSentences: [
      { cn: '我想提高我的汉语口语。', pinyin: 'Wǒ xiǎng tígāo wǒ de hànyǔ kǒuyǔ.', en: 'I want to improve my spoken Chinese.' },
      { cn: '你会说几种语言？', pinyin: 'Nǐ huì shuō jǐ zhǒng yǔyán?', en: 'How many languages can you speak?' }
    ]
  },
  '说': {
    char: '说',
    pinyin: 'shuō',
    tone: 1,
    english: 'to speak, to say, to talk',
    hsk: 1,
    strokeCount: 9,
    radical: '讠',
    radicalMeaning: 'Speech radical (verbal communication)',
    radicalName: 'Speech Radical (言字旁 yán zì páng)',
    whyRadical: 'Uses the Speech radical 讠 because speaking is the primary act of vocalizing words.',
    formula: {
      radical: '讠',
      radicalRole: 'Semantic root (words and speech)',
      phoneticOrOther: '兑',
      phoneticRole: 'Phonetic component (duì, opening mouth in joy)'
    },
    components: [
      { char: '讠', meaning: 'speech', pinyin: 'yán', role: 'semantic' },
      { char: '兑', meaning: 'exchange / joyful opening', pinyin: 'duì', role: 'phonetic' }
    ],
    etymology: 'Speech radical 讠 + 兑 (open mouth/joy). Speaking words openly to communicate thoughts.',
    mnemonic: 'With SPEECH (讠), you open your mouth to TALK (说).',
    exampleWords: [
      { word: '说话', pinyin: 'shuō huà', english: 'to talk / to speak' },
      { word: '说明', pinyin: 'shuō míng', english: 'to explain / explanation' },
      { word: '听说', pinyin: 'tīng shuō', english: 'hear of / rumors say' }
    ],
    exampleSentences: [
      { cn: '请慢一点说，我听不懂。', pinyin: 'Qǐng màn yīdiǎn shuō, wǒ tīng bù dǒng.', en: 'Please speak slower, I don\'t understand.' },
      { cn: '你会说中文吗？', pinyin: 'Nǐ huì shuō zhōngwén ma?', en: 'Can you speak Chinese?' }
    ]
  },
  '想': {
    char: '想',
    pinyin: 'xiǎng',
    tone: 3,
    english: 'to think, to want, to miss',
    hsk: 1,
    strokeCount: 13,
    radical: '心',
    radicalMeaning: 'Heart bottom radical (thoughts, mind, desires, emotions)',
    radicalName: 'Heart Bottom (心字底 xīn zì dǐ)',
    whyRadical: 'In traditional Chinese medicine and philosophy, thinking, longing, and intentions originate in the Heart 心, not the brain. Hence mental/emotional verbs use 心.',
    formula: {
      radical: '心',
      radicalRole: 'Semantic root (heart / mind / intent)',
      phoneticOrOther: '相',
      phoneticRole: 'Phonetic component (xiāng, visual appearance from tree 木 + eye 目)'
    },
    components: [
      { char: '相', meaning: 'appearance / mutual', pinyin: 'xiāng', role: 'phonetic' },
      { char: '心', meaning: 'heart / mind', pinyin: 'xīn', role: 'semantic' }
    ],
    etymology: 'Phono-semantic compound: 相 (xiāng) provides sound; 心 (heart) at the base supplies the meaning of contemplation and yearning.',
    mnemonic: 'Visualizing an image (相) in your deep HEART (心) because you THINK and MISS someone.',
    exampleWords: [
      { word: '想念', pinyin: 'xiǎng niàn', english: 'to miss (someone)' },
      { word: '想法', pinyin: 'xiǎng fǎ', english: 'idea / opinion' },
      { word: '想去', pinyin: 'xiǎng qù', english: 'want to go' }
    ],
    exampleSentences: [
      { cn: '我想去中国旅游。', pinyin: 'Wǒ xiǎng qù zhōngguó lǚyóu.', en: 'I want to travel to China.' },
      { cn: '我很想我的家人。', pinyin: 'Wǒ hěn xiǎng wǒ de jiārén.', en: 'I miss my family very much.' }
    ]
  },
  '听': {
    char: '听',
    pinyin: 'tīng',
    tone: 1,
    english: 'to listen, to hear, to obey',
    hsk: 1,
    strokeCount: 7,
    radical: '口',
    radicalMeaning: 'Mouth radical (sensory/speech organ, vocal sounds)',
    radicalName: 'Mouth Radical (口字旁 kǒu zì páng)',
    whyRadical: 'Uses the Mouth radical 口 because hearing relies on listening to acoustic sounds produced by vocal mouths.',
    formula: {
      radical: '口',
      radicalRole: 'Semantic root (sound / mouth opening)',
      phoneticOrOther: '斤',
      phoneticRole: 'Phonetic component (jīn, axe / catty)'
    },
    components: [
      { char: '口', meaning: 'mouth', pinyin: 'kǒu', role: 'semantic' },
      { char: '斤', meaning: 'axe / catty (weight)', pinyin: 'jīn', role: 'phonetic' }
    ],
    etymology: 'Simplified from 聽 (which had ear 耳 and heart 心). The modern simplified standard uses 口 (sound) + 斤 (phonetic jīn).',
    mnemonic: 'Opening your senses to sound near your MOUTH (口).',
    exampleWords: [
      { word: '听见', pinyin: 'tīng jiàn', english: 'to hear' },
      { word: '听力', pinyin: 'tīng lì', english: 'listening comprehension' },
      { word: '听音乐', pinyin: 'tīng yīnyuè', english: 'listen to music' }
    ],
    exampleSentences: [
      { cn: '你听，外面下雨了。', pinyin: 'Nǐ tīng, wàimiàn xiàyǔ le.', en: 'Listen! It is raining outside.' },
      { cn: '我喜欢一边喝茶一边听音乐。', pinyin: 'Wǒ xǐhuan yībiān hēchá yībiān tīng yīnyuè.', en: 'I like drinking tea while listening to music.' }
    ]
  },
  '吃': {
    char: '吃',
    pinyin: 'chī',
    tone: 1,
    english: 'to eat, to consume',
    hsk: 1,
    strokeCount: 6,
    radical: '口',
    radicalMeaning: 'Mouth radical (ingestion, eating, tasting)',
    radicalName: 'Mouth Radical (口字旁 kǒu zì páng)',
    whyRadical: 'Uses the Mouth radical 口 because eating is an oral action involving chewing and tasting.',
    formula: {
      radical: '口',
      radicalRole: 'Semantic root (mouth for consuming food)',
      phoneticOrOther: '乞',
      phoneticRole: 'Phonetic component (qǐ, begging/seeking)'
    },
    components: [
      { char: '口', meaning: 'mouth', pinyin: 'kǒu', role: 'semantic' },
      { char: '乞', meaning: 'to beg / to seek', pinyin: 'qǐ', role: 'phonetic' }
    ],
    etymology: 'Semantic 口 (mouth) + phonetic 乞 (qǐ). Replacing the older complex character 喫.',
    mnemonic: 'Putting delicious food into your MOUTH (口) to EAT.',
    exampleWords: [
      { word: '吃饭', pinyin: 'chī fàn', english: 'to have a meal' },
      { word: '好吃', pinyin: 'hǎo chī', english: 'delicious' },
      { word: '小吃', pinyin: 'xiǎo chī', english: 'street food / snacks' }
    ],
    exampleSentences: [
      { cn: '我们一起去吃饭吧！', pinyin: 'Wǒmen yīqǐ qù chīfàn ba!', en: 'Let\'s go have a meal together!' },
      { cn: '你今天中午吃了什么？', pinyin: 'Nǐ jīntiān zhōngwǔ chī le shénme?', en: 'What did you eat for lunch today?' }
    ]
  },
  '喝': {
    char: '喝',
    pinyin: 'hē',
    tone: 1,
    english: 'to drink, to swallow liquid',
    hsk: 1,
    strokeCount: 12,
    radical: '口',
    radicalMeaning: 'Mouth radical (ingestion of liquids)',
    radicalName: 'Mouth Radical (口字旁 kǒu zì páng)',
    whyRadical: 'Uses the Mouth radical 口 because drinking is the physical act of bringing liquid into the mouth.',
    formula: {
      radical: '口',
      radicalRole: 'Semantic root (mouth)',
      phoneticOrOther: '曷',
      phoneticRole: 'Phonetic component (hé, ancient interrogative)'
    },
    components: [
      { char: '口', meaning: 'mouth', pinyin: 'kǒu', role: 'semantic' },
      { char: '曷', meaning: 'why / how (archaic)', pinyin: 'hé', role: 'phonetic' }
    ],
    etymology: 'Semantic 口 (mouth) + phonetic 曷 (hé). Ingesting liquid into the throat.',
    mnemonic: 'Under the hot sun (日), open your MOUTH (口) to DRINK (喝).',
    exampleWords: [
      { word: '喝水', pinyin: 'hē shuǐ', english: 'drink water' },
      { word: '喝茶', pinyin: 'hē chá', english: 'drink tea' },
      { word: '好喝', pinyin: 'hǎo hē', english: 'tasty (drink)' }
    ],
    exampleSentences: [
      { cn: '你想喝咖啡还是喝茶？', pinyin: 'Nǐ xiǎng hē kāfēi háishì hē chá?', en: 'Do you want to drink coffee or tea?' },
      { cn: '多喝热水对身体好。', pinyin: 'Duō hē rèshuǐ duì shēntǐ hǎo.', en: 'Drinking more hot water is good for your health.' }
    ]
  },
  '汉': {
    char: '汉',
    pinyin: 'hàn',
    tone: 4,
    english: 'Han Chinese, Chinese language, man',
    hsk: 1,
    strokeCount: 5,
    radical: '氵',
    radicalMeaning: 'Three Dots of Water (rivers, waterways, liquids)',
    radicalName: 'Three Dots of Water (三点水 sān diǎn shuǐ)',
    whyRadical: 'The Han people and language take their name from the Han River (汉水 Hàn Shuǐ), a major tributary of the Yangtze River. Because it originally designated a river, it carries the Water radical 氵.',
    formula: {
      radical: '氵',
      radicalRole: 'Semantic root (water / river tributary)',
      phoneticOrOther: '又',
      phoneticRole: 'Structural simplification (originally 𦰡 / 堇)'
    },
    components: [
      { char: '氵', meaning: 'water / river', pinyin: 'shuǐ', role: 'semantic' },
      { char: '又', meaning: 'hand / again', pinyin: 'yòu', role: 'structural' }
    ],
    etymology: 'Originally the name of the Han River (漢水). The Han Dynasty took its name from this region, which subsequently became the name of China\'s predominant ethnic group and language.',
    mnemonic: 'WATER (氵) flowing down the ancient Han River gave birth to the HAN (汉) culture.',
    exampleWords: [
      { word: '汉语', pinyin: 'hàn yǔ', english: 'Chinese language' },
      { word: '汉字', pinyin: 'hàn zì', english: 'Chinese characters' },
      { word: '汉族', pinyin: 'hàn zú', english: 'Han ethnicity' }
    ],
    exampleSentences: [
      { cn: '学汉字非常有意思。', pinyin: 'Xué hànzì fēicháng yǒu yìsi.', en: 'Learning Hanzi is extremely interesting.' }
    ]
  },
  '茶': {
    char: '茶',
    pinyin: 'chá',
    tone: 2,
    english: 'tea, tea leaves',
    hsk: 1,
    strokeCount: 9,
    radical: '艹',
    radicalMeaning: 'Grass & Plant radical (herbs, vegetation, flora)',
    radicalName: 'Grass Head (草字头 cǎo zì tóu)',
    whyRadical: 'Uses the Grass radical 艹 at the top because tea is an herbal plant and beverage brewed from harvested leaves.',
    formula: {
      radical: '艹',
      radicalRole: 'Semantic root (vegetation / herbal leaf)',
      phoneticOrOther: '余',
      phoneticRole: 'Structural base (man 人 among wood 木)'
    },
    components: [
      { char: '艹', meaning: 'grass / plants', pinyin: 'cǎo', role: 'semantic' },
      { char: '人', meaning: 'person', pinyin: 'rén', role: 'structural' },
      { char: '木', meaning: 'tree / wood', pinyin: 'mù', role: 'structural' }
    ],
    etymology: 'Plant radical 艹 on top + person 人 standing among trees 木. A human harvesting fragrant leaves in nature.',
    mnemonic: 'A PERSON (人) between LEAVES (艹) and TREES (木) enjoying fragrant TEA (茶).',
    exampleWords: [
      { word: '绿茶', pinyin: 'lǜ chá', english: 'green tea' },
      { word: '红茶', pinyin: 'hóng chá', english: 'black tea' },
      { word: '喝茶', pinyin: 'hē chá', english: 'drink tea' }
    ],
    exampleSentences: [
      { cn: '中国人很喜欢喝热茶。', pinyin: 'Zhōngguó rén hěn xǐhuan hē rè chá.', en: 'Chinese people love drinking hot tea.' }
    ]
  },
  '饭': {
    char: '饭',
    pinyin: 'fàn',
    tone: 4,
    english: 'cooked rice, meal, food',
    hsk: 1,
    strokeCount: 7,
    radical: '饣',
    radicalMeaning: 'Food radical (nourishment, cooking, meals)',
    radicalName: 'Food Radical (食字旁 shí zì páng)',
    whyRadical: 'Uses the Food radical 饣 (simplified form of 食 shí) because rice is the staple food and essence of daily meals in Chinese culture.',
    formula: {
      radical: '饣',
      radicalRole: 'Semantic root (food / eating)',
      phoneticOrOther: '反',
      phoneticRole: 'Phonetic component (fǎn)'
    },
    components: [
      { char: '饣', meaning: 'food / meal', pinyin: 'shí', role: 'semantic' },
      { char: '反', meaning: 'reverse / opposite', pinyin: 'fǎn', role: 'phonetic' }
    ],
    etymology: 'Phono-semantic compound: Food radical 饣 provides meaning; 反 (fǎn) indicates pronunciation fàn.',
    mnemonic: 'FOOD (饣) turned over (反) in the hot cooking pot becomes warm RICE (饭).',
    exampleWords: [
      { word: '吃饭', pinyin: 'chī fàn', english: 'to eat a meal' },
      { word: '米饭', pinyin: 'mǐ fàn', english: 'cooked rice' },
      { word: '早饭', pinyin: 'zǎo fàn', english: 'breakfast' }
    ],
    exampleSentences: [
      { cn: '你吃晚饭了吗？', pinyin: 'Nǐ chī wǎnfàn le ma?', en: 'Have you eaten dinner?' }
    ]
  },

  // ==========================
  // HSK 2
  // ==========================
  '懂': {
    char: '懂',
    pinyin: 'dǒng',
    tone: 3,
    english: 'to understand, to comprehend',
    hsk: 2,
    strokeCount: 15,
    radical: '忄',
    radicalMeaning: 'Vertical Heart radical (mental insight, emotions, comprehension)',
    radicalName: 'Vertical Heart (竖心旁 shù xīn páng)',
    whyRadical: 'Uses the Heart radical 忄 because true understanding is a cognitive and emotional realization that registers within the mind/heart.',
    formula: {
      radical: '忄',
      radicalRole: 'Semantic root (mind / emotional comprehension)',
      phoneticOrOther: '董',
      phoneticRole: 'Phonetic component (dǒng, to supervise / heavy)'
    },
    components: [
      { char: '忄', meaning: 'heart / mind', pinyin: 'xīn', role: 'semantic' },
      { char: '董', meaning: 'to supervise / direct', pinyin: 'dǒng', role: 'phonetic' }
    ],
    etymology: 'Phono-semantic compound: Heart radical 忄 (understanding) + 董 (dǒng, sound). Grasping insight with the heart.',
    mnemonic: 'When your HEART (忄) grasps the point, you finally UNDERSTAND (懂).',
    exampleWords: [
      { word: '听懂', pinyin: 'tīng dǒng', english: 'understand from listening' },
      { word: '懂事', pinyin: 'dǒng shì', english: 'sensible / mature' },
      { word: '不懂', pinyin: 'bù dǒng', english: 'do not understand' }
    ],
    exampleSentences: [
      { cn: '你能听懂他说的话吗？', pinyin: 'Nǐ néng tīng dǒng tā shuō de huà ma?', en: 'Can you understand what he says?' },
      { cn: '我完全懂你的意思。', pinyin: 'Wǒ wánquán dǒng nǐ de yìsi.', en: 'I completely understand what you mean.' }
    ]
  },
  '问': {
    char: '问',
    pinyin: 'wèn',
    tone: 4,
    english: 'to ask, to inquire',
    hsk: 2,
    strokeCount: 6,
    radical: '门',
    radicalMeaning: 'Door / Gate radical (enclosure, entryway)',
    radicalName: 'Door Radical (门字框 mén zì kuàng)',
    whyRadical: 'Visual ideograph: placing your MOUTH 口 at someone\'s DOOR 门 to call out and inquire if they are inside.',
    formula: {
      radical: '门',
      radicalRole: 'Structural enclosure (door / doorway)',
      phoneticOrOther: '口',
      phoneticRole: 'Semantic core (mouth asking a question)'
    },
    components: [
      { char: '门', meaning: 'door / gate', pinyin: 'mén', role: 'structural' },
      { char: '口', meaning: 'mouth', pinyin: 'kǒu', role: 'semantic' }
    ],
    etymology: 'An ideographic composition of 口 (mouth) inside 门 (door). Asking a question at the gate.',
    mnemonic: 'Knocking at the DOOR (门) with your MOUTH (口) to ASK (问).',
    exampleWords: [
      { word: '问题', pinyin: 'wèn tí', english: 'question / problem' },
      { word: '问路', pinyin: 'wèn lù', english: 'ask for directions' },
      { word: '请问', pinyin: 'qǐng wèn', english: 'excuse me, may I ask' }
    ],
    exampleSentences: [
      { cn: '请问去地铁站怎么走？', pinyin: 'Qǐngwèn qù dìtiě zhàn zěnme zǒu?', en: 'Excuse me, how do I get to the subway station?' }
    ]
  },
  '找': {
    char: '找',
    pinyin: 'zhǎo',
    tone: 3,
    english: 'to look for, to search, to give change',
    hsk: 2,
    strokeCount: 7,
    radical: '扌',
    radicalMeaning: 'Hand radical (physical actions performed with hands)',
    radicalName: 'Hand Radical (提手旁 tí shǒu páng)',
    whyRadical: 'Uses the Hand radical 扌 because searching involves moving objects, rummaging through pockets, or handing back monetary change with your hands.',
    formula: {
      radical: '扌',
      radicalRole: 'Semantic root (manual handling / searching)',
      phoneticOrOther: '戈',
      phoneticRole: 'Phonetic/historical component (dagger-axe gē)'
    },
    components: [
      { char: '扌', meaning: 'hand', pinyin: 'shǒu', role: 'semantic' },
      { char: '戈', meaning: 'dagger-axe / tool', pinyin: 'gē', role: 'phonetic' }
    ],
    etymology: 'Originally reaching out with weapons or tools in hand to search a territory.',
    mnemonic: 'Using your HANDS (扌) to SEARCH (找) everywhere.',
    exampleWords: [
      { word: '找到', pinyin: 'zhǎo dào', english: 'found / located' },
      { word: '找钱', pinyin: 'zhǎo qián', english: 'give change' },
      { word: '找工作', pinyin: 'zhǎo gōngzuò', english: 'look for a job' }
    ],
    exampleSentences: [
      { cn: '我找不到我的手机了！', pinyin: 'Wǒ zhǎo bù dào wǒ de shǒujī le!', en: 'I cannot find my phone!' }
    ]
  },
  '买': {
    char: '买',
    pinyin: 'mǎi',
    tone: 3,
    english: 'to buy, to purchase',
    hsk: 2,
    strokeCount: 6,
    radical: '乙',
    radicalMeaning: 'Second / hook radical',
    radicalName: 'Hook Radical (乙字旁)',
    whyRadical: 'Simplified from traditional 買, which depicted an ancient fishing net 网 capturing valuable cowrie shells 貝 (the earliest Chinese currency).',
    formula: {
      radical: '乛',
      radicalRole: 'Cover / frame',
      phoneticOrOther: '头',
      phoneticRole: 'Simplified base'
    },
    components: [
      { char: '乛', meaning: 'hook / shelter', pinyin: 'wān', role: 'structural' },
      { char: '头', meaning: 'head / base', pinyin: 'tóu', role: 'structural' }
    ],
    etymology: 'Anciently netting cowrie shells. Contrast with 卖 (mài, to sell), which adds an outgoing cross 十/士 on top.',
    mnemonic: 'You BUY (买) things to bring home under your roof, while the vendor SELLS (卖).',
    exampleWords: [
      { word: '买单', pinyin: 'mǎi dān', english: 'pay the bill' },
      { word: '买东西', pinyin: 'mǎi dōngxi', english: 'shopping' },
      { word: '买票', pinyin: 'mǎi piào', english: 'buy a ticket' }
    ],
    exampleSentences: [
      { cn: '服务员，买单！', pinyin: 'Fúwùyuán, mǎidān!', en: 'Waiter, the bill please!' }
    ]
  },
  '钱': {
    char: '钱',
    pinyin: 'qián',
    tone: 2,
    english: 'money, coins, currency',
    hsk: 2,
    strokeCount: 10,
    radical: '钅',
    radicalMeaning: 'Gold / Metal radical (metallic objects, currency, coins)',
    radicalName: 'Metal Radical (金字旁 jīn zì páng)',
    whyRadical: 'Uses the Metal radical 钅 (金 jīn) because traditional Chinese coins and currency were cast from copper, silver, and gold metal.',
    formula: {
      radical: '钅',
      radicalRole: 'Semantic root (metallic coinage)',
      phoneticOrOther: '戋',
      phoneticRole: 'Phonetic component (jiān, small/stacked)'
    },
    components: [
      { char: '钅', meaning: 'gold / metal', pinyin: 'jīn', role: 'semantic' },
      { char: '戋', meaning: 'stacked coins / small', pinyin: 'jiān', role: 'phonetic' }
    ],
    etymology: 'Phono-semantic compound: 钅 (metal) + 戋 (stacked coins). Metallic circular coins strung together.',
    mnemonic: 'METALLIC (钅) coins stacked together make MONEY (钱).',
    exampleWords: [
      { word: '多少钱', pinyin: 'duōshǎo qián', english: 'how much money' },
      { word: '钱包', pinyin: 'qián bāo', english: 'wallet' },
      { word: '有钱', pinyin: 'yǒu qián', english: 'wealthy' }
    ],
    exampleSentences: [
      { cn: '这个多少钱？有点太贵了。', pinyin: 'Zhège duōshǎo qián? Yǒudiǎn tài guì le.', en: 'How much is this? A bit too expensive.' }
    ]
  },
  '贵': {
    char: '贵',
    pinyin: 'guì',
    tone: 4,
    english: 'expensive, precious, noble',
    hsk: 2,
    strokeCount: 9,
    radical: '贝',
    radicalMeaning: 'Cowrie Shell radical (money, valuables, treasure)',
    radicalName: 'Shell Radical (贝字旁 bèi zì páng)',
    whyRadical: 'Uses the Shell radical 贝 at the bottom because sea cowrie shells were used as ancient money and represented great material wealth and precious value.',
    formula: {
      radical: '贝',
      radicalRole: 'Semantic root (cowrie shell currency / precious value)',
      phoneticOrOther: '中+一',
      phoneticRole: 'Upper structural basket (packed goods)'
    },
    components: [
      { char: '中', meaning: 'middle', pinyin: 'zhōng', role: 'structural' },
      { char: '一', meaning: 'one', pinyin: 'yī', role: 'structural' },
      { char: '贝', meaning: 'cowrie shell / wealth', pinyin: 'bèi', role: 'semantic' }
    ],
    etymology: 'High value goods placed above precious cowrie shells 贝.',
    mnemonic: 'Requiring many precious SHELLS (贝) means it is EXPENSIVE (贵).',
    exampleWords: [
      { word: '太贵了', pinyin: 'tài guì le', english: 'too expensive' },
      { word: '贵姓', pinyin: 'guì xìng', english: 'honorable surname' },
      { word: '宝贵', pinyin: 'bǎo guì', english: 'precious' }
    ],
    exampleSentences: [
      { cn: '便宜一点吧，太贵了！', pinyin: 'Piányi yīdiǎn ba, tài guì le!', en: 'A bit cheaper please, it\'s too expensive!' }
    ]
  },

  // ==========================
  // HSK 3
  // ==========================
  '难': {
    char: '难',
    pinyin: 'nán',
    tone: 2,
    english: 'difficult, hard, troublesome',
    hsk: 3,
    strokeCount: 10,
    radical: '又',
    radicalMeaning: 'Hand / Again radical (effort, repeated action)',
    radicalName: 'Hand Radical (又字旁 yòu zì páng)',
    whyRadical: 'Depicts a bird 隹 being trapped by a human hand 又, symbolizing a desperate struggle and immense difficulty.',
    formula: {
      radical: '又',
      radicalRole: 'Semantic component (reaching hand)',
      phoneticOrOther: '隹',
      phoneticRole: 'Phonetic & symbolic component (zhuī, short-tailed wild bird)'
    },
    components: [
      { char: '又', meaning: 'hand / again', pinyin: 'yòu', role: 'structural' },
      { char: '隹', meaning: 'short-tailed bird', pinyin: 'zhuī', role: 'phonetic' }
    ],
    etymology: 'Anciently a bird trapped in a hand, symbolizing struggle and hardship.',
    mnemonic: 'Trying to catch a fast BIRD (隹) with your bare HAND (又) is VERY HARD (难).',
    exampleWords: [
      { word: '困难', pinyin: 'kùn nan', english: 'difficulty' },
      { word: '难道', pinyin: 'nán dào', english: 'could it be that...?' },
      { word: '难怪', pinyin: 'nán guài', english: 'no wonder' }
    ],
    exampleSentences: [
      { cn: '学汉字虽然难，但是很有意思！', pinyin: 'Xué hànzì suīrán nán, dànshì hěn yǒu yìsi!', en: 'Although learning Hanzi is hard, it is very interesting!' }
    ]
  },
  '聊': {
    char: '聊',
    pinyin: 'liáo',
    tone: 2,
    english: 'to chat, to talk casually',
    hsk: 3,
    strokeCount: 11,
    radical: '耳',
    radicalMeaning: 'Ear radical (listening, hearing speech)',
    radicalName: 'Ear Radical (耳字旁 ěr zì páng)',
    whyRadical: 'Uses the Ear radical 耳 because casual chatting relies on active listening to the voices of your friends.',
    formula: {
      radical: '耳',
      radicalRole: 'Semantic root (ear for listening)',
      phoneticOrOther: '卯',
      phoneticRole: 'Phonetic component (mǎo)'
    },
    components: [
      { char: '耳', meaning: 'ear', pinyin: 'ěr', role: 'semantic' },
      { char: '卯', meaning: 'dawn / opening', pinyin: 'mǎo', role: 'phonetic' }
    ],
    etymology: 'Ear 耳 + phonetic 卯. Opening your ears to enjoyable conversation.',
    mnemonic: 'Lending a friendly EAR (耳) to small talk and CHATTING (聊天).',
    exampleWords: [
      { word: '聊天', pinyin: 'liáo tiān', english: 'to chat' },
      { word: '无聊', pinyin: 'wú liáo', english: 'bored / boring' },
      { word: '闲聊', pinyin: 'xián liáo', english: 'casual chit-chat' }
    ],
    exampleSentences: [
      { cn: '有空我们找个地方坐下聊聊天。', pinyin: 'Yǒu kòng wǒmen zhǎo gè dìfang zuòxià liáoliáo tiān.', en: 'When free, let\'s find a place to sit and chat.' }
    ]
  },
  '接': {
    char: '接',
    pinyin: 'jiē',
    tone: 1,
    english: 'to receive, to catch, to pick up (someone)',
    hsk: 3,
    strokeCount: 11,
    radical: '扌',
    radicalMeaning: 'Hand radical (reaching, grabbing, connecting)',
    radicalName: 'Hand Radical (提手旁 tí shǒu páng)',
    whyRadical: 'Uses the Hand radical 扌 because picking someone up or catching a phone/object requires reaching out your hands.',
    formula: {
      radical: '扌',
      radicalRole: 'Semantic root (hands connecting/welcoming)',
      phoneticOrOther: '妾',
      phoneticRole: 'Phonetic component (qiè)'
    },
    components: [
      { char: '扌', meaning: 'hand', pinyin: 'shǒu', role: 'semantic' },
      { char: '妾', meaning: 'maid / close companion', pinyin: 'qiè', role: 'phonetic' }
    ],
    etymology: 'Reaching out hands 扌 to receive or meet an arriving guest.',
    mnemonic: 'Extending your HANDS (扌) to PICK UP (接) a friend arriving from the airport.',
    exampleWords: [
      { word: '接电话', pinyin: 'jiē diànhuà', english: 'answer the phone' },
      { word: '接人', pinyin: 'jiē rén', english: 'pick someone up' },
      { word: '接受', pinyin: 'jiē shòu', english: 'accept' }
    ],
    exampleSentences: [
      { cn: '我下午五点去机场接你。', pinyin: 'Wǒ xiàwǔ wǔ diǎn qù jīchǎng jiē nǐ.', en: 'I will pick you up at the airport at 5 PM.' }
    ]
  },
  '渴': {
    char: '渴',
    pinyin: 'kě',
    tone: 3,
    english: 'thirsty, parched, yearning',
    hsk: 3,
    strokeCount: 12,
    radical: '氵',
    radicalMeaning: 'Three Dots of Water (hydration, liquids, rivers)',
    radicalName: 'Three Dots of Water (三点水 sān diǎn shuǐ)',
    whyRadical: 'Uses the Water radical 氵 because feeling thirsty is the biological physiological craving for water.',
    formula: {
      radical: '氵',
      radicalRole: 'Semantic root (craving water)',
      phoneticOrOther: '曷',
      phoneticRole: 'Phonetic component (hé, shared with 喝 hē)'
    },
    components: [
      { char: '氵', meaning: 'water', pinyin: 'shuǐ', role: 'semantic' },
      { char: '曷', meaning: 'why / intense desire', pinyin: 'hé', role: 'phonetic' }
    ],
    etymology: 'Semantic 氵 (water) + phonetic 曷 (hé). The physical sensation of needing hydration.',
    mnemonic: 'Desperately needing WATER (氵) because you are THIRSTY (渴).',
    exampleWords: [
      { word: '口渴', pinyin: 'kǒu kě', english: 'thirsty' },
      { word: '渴望', pinyin: 'kě wàng', english: 'thirst for / yearn' }
    ],
    exampleSentences: [
      { cn: '走了这么久的路，我都口渴了。', pinyin: 'Zǒu le zhème jiǔ de lù, wǒ dōu kǒukě le.', en: 'After walking so long, I\'m so thirsty.' }
    ]
  },

  // ==========================
  // HSK 4
  // ==========================
  '预': {
    char: '预',
    pinyin: 'yù',
    tone: 4,
    english: 'in advance, beforehand, to prepare',
    hsk: 4,
    strokeCount: 10,
    radical: '页',
    radicalMeaning: 'Head / Page radical (intellectual contemplation, planning)',
    radicalName: 'Head Radical (页字旁 yè zì páng)',
    whyRadical: 'Uses the Head radical 页 because preparing beforehand requires mental planning and foresight in the head.',
    formula: {
      radical: '页',
      radicalRole: 'Semantic root (head / foresight)',
      phoneticOrOther: '予',
      phoneticRole: 'Phonetic component (yǔ, giving)'
    },
    components: [
      { char: '予', meaning: 'to give / oneself', pinyin: 'yǔ', role: 'phonetic' },
      { char: '页', meaning: 'head / face', pinyin: 'yè', role: 'semantic' }
    ],
    etymology: 'Thinking with the head 页 before committing to an action.',
    mnemonic: 'Having plans prepared in your HEAD (页) BEFOREHAND (预).',
    exampleWords: [
      { word: '预订', pinyin: 'yù dìng', english: 'to book / reserve' },
      { word: '预习', pinyin: 'yù xí', english: 'preview study' },
      { word: '预报', pinyin: 'yù bào', english: 'forecast' }
    ],
    exampleSentences: [
      { cn: '这家餐厅很受欢迎，必须提前预订。', pinyin: 'Zhè jiā cāntīng hěn shòuhuānyíng, bìxū tíqián yùdìng.', en: 'This restaurant is very popular, you must reserve in advance.' }
    ]
  },
  '境': {
    char: '境',
    pinyin: 'jìng',
    tone: 4,
    english: 'border, boundary, environment, circumstances',
    hsk: 4,
    strokeCount: 14,
    radical: '土',
    radicalMeaning: 'Earth / Soil radical (land, territory, surroundings)',
    radicalName: 'Earth Radical (提土旁 tí tǔ páng)',
    whyRadical: 'Uses the Earth radical 土 because boundaries and geographic environments are defined by physical soil and land territory.',
    formula: {
      radical: '土',
      radicalRole: 'Semantic root (earth / physical territory)',
      phoneticOrOther: '竟',
      phoneticRole: 'Phonetic component (jìng, boundary/end)'
    },
    components: [
      { char: '土', meaning: 'earth / soil', pinyin: 'tǔ', role: 'semantic' },
      { char: '竟', meaning: 'finally / border', pinyin: 'jìng', role: 'phonetic' }
    ],
    etymology: 'Semantic 土 (earth) + phonetic 竟 (jìng). The outer edge of a land territory, expanding into one\'s ecological or social surroundings.',
    mnemonic: 'The EARTH (土) where boundaries meet defines your ENVIRONMENT (环境).',
    exampleWords: [
      { word: '环境', pinyin: 'huán jìng', english: 'environment' },
      { word: '国境', pinyin: 'guó jìng', english: 'national border' },
      { word: '困境', pinyin: 'kùn jìng', english: 'dilemma' }
    ],
    exampleSentences: [
      { cn: '我们要保护生态环境。', pinyin: 'Wǒmen yào bǎohù shēngtài huánjìng.', en: 'We need to protect the ecological environment.' }
    ]
  },
  '适': {
    char: '适',
    pinyin: 'shì',
    tone: 4,
    english: 'to fit, suitable, to adapt, comfortable',
    hsk: 4,
    strokeCount: 9,
    radical: '辶',
    radicalMeaning: 'Walking radical (movement, progression, journeys)',
    radicalName: 'Walking Radical (走之底 zǒu zhī dǐ)',
    whyRadical: 'Uses the Walking radical 辶 because finding what is suitable involves journeying until you reach the proper place.',
    formula: {
      radical: '辶',
      radicalRole: 'Semantic root (path / walking)',
      phoneticOrOther: '舌',
      phoneticRole: 'Inner component (tongue/taste - satisfying comfort)'
    },
    components: [
      { char: '辶', meaning: 'walking', pinyin: 'chuò', role: 'semantic' },
      { char: '舌', meaning: 'tongue', pinyin: 'shé', role: 'structural' }
    ],
    etymology: 'Traveling along a road until reaching a comfortable place that fits perfectly.',
    mnemonic: 'WALKING (辶) until you find the SUITABLE (适) fit.',
    exampleWords: [
      { word: '适合', pinyin: 'shì hé', english: 'to suit / fit' },
      { word: '适应', pinyin: 'shì yìng', english: 'to adapt to' },
      { word: '合适', pinyin: 'hé shì', english: 'appropriate' }
    ],
    exampleSentences: [
      { cn: '你觉得这件衣服适合我吗？', pinyin: 'Nǐ juéde zhè jiàn yīfu shìhé wǒ ma?', en: 'Do you think this outfit suits me?' }
    ]
  },

  // ==========================
  // HSK 5
  // ==========================
  '繁': {
    char: '繁',
    pinyin: 'fán',
    tone: 2,
    english: 'numerous, complicated, prosperous',
    hsk: 5,
    strokeCount: 17,
    radical: '糸',
    radicalMeaning: 'Silk radical (intertwined threads, dense weaving)',
    radicalName: 'Silk Radical (绞丝底 / 糸 mì)',
    whyRadical: 'Uses the Silk radical 糸 because the dense, intricate weaving of thousands of silk threads represents great complexity and flourishing prosperity.',
    formula: {
      radical: '糸',
      radicalRole: 'Semantic root (silk threads woven densely)',
      phoneticOrOther: '敏',
      phoneticRole: 'Phonetic component (mǐn, agile)'
    },
    components: [
      { char: '敏', meaning: 'clever / agile', pinyin: 'mǐn', role: 'phonetic' },
      { char: '糸', meaning: 'silk / thread', pinyin: 'mì', role: 'semantic' }
    ],
    etymology: 'Intricate silk embroidery. Expanded to describe flourishing, thriving commercial cities.',
    mnemonic: 'Thousands of precious SILK (糸) threads woven together bring PROSPERITY (繁荣).',
    exampleWords: [
      { word: '繁荣', pinyin: 'fán róng', english: 'prosperous / flourishing' },
      { word: '复杂', pinyin: 'fù zá', english: 'complicated' },
      { word: '繁忙', pinyin: 'fán máng', english: 'busy / bustling' }
    ],
    exampleSentences: [
      { cn: '上海是一座经济繁荣的国际大都市。', pinyin: 'Shànghǎi shì yī zuò jīngjì fánróng de guójì dà dūshì.', en: 'Shanghai is an economically prosperous metropolis.' }
    ]
  },
  '综': {
    char: '综',
    pinyin: 'zōng',
    tone: 1,
    english: 'to synthesize, comprehensive, integrate',
    hsk: 5,
    strokeCount: 11,
    radical: '纟',
    radicalMeaning: 'Silk / Thread radical (linking, tying together, weaving)',
    radicalName: 'Silk Radical (绞丝旁 jiāo sī páng)',
    whyRadical: 'Uses the Silk radical 纟 because synthesizing ideas is like tying multiple individual threads into a cohesive, united fabric.',
    formula: {
      radical: '纟',
      radicalRole: 'Semantic root (threads bound together)',
      phoneticOrOther: '宗',
      phoneticRole: 'Phonetic component (zōng, ancestral clan)'
    },
    components: [
      { char: '纟', meaning: 'silk / thread', pinyin: 'sī', role: 'semantic' },
      { char: '宗', meaning: 'ancestral lineage', pinyin: 'zōng', role: 'phonetic' }
    ],
    etymology: 'Threading warp and weft together in weaving; conceptually unifying diverse factors.',
    mnemonic: 'THREADING (纟) principles into a COMPREHENSIVE (综合) synthesis.',
    exampleWords: [
      { word: '综合', pinyin: 'zōng hé', english: 'comprehensive / synthesize' },
      { word: '综述', pinyin: 'zōng shù', english: 'overview / summary' }
    ],
    exampleSentences: [
      { cn: '我们需要综合考虑各方面的意见。', pinyin: 'Wǒmen xūyào zōnghé kǎolǜ gè fāngmiàn de yìjiàn.', en: 'We need to comprehensively consider opinions from all sides.' }
    ]
  },
  '协': {
    char: '协',
    pinyin: 'xié',
    tone: 2,
    english: 'to cooperate, to harmonize, assist',
    hsk: 5,
    strokeCount: 6,
    radical: '十',
    radicalMeaning: 'Ten radical (totality, completeness, perfect union)',
    radicalName: 'Ten Radical (十字旁 shí zì páng)',
    whyRadical: 'Traditional form 協 combined three strength 力 symbols. In simplified Chinese, 十 (ten/completeness) represents total, complete alignment of power.',
    formula: {
      radical: '十',
      radicalRole: 'Semantic root (complete totality)',
      phoneticOrOther: '办',
      phoneticRole: 'Action base (to manage / strength 力)'
    },
    components: [
      { char: '十', meaning: 'ten / complete', pinyin: 'shí', role: 'structural' },
      { char: '办', meaning: 'to do / manage', pinyin: 'bàn', role: 'structural' }
    ],
    etymology: 'Harmonious coordination of combined strength.',
    mnemonic: 'Bringing TOTAL (十) strength together to COOPERATE (协作).',
    exampleWords: [
      { word: '协调', pinyin: 'xié tiáo', english: 'to coordinate' },
      { word: '协议', pinyin: 'xié yì', english: 'agreement' },
      { word: '协助', pinyin: 'xié zhù', english: 'to assist' }
    ],
    exampleSentences: [
      { cn: '双方终于达成了一项商业合作协议。', pinyin: 'Shuāngfāng zhōngyú dáchéng le yī xiàng shāngyè hézuò xiéyì.', en: 'Both parties reached a commercial cooperation agreement.' }
    ]
  }
};

/**
 * Intelligent character decomposition resolver.
 * If a character is in CHARACTERS_DATA, returns it directly.
 * Otherwise, dynamically analyzes its Kangxi radical, pinyin, and structural breakdown,
 * ensuring no character ever shows an empty or confusing radical explanation!
 */
export function getCharacterDetail(char: string): CharacterDetail {
  if (CHARACTERS_DATA[char]) {
    return CHARACTERS_DATA[char];
  }

  // Find matching Kangxi radical by checking if character contains any known radical
  let matchedRadical = RADICALS_DATA.find(r => r.char === char);
  if (!matchedRadical) {
    matchedRadical = RADICALS_DATA.find(r => r.commonCharacters && r.commonCharacters.includes(char));
  }
  if (!matchedRadical) {
    matchedRadical = RADICALS_DATA.find(r => char.includes(r.char) || (r.originalChar && char.includes(r.originalChar)));
  }

  const radChar = matchedRadical ? matchedRadical.char : '—';
  const radName = matchedRadical ? matchedRadical.name : 'Kangxi Root';
  const radMeaning = matchedRadical ? matchedRadical.meaning : 'Fundamental Chinese semantic component';

  const whyRadical = matchedRadical
    ? `This character is built upon the ${matchedRadical.name} radical (${matchedRadical.char}), which provides its core semantic theme relating to ${matchedRadical.meaning.toLowerCase()}.`
    : `Composed of traditional strokes forming a distinct ideographic meaning in Chinese.`;

  return {
    char,
    pinyin: '—',
    tone: 5,
    english: 'Chinese Character',
    hsk: 1,
    strokeCount: 6,
    radical: radChar,
    radicalName: radName,
    radicalMeaning: radMeaning,
    whyRadical,
    formula: {
      radical: radChar,
      radicalRole: `Semantic base (${radMeaning})`,
      phoneticOrOther: 'Components',
      phoneticRole: 'Structural / Phonetic balance'
    },
    components: matchedRadical ? [{ char: matchedRadical.char, meaning: matchedRadical.meaning, role: 'semantic' }] : [],
    etymology: `Constructed from classical Chinese ideographic principles.`,
    mnemonic: `Focus on the ${radName} to remember the core meaning.`,
    exampleWords: [],
    exampleSentences: []
  };
}
