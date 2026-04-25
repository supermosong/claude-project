export type Card = {
  id: number
  type: 'truth' | 'dare'
  content: string
  difficulty: 'light' | 'medium' | 'intense'
}

export const cards: Card[] = [
  // Truth - Light
  { id: 1, type: 'truth', content: 'สิ่งที่คุณชอบทำมากที่สุดในวันหยุดคืออะไร?', difficulty: 'light' },
  { id: 2, type: 'truth', content: 'ถ้าเลือกได้อยากมีซูเปอร์พาวเวอร์อะไร?', difficulty: 'light' },
  { id: 3, type: 'truth', content: 'ใครในที่นี้ที่คุณชื่นชมมากที่สุด?', difficulty: 'light' },
  { id: 4, type: 'truth', content: 'ถ้าได้เดินทางไปที่ไหนก็ได้ในโลก จะไปที่ไหน?', difficulty: 'light' },
  { id: 5, type: 'truth', content: 'งานอดิเรกที่แปลกที่สุดของคุณคืออะไร?', difficulty: 'light' },
  { id: 6, type: 'truth', content: 'ตอนเด็ก ๆ อยากเป็นอะไรมากที่สุด?', difficulty: 'light' },
  { id: 7, type: 'truth', content: 'ภาพยนตร์ที่ชอบที่สุดตลอดกาลคืออะไร?', difficulty: 'light' },
  { id: 8, type: 'truth', content: 'ถ้ามีเวลา 1 ชั่วโมงที่ไม่มีใครรู้ คุณจะทำอะไร?', difficulty: 'light' },
  { id: 9, type: 'truth', content: 'สิ่งที่คุณภูมิใจที่สุดในชีวิตคืออะไร?', difficulty: 'light' },
  { id: 10, type: 'truth', content: 'ถ้าต้องกินอาหารอย่างเดียวตลอดชีวิต จะเลือกอะไร?', difficulty: 'light' },
  { id: 11, type: 'truth', content: 'เพื่อนในที่นี้คนไหนที่คุณรู้จักนานที่สุด?', difficulty: 'light' },
  { id: 12, type: 'truth', content: 'สิ่งที่คุณกลัวมากที่สุดคืออะไร?', difficulty: 'light' },

  // Truth - Medium
  { id: 13, type: 'truth', content: 'ครั้งสุดท้ายที่คุณร้องไห้เพราะอะไร?', difficulty: 'medium' },
  { id: 14, type: 'truth', content: 'มีเพื่อนในกลุ่มนี้ที่คุณเคยพูดถึงลับหลังไหม?', difficulty: 'medium' },
  { id: 15, type: 'truth', content: 'ความลับที่คุณยังไม่เคยบอกใครในที่นี้คืออะไร?', difficulty: 'medium' },
  { id: 16, type: 'truth', content: 'ครั้งที่น่าอายที่สุดในชีวิตคืออะไร?', difficulty: 'medium' },
  { id: 17, type: 'truth', content: 'โกหกคนในที่นี้เรื่องอะไรล่าสุด?', difficulty: 'medium' },
  { id: 18, type: 'truth', content: 'ใครในที่นี้ที่คุณคิดว่าหน้าตาดีที่สุด?', difficulty: 'medium' },
  { id: 19, type: 'truth', content: 'นิสัยที่แย่ที่สุดของคุณคืออะไร?', difficulty: 'medium' },
  { id: 20, type: 'truth', content: 'เคยแอบชอบใครในกลุ่มนี้ไหม?', difficulty: 'medium' },
  { id: 21, type: 'truth', content: 'ถ้าต้องสลับชีวิตกับคนในที่นี้ 1 คน จะเลือกใคร?', difficulty: 'medium' },
  { id: 22, type: 'truth', content: 'สิ่งที่ทำแล้วรู้สึกผิดที่สุดในชีวิตคืออะไร?', difficulty: 'medium' },
  { id: 23, type: 'truth', content: 'ถ้ามีโอกาสบอกอะไรกับตัวเองในอดีตได้ จะบอกอะไร?', difficulty: 'medium' },
  { id: 24, type: 'truth', content: 'ครั้งสุดท้ายที่คุณทำสิ่งที่กล้าหาญมากที่สุดคืออะไร?', difficulty: 'medium' },

  // Truth - Intense
  { id: 25, type: 'truth', content: 'เรื่องที่น่าอับอายที่สุดที่คุณเคยทำในที่สาธารณะคืออะไร?', difficulty: 'intense' },
  { id: 26, type: 'truth', content: 'ถ้าต้องจูบใครในที่นี้ จะเลือกใคร?', difficulty: 'intense' },
  { id: 27, type: 'truth', content: 'ความลับที่ถ้าพ่อแม่รู้จะตกใจมากที่สุดคืออะไร?', difficulty: 'intense' },
  { id: 28, type: 'truth', content: 'ใครในที่นี้ที่คุณคิดว่าเหมาะกับคุณมากที่สุด?', difficulty: 'intense' },
  { id: 29, type: 'truth', content: 'เรื่องที่คุณโกหกพ่อแม่บ่อยที่สุดคืออะไร?', difficulty: 'intense' },
  { id: 30, type: 'truth', content: 'ถ้าคนในที่นี้รู้ความจริงเรื่องนึงของคุณ จะกลัวสิ่งใดที่สุด?', difficulty: 'intense' },

  // Dare - Light
  { id: 31, type: 'dare', content: 'ส่งเสียงร้องเหมือนสัตว์ที่ชอบนาน 30 วินาที', difficulty: 'light' },
  { id: 32, type: 'dare', content: 'เต้นโดยไม่มีเพลงนาน 1 นาที', difficulty: 'light' },
  { id: 33, type: 'dare', content: 'บอกคนข้าง ๆ ว่าเขาสวย/หล่อมาก', difficulty: 'light' },
  { id: 34, type: 'dare', content: 'ทำหน้าตลกที่สุดที่คุณทำได้ค้างไว้ 10 วินาที', difficulty: 'light' },
  { id: 35, type: 'dare', content: 'ร้องเพลงที่ชอบที่สุด 1 ท่อนให้ทุกคนฟัง', difficulty: 'light' },
  { id: 36, type: 'dare', content: 'พูดว่า "ฉันรักคุณ" กับทุกคนในที่นี้', difficulty: 'light' },
  { id: 37, type: 'dare', content: 'บอก 3 สิ่งที่ชอบเกี่ยวกับคนที่นั่งทางซ้ายมือ', difficulty: 'light' },
  { id: 38, type: 'dare', content: 'ทำท่าโยคะท่าที่ยากที่สุดที่คุณทำได้', difficulty: 'light' },
  { id: 39, type: 'dare', content: 'พูดว่า "วันนี้คุณดูเป็น celebrity มาก" กับทุกคน', difficulty: 'light' },
  { id: 40, type: 'dare', content: 'แกล้งทำเป็นหุ่นยนต์นาน 2 นาที', difficulty: 'light' },
  { id: 41, type: 'dare', content: 'ทำท่า "กำลังตกหลุมรัก" ให้ทุกคนดู 30 วินาที', difficulty: 'light' },
  { id: 42, type: 'dare', content: 'พูดภาษาอังกฤษโดยไม่หยุดนาน 1 นาที', difficulty: 'light' },

  // Dare - Medium
  { id: 43, type: 'dare', content: 'โทรหาคนที่ชอบแล้วบอกว่าคิดถึงเขา', difficulty: 'medium' },
  { id: 44, type: 'dare', content: 'กอดคนในที่นี้ทุกคนนาน 5 วินาที', difficulty: 'medium' },
  { id: 45, type: 'dare', content: 'โพสต์รูปตัวเองหน้าตาแย่ที่สุดลง Story IG 5 นาที', difficulty: 'medium' },
  { id: 46, type: 'dare', content: 'นวดไหล่ให้คนข้าง ๆ นาน 2 นาที', difficulty: 'medium' },
  { id: 47, type: 'dare', content: 'ทำ impersonation คนในกลุ่มให้ทุกคนทาย', difficulty: 'medium' },
  { id: 48, type: 'dare', content: 'ส่ง "คิดถึงนะ" ให้คนในผู้ติดต่อแบบสุ่ม', difficulty: 'medium' },
  { id: 49, type: 'dare', content: 'บอกความลับเล็ก ๆ ของตัวเองให้ทุกคนฟัง', difficulty: 'medium' },
  { id: 50, type: 'dare', content: 'ยืนบนขาข้างเดียวนาน 2 นาทีโดยไม่วางเท้า', difficulty: 'medium' },
  { id: 51, type: 'dare', content: 'อ่านข้อความ 5 ข้อความล่าสุดในโทรศัพท์ให้ทุกคนฟัง', difficulty: 'medium' },
  { id: 52, type: 'dare', content: 'กินอาหารโดยใช้ช้อนส้อมในมือที่ไม่ถนัด', difficulty: 'medium' },

  // Dare - Intense
  { id: 53, type: 'dare', content: 'ให้คนในกลุ่มเลือกรูปที่น่าอายที่สุดในโทรศัพท์แล้วโพสต์ลง Story', difficulty: 'intense' },
  { id: 54, type: 'dare', content: 'โทรหาพ่อแม่บอกว่าตกหลุมรักใครสักคน', difficulty: 'intense' },
  { id: 55, type: 'dare', content: 'ส่ง "คิดถึงนะ 😊" ให้ Ex ของคุณ', difficulty: 'intense' },
  { id: 56, type: 'dare', content: 'ออกไปนอกบ้านแล้วตะโกนว่า "ฉันรักทุกคน!" 3 ครั้ง', difficulty: 'intense' },
  { id: 57, type: 'dare', content: 'ให้คนในกลุ่มตรวจแชทในโทรศัพท์ได้ 1 นาที', difficulty: 'intense' },
  { id: 58, type: 'dare', content: 'เล่นเกมต่อไปโดยพูดเหมือนโฆษกกีฬาทุกประโยค', difficulty: 'intense' },
]

export function getRandomCard(type: 'truth' | 'dare', difficulty: 'light' | 'medium' | 'intense' | 'all', usedIds: Set<number>): Card {
  let pool = cards.filter(c => c.type === type)
  if (difficulty !== 'all') pool = pool.filter(c => c.difficulty === difficulty)
  const available = pool.filter(c => !usedIds.has(c.id))
  const source = available.length > 0 ? available : pool
  return source[Math.floor(Math.random() * source.length)]
}
