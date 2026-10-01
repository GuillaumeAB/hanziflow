# HanziFlow (汉流) — HelloChinese + Anki Hybrid for HSK 1–5

**HanziFlow** is a modern, responsive web application designed for learning Chinese across HSK levels 1 through 5, combining the gamified lesson path and interactive character breakdown of **HelloChinese** with the spaced repetition (SRS) and flashcard review mastery of **Anki**.

---

## Key Features

### 1. Interactive Character & Radical Decomposition ("Click-Anywhere Hanzi")
- **Click or tap any Chinese character** anywhere in the app (lessons, sentences, flashcards, radicals, dictionaries).
- **Animated Stroke Order Player**: Powered by `hanzi-writer` inside a traditional calligraphy grid (*Mi-Zi-Ge* 米字格), complete with stroke counts, play, loop, and reset controls.
- **Kangxi Radical Anatomy**: Displays the primary radical (e.g., 氵, 亻, 口, 心, 讠, 木, 日, 女), its English meaning, and its position (left, top, bottom, enclosure).
- **Sub-Component Hierarchy**: Breaks down compound characters into building blocks with semantic vs. phonetic roles (e.g. 语 = 讠 speech + 五 five + 口 mouth; 想 = 相 [tree + eye] + 心 heart).
- **Etymology & Memory Mnemonics**: Clear historical explanations and memorable hooks for every character.
- **Spoken Vocabulary & Context Sentences**: High-frequency oral examples with native audio playback.

### 2. Oral Sentence Listening Drills (HelloChinese-Inspired)
- Focuses strictly on **listening comprehension** without speaking exercises.
- **Sentence Reordering**: Listen to natural speech and assemble scrambled word tiles in correct grammatical order.
- **Audio Cloze**: Listen to spoken phrases and identify the missing character or word.
- **Listening Match**: Comprehend oral dialogues and match the spoken meaning or situation.
- **Turtle Speed (🐢 0.7x)**: Slow-motion pronunciation toggle for difficult oral phrases.

### 3. Anki Spaced Repetition System (SRS)
- Full **SuperMemo SM-2** algorithm implementation.
- Tracks review intervals, repetitions, ease factors, lapses, and calculates precise next review dates.
- Dynamic interval previews on grading buttons:
  - **Again (< 1 min)** [Shortcut: `1`]
  - **Hard (12 hrs / 1.2x)** [Shortcut: `2`]
  - **Good (1 day / standard SM-2)** [Shortcut: `3`]
  - **Easy (4 days / accelerated)** [Shortcut: `4`]
- Pre-built decks: HSK 1, HSK 2, HSK 3, HSK 4, HSK 5, Oral Sentences Deck, and 214 Kangxi Radicals Lab.
- Keyboard shortcuts: `Space` (flip card), `1`-`4` (grade), `R` (replay audio), `S` (slow audio).

### 4. Spoken Audio & Gamified Feedback
- **Web Speech API**: Uses high-quality Chinese native voices with pitch, rate, and cancellation management.
- **Web Audio API**: Synthesized chimes for correct responses, error cues, card flips, and victory fanfares without depending on external MP3 downloads.
- Continuous auto-play immersion mode in the Oral Sentences Hub.

### 5. Cross-Platform UI (Laptop & Smartphone)
- Mobile-first responsive design:
  - Smartphone: Touch-friendly bottom navigation bar, swipeable cards, touch drawers.
  - Laptop / Desktop: Modern sidebar navigation, full keyboard shortcuts.
- Dark & Light mode toggle.
- Pinyin and Tone Color customization toggles.
- Local persistence via `localStorage` (retains XP, study streaks, completed units, and review schedules).

---

## Getting Started

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```
