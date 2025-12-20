export interface CalendarDay {
  day: number;
  task: string;
  icon: string;
  hint?: string;
}

// Fun daily tasks for your advent adventure!
export const calendarData: CalendarDay[] = [
  { day: 1, task: "Make a snow angel (or a pillow angel if no snow!) and capture it from above", icon: "👼", hint: "Find the fluffiest spot!" },
  { day: 2, task: "Bake holiday cookies and decorate them with creative designs", icon: "🍪", hint: "The messier, the better!" },
  { day: 3, task: "Create a cozy fort with blankets and fairy lights", icon: "🏕️", hint: "Perfect for hot cocoa reading" },
  { day: 4, task: "Write a heartfelt letter to someone you love", icon: "💌", hint: "Handwritten is extra special" },
  { day: 5, task: "Go on a winter nature walk and collect interesting finds", icon: "🌲", hint: "Pinecones, leaves, pretty stones" },
  { day: 6, task: "Make homemade hot chocolate with fun toppings", icon: "☕", hint: "Marshmallows, whipped cream, sprinkles!" },
  { day: 7, task: "Create a DIY ornament or decoration", icon: "🎨", hint: "Use what you have at home" },
  { day: 8, task: "Have a movie marathon with your favorite holiday films", icon: "🎬", hint: "Don't forget the snacks!" },
  { day: 9, task: "Do a random act of kindness for a stranger or neighbor", icon: "💝", hint: "Small gestures mean the world" },
  { day: 10, task: "Build something creative (snowman, lego, puzzle)", icon: "⛄", hint: "Let your imagination run wild" },
  { day: 11, task: "Learn a new holiday song or dance", icon: "🎵", hint: "Bonus points for performing it!" },
  { day: 12, task: "Make a gratitude list of 12 things you're thankful for", icon: "📝", hint: "Big or small, they all count" },
  { day: 13, task: "Create your own holiday playlist", icon: "🎧", hint: "Mix classics with new favorites" },
  { day: 14, task: "Have a pajama day with cozy activities", icon: "🧸", hint: "Games, books, crafts - your choice!" },
  { day: 15, task: "Take a photo tour of your favorite holiday decorations nearby", icon: "📸", hint: "Your house or neighborhood" },
  { day: 16, task: "Try a new winter recipe you've never made before", icon: "👨‍🍳", hint: "Sweet or savory, you decide!" },
  { day: 17, task: "Create holiday cards for friends or family", icon: "✉️", hint: "Draw, paint, or collage" },
  { day: 18, task: "Have a game night with board games or card games", icon: "🎲", hint: "Classic games are the best!" },
  { day: 19, task: "Watch the sunset or sunrise and capture its beauty", icon: "🌅", hint: "Bundle up and bring a warm drink" },
  { day: 20, task: "Make a time capsule of your favorite 2024 memories", icon: "📦", hint: "Photos, notes, small treasures" },
  { day: 21, task: "Have a candlelit evening with no screens", icon: "🕯️", hint: "Talk, read, play - device free!" },
  { day: 22, task: "Create a vision board for the new year", icon: "✨", hint: "Dreams, goals, and wishes" },
  { day: 23, task: "Prepare a special breakfast or brunch", icon: "🥞", hint: "Make it festive and fun!" },
  { day: 24, task: "Share your favorite holiday memory with someone you love", icon: "🎄", hint: "The best gift is quality time" },
];
