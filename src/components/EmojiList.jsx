import React, { forwardRef, useEffect, useState, useRef } from 'react'

const emojis = [
  // 表情和手势
  { emoji: '😀', name: 'smile' },
  { emoji: '😄', name: 'smile with eyes' },
  { emoji: '😆', name: 'laughing' },
  { emoji: '😅', name: 'sweat smile' },
  { emoji: '😂', name: 'joy' },
  { emoji: '🤣', name: 'rolling laughing' },
  { emoji: '🥰', name: 'hearts' },
  { emoji: '😊', name: 'smiling' },
  { emoji: '😇', name: 'angel' },
  { emoji: '😎', name: 'cool' },
  { emoji: '🤔', name: 'thinking' },
  { emoji: '😴', name: 'sleeping' },
  { emoji: '😭', name: 'crying' },
  { emoji: '😡', name: 'angry' },
  { emoji: '🥳', name: 'party' },
  { emoji: '🤯', name: 'mind blown' },
  { emoji: '🤗', name: 'hugging' },
  { emoji: '🤫', name: 'shushing' },
  { emoji: '🤪', name: 'zany' },
  
  // 手势和身体部分
  { emoji: '❤️', name: 'heart' },
  { emoji: '👍', name: 'thumbs up' },
  { emoji: '👎', name: 'thumbs down' },
  { emoji: '👏', name: 'clap' },
  { emoji: '🙏', name: 'pray' },
  { emoji: '🤝', name: 'handshake' },
  { emoji: '✌️', name: 'victory' },
  { emoji: '👋', name: 'wave' },
  
  // 动物和自然
  { emoji: '🐱', name: 'cat' },
  { emoji: '🐶', name: 'dog' },
  { emoji: '🦁', name: 'lion' },
  { emoji: '🐼', name: 'panda' },
  { emoji: '🦊', name: 'fox' },
  { emoji: '🦋', name: 'butterfly' },
  { emoji: '🌺', name: 'flower' },
  { emoji: '🌲', name: 'tree' },
  { emoji: '🌍', name: 'earth' },
  { emoji: '🌞', name: 'sun' },
  { emoji: '⭐', name: 'star' },
  { emoji: '🌈', name: 'rainbow' },
  
  // 食物和饮料
  { emoji: '🍕', name: 'pizza' },
  { emoji: '🍔', name: 'burger' },
  { emoji: '🍜', name: 'noodles' },
  { emoji: '🍣', name: 'sushi' },
  { emoji: '🍎', name: 'apple' },
  { emoji: '🍓', name: 'strawberry' },
  { emoji: '☕', name: 'coffee' },
  { emoji: '🍺', name: 'beer' },
  
  // 活动和运动
  { emoji: '⚽', name: 'soccer' },
  { emoji: '🏀', name: 'basketball' },
  { emoji: '🎾', name: 'tennis' },
  { emoji: '🏃', name: 'running' },
  { emoji: '🚴', name: 'cycling' },
  { emoji: '🎮', name: 'gaming' },
  { emoji: '🎨', name: 'art' },
  { emoji: '🎵', name: 'music' },
  
  // 旅行和地点
  { emoji: '✈️', name: 'airplane' },
  { emoji: '🚗', name: 'car' },
  { emoji: '🏖️', name: 'beach' },
  { emoji: '🗽', name: 'liberty' },
  { emoji: '🗼', name: 'tower' },
  { emoji: '🏔️', name: 'mountain' },
  { emoji: '🌆', name: 'cityscape' },
  
  // 物品和符号
  { emoji: '💡', name: 'idea' },
  { emoji: '📱', name: 'phone' },
  { emoji: '💻', name: 'laptop' },
  { emoji: '📷', name: 'camera' },
  { emoji: '🎉', name: 'party' },
  { emoji: '✨', name: 'sparkles' },
  { emoji: '💫', name: 'dizzy' },
  { emoji: '🔥', name: 'fire' },
  { emoji: '💯', name: '100' },
  { emoji: '⭐', name: 'star' },
  { emoji: '💪', name: 'strong' },
  { emoji: '🎯', name: 'target' },
  { emoji: '🔒', name: 'lock' },
  { emoji: '🔑', name: 'key' },
  {emoji: '🔨', name: 'hammer' },
  {emoji: '🧰', name: 'toolbox' },
  {emoji:'🚀',name:'rocket'},
  {emoji:'🌟',name:'star2'},
  {emoji:'🌠',name:'stars'},
  {emoji:'🌌',name:'milky-way'},
  {emoji:'🎇',name:'sparkler'},
  {emoji:'🎆',name:'fireworks'},
  {emoji:'🎈',name:'balloon'},
  {emoji:'🎉',name:'tada'},
  

  // 网络和技术
  { emoji: '🌐', name: 'web' },
  { emoji: '📶', name: 'signal' },
  { emoji: '📱', name: 'mobile' },
  { emoji: '💻', name: 'laptop' },
  { emoji: '🖥️', name: 'desktop' },
  { emoji: '📡', name: 'satellite' },
  { emoji: '🔋', name: 'battery' },
  { emoji: '🔌', name: 'power' },
  { emoji: '📨', name: 'email' },
  { emoji: '🔍', name: 'search' },
  { emoji: '📲', name: 'mobile-data' },
  { emoji: '⚡', name: 'fast' },
  { emoji: '🔄', name: 'sync' },
  { emoji: '📊', name: 'chart' },

  // Objects（物品）
  { emoji: '📚', name: 'books' },
  { emoji: '📝', name: 'memo' },
  { emoji: '✏️', name: 'pencil' },
  { emoji: '📎', name: 'paperclip' },
  { emoji: '🗂️', name: 'folder' },
  { emoji: '📅', name: 'calendar' },
  { emoji: '⌚', name: 'watch' },
  { emoji: '🎁', name: 'gift' },
  { emoji: '🔮', name: 'crystal-ball' },
  { emoji: '🎭', name: 'masks' },
  { emoji: '🎪', name: 'circus' },
  { emoji: '🎰', name: 'slot-machine' },
  { emoji: '🔧', name: 'wrench' },
  { emoji: '🔨', name: 'hammer' },
  { emoji: '🧰', name: 'toolbox' },

  // Symbols（符号）
  { emoji: '♠️', name: 'spade' },
  { emoji: '♥️', name: 'heart-symbol' },
  { emoji: '♦️', name: 'diamond' },
  { emoji: '♣️', name: 'club' },
  { emoji: '🔴', name: 'red-circle' },
  { emoji: '🟡', name: 'yellow-circle' },
  { emoji: '🟢', name: 'green-circle' },
  { emoji: '⚪', name: 'white-circle' },
  { emoji: '⚫', name: 'black-circle' },
  { emoji: '✅', name: 'check' },
  { emoji: '❌', name: 'cross' },
  { emoji: '❗', name: 'exclamation' },
  { emoji: '❓', name: 'question' },
  { emoji: '➕', name: 'plus' },
  { emoji: '➖', name: 'minus' },
  { emoji: '➗', name: 'divide' },
  { emoji: '♾️', name: 'infinity' },
  { emoji: '🔁', name: 'repeat' },
  { emoji: '🔂', name: 'repeat-one' }
]

export const EmojiList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const containerRef = useRef(null)

  // 处理滚动到选中项
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const selectedButton = container.querySelector(`button:nth-child(${selectedIndex + 1})`)
      
      if (selectedButton) {
        const containerRect = container.getBoundingClientRect()
        const buttonRect = selectedButton.getBoundingClientRect()
        
        if (buttonRect.top < containerRect.top) {
          // 如果选中项在可视区域上方
          container.scrollTop -= (containerRect.top - buttonRect.top)
        } else if (buttonRect.bottom > containerRect.bottom) {
          // 如果选中项在可视区域下方
          container.scrollTop += (buttonRect.bottom - containerRect.bottom)
        }
      }
    }
  }, [selectedIndex])

  const insertEmoji = (emoji) => {
    const { editor, range } = props
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .insertContent(emoji)
      .run()
  }

  const selectItem = (index) => {
    const emoji = filteredEmojis[index]
    if (emoji) {
      insertEmoji(emoji.emoji)
    }
  }

 const COLS = 7

 const moveSelection = (direction) => {
   const total = filteredEmojis.length
   if (total === 0) return

   switch (direction) {
     case 'up':
       setSelectedIndex((selectedIndex - COLS + total) % total)
       break
     case 'down':
       setSelectedIndex((selectedIndex + COLS) % total)
       break
     case 'left':
       setSelectedIndex((selectedIndex - 1 + total) % total)
       break
     case 'right':
       setSelectedIndex((selectedIndex + 1) % total)
       break
   }
 }

 const enterHandler = () => {
   selectItem(selectedIndex)
 }

 useEffect(() => setSelectedIndex(0), [props.query])

 const onKeyDown = ({ event }) => {
   switch (event.key) {
     case 'ArrowUp':
       moveSelection('up')
       return true
     case 'ArrowDown':
       moveSelection('down')
       return true
     case 'ArrowLeft':
       moveSelection('left')
       return true
     case 'ArrowRight':
       moveSelection('right')
       return true
     case 'Enter':
       enterHandler()
       return true
     default:
       return false
   }
 }

  React.useImperativeHandle(ref, () => ({
    onKeyDown
  }))

  const filteredEmojis = emojis.filter(emoji => 
    emoji.name.toLowerCase().includes(props.query?.toLowerCase() || '')
  )

  return (
    <div className="relative overflow-hidden rounded-md  bg-[rgb(51, 51, 51)] shadow-xs">
      <div className="relative w-[384px] max-h-[240px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent" ref={containerRef}>
        <div className="grid grid-cols-7 gap-[0]">
          {filteredEmojis.length ? (
            filteredEmojis.map((item, index) => (
              <button
                className={`flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-500 text-xl transition-colors ${
                  index === selectedIndex ? 'bg-gary ring-2 ring-blue-200' : ''
                }`}
                key={index}
                onClick={() => insertEmoji(item.emoji)}
                title={item.name}
              >
                {item.emoji}
              </button>
            ))
          ) : (
            <div className="col-span-7 py-2 text-center text-gray-500">
              未找到表情
            </div>
          )}
        </div>
      </div>
    </div>
  )
})