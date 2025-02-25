import { useState } from 'react'

export default function ImageDialog({ onConfirm, onClose }) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm(url)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#171717] border border-[#333] p-6 rounded-xl shadow-2xl w-[480px] text-white">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
              图片 URL
            </label>
            <input
              type="text"
              id="url"
              className="w-full px-4 py-2.5 bg-[#1f1f1f] border border-[#333] rounded-lg text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="请输入图片URL"
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#333] rounded-lg text-sm font-medium text-gray-300 
                hover:bg-[#1f1f1f] transition-colors duration-200"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white
                hover:bg-blue-700 transition-colors duration-200"
            >
              确认
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}