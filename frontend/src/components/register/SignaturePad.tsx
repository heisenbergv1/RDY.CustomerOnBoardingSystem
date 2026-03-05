import React, { useCallback, useEffect, useState, useRef } from 'react'
import { EraserIcon } from 'lucide-react'

interface SignaturePadProps {
  onChange: (dataUrl: string | null) => void
  error?: string
}

export function SignaturePad({ onChange, error }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    // Set actual size in memory (scaled to account for extra pixel density)
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 2
    ctx.strokeStyle = 'hsl(222.2 47.4% 11.2%)' // foreground color
  }, [])
  const getCoordinates = (
    event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent,
  ) => {
    const canvas = canvasRef.current
    if (!canvas)
      return {
        x: 0,
        y: 0,
      }
    const rect = canvas.getBoundingClientRect()
    let clientX, clientY
    if ('touches' in event) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else {
      clientX = (event as React.MouseEvent).clientX
      clientY = (event as React.MouseEvent).clientY
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  const stopDrawing = useCallback(() => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      // Only trigger onChange if something was actually drawn
      // A simple way is just to pass the data URL
      onChange(canvas.toDataURL('image/png'))
    }
  }, [isDrawing, onChange])
  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    // Need to account for the scale we set earlier
    const dpr = window.devicePixelRatio || 1
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
    onChange(null)
  }
  // Handle mouse up outside the canvas
  useEffect(() => {
    window.addEventListener('mouseup', stopDrawing)
    window.addEventListener('touchend', stopDrawing)
    return () => {
      window.removeEventListener('mouseup', stopDrawing)
      window.removeEventListener('touchend', stopDrawing)
    }
  }, [stopDrawing])
  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Signature <span className="text-destructive">*</span>
        </label>
        <button
          type="button"
          onClick={clearSignature}
          className="text-xs flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <EraserIcon className="w-3 h-3 mr-1" />
          Clear
        </button>
      </div>
      <div
        className={`relative w-full h-48 bg-muted/30 rounded-md border ${error ? 'border-destructive' : 'border-input'} overflow-hidden touch-none`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
