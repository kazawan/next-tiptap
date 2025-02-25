import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

export const SlashCommandList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index) => {
    const item = props.items[index]
    if (item) {
      props.command(item)
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => {
    setSelectedIndex(0)
  }, [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (!props.items?.length) {
        return false
      }

      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter' || event.key === 'Tab') {
        enterHandler()
        return true
      }

      return false
    },
  }))

  if (!props.items || !props.items.length) {
    return null
  }

  return (
    <div className="slash-command-list">
      {props.items.map((item, index) => (
        <button
          className={`slash-command-item ${index === selectedIndex ? 'selected' : ''}`}
          key={index}
          onClick={() => selectItem(index)}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <div className="flex items-center w-full">
            
            <span>{item.title}</span>
          </div>
        </button>
      ))}
    </div>
  )
})

SlashCommandList.displayName = 'SlashCommandList'
