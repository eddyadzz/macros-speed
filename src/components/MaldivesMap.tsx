import { useEffect, useState } from 'react';

export function MaldivesMap() {
  const [activeRoute, setActiveRoute] = useState(0);

  const routes = [
    { from: { x: 50, y: 45 }, to: { x: 60, y: 25 }, name: 'Maafushi', color: '#3b82f6' },
    { from: { x: 50, y: 45 }, to: { x: 35, y: 35 }, name: 'Gulhi', color: '#10b981' },
    { from: { x: 50, y: 45 }, to: { x: 65, y: 55 }, name: 'Dhiffushi', color: '#f59e0b' },
    { from: { x: 50, y: 45 }, to: { x: 40, y: 65 }, name: 'Thulusdhoo', color: '#8b5cf6' },
    { from: { x: 50, y: 45 }, to: { x: 45, y: 25 }, name: 'Male', color: '#3b82f6' },
    { from: { x: 50, y: 45 }, to: { x: 65, y: 35 }, name: 'Himmafushi', color: '#10b981' },
    { from: { x: 50, y: 45 }, to: { x: 55, y: 65 }, name: 'Resorts', color: '#f59e0b' },
    { from: { x: 50, y: 45 }, to: { x: 35, y: 50 }, name: 'Boats', color: '#f59e0b' },
    { from: { x: 50, y: 45 }, to: { x: 65, y: 45 }, name: 'Picnic Islands', color: '#8b5cf6' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoute((prev) => (prev + 1) % routes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl overflow-hidden shadow-2xl">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="water" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.1)" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <rect width="100" height="100" fill="url(#water)" />

        <circle cx="50" cy="45" r="4" fill="#ef4444" className="animate-pulse">
          <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="50" y="53" textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">
          Velana Airport
        </text>

        {routes.map((route, index) => (
          <g key={index} opacity={activeRoute === index ? 1 : 0.3}>
            <line
              x1={route.from.x}
              y1={route.from.y}
              x2={route.to.x}
              y2={route.to.y}
              stroke={route.color}
              strokeWidth="0.5"
              strokeDasharray="2,2"
              opacity="0.6"
            />

            <circle cx={route.to.x} cy={route.to.y} r="3" fill={route.color} filter="url(#glow)">
              {activeRoute === index && (
                <animate attributeName="r" values="3;4;3" dur="1s" repeatCount="indefinite" />
              )}
            </circle>

            <text
              x={route.to.x}
              y={route.to.y - 5}
              textAnchor="middle"
              fill="white"
              fontSize="2.5"
              fontWeight="600"
            >
              {route.name}
            </text>

            {activeRoute === index && (
              <circle cx={route.from.x} cy={route.from.y} r="2" fill={route.color}>
                <animateMotion
                  path={`M ${route.from.x} ${route.from.y} L ${route.to.x} ${route.to.y}`}
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}

        <g opacity="0.4">
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 100}
              cy={Math.random() * 100}
              r={Math.random() * 2 + 1}
              fill="#34d399"
            />
          ))}
        </g>
      </svg>

      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-gray-700">Frequent Route:</span>
          <span className="font-bold" style={{ color: routes[activeRoute].color }}>
            Airport → {routes[activeRoute].name}
          </span>
        </div>
      </div>
    </div>
  );
}
