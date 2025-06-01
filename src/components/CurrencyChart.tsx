import React, { useEffect, useRef } from 'react';

interface CurrencyChartProps {
  data: { date: string; rate: number }[];
  currencyPair: string;
}

const CurrencyChart: React.FC<CurrencyChartProps> = ({ data, currencyPair }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Define chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Find min and max values
    const rates = data.map(item => item.rate);
    const minRate = Math.min(...rates) * 0.998; // Add a little padding
    const maxRate = Math.max(...rates) * 1.002;
    const rateRange = maxRate - minRate;
    
    // Draw axes
    ctx.strokeStyle = '#CBD5E1'; // slate-300
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw grid lines
    const gridCount = 5;
    ctx.strokeStyle = '#EFF6FF'; // blue-50
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 1; i < gridCount; i++) {
      const y = padding + (chartHeight / gridCount) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
      
      // Y-axis labels
      const labelValue = maxRate - (i / gridCount) * rateRange;
      ctx.fillStyle = '#64748B'; // slate-500
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(labelValue.toFixed(4), padding - 5, y + 3);
    }
    
    // Draw the line chart
    ctx.strokeStyle = '#3B82F6'; // blue-500
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Plot points
    data.forEach((point, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((point.rate - minRate) / rateRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // Fill area under the line
    ctx.lineTo(padding + chartWidth, canvas.height - padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)'; // blue-500 with opacity
    ctx.fill();
    
    // Draw dots for data points (every 5th point for clarity)
    ctx.fillStyle = '#1D4ED8'; // blue-700
    data.forEach((point, index) => {
      if (index % 5 === 0 || index === data.length - 1) {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + chartHeight - ((point.rate - minRate) / rateRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Draw X-axis labels (show 5 dates evenly spaced)
    ctx.fillStyle = '#64748B'; // slate-500
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < 5; i++) {
      const index = Math.floor((i / 4) * (data.length - 1));
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const date = new Date(data[index].date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
      
      ctx.fillText(formattedDate, x, canvas.height - padding + 15);
    }
    
  }, [data, currencyPair]);

  return (
    <div className="w-full h-64 md:h-80">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={400} 
        className="w-full h-full"
      ></canvas>
    </div>
  );
};

export default CurrencyChart;