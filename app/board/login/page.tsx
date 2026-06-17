'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogIn, Loader2 } from 'lucide-react';

const FlowerLogo = () => (
  <svg viewBox="0 0 360 90" xmlns="http://www.w3.org/2000/svg" className="h-[90px] w-auto">
    <defs>
      <clipPath id="mc"><circle cx="45" cy="45" r="42"/></clipPath>
      <radialGradient id="bg-g" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#2a6cc4"/>
        <stop offset="100%" stopColor="#0d3b6e"/>
      </radialGradient>
    </defs>
    <circle cx="45" cy="45" r="43" fill="url(#bg-g)"/>
    <g clipPath="url(#mc)" fill="none" stroke="rgba(255,255,255,.38)" strokeWidth="0.7">
      <circle cx="45" cy="45" r="14.5"/><circle cx="45" cy="30.5" r="14.5"/>
      <circle cx="57.56" cy="37.75" r="14.5"/><circle cx="57.56" cy="52.25" r="14.5"/>
      <circle cx="45" cy="59.5" r="14.5"/><circle cx="32.44" cy="52.25" r="14.5"/>
      <circle cx="32.44" cy="37.75" r="14.5"/><circle cx="45" cy="16" r="14.5"/>
      <circle cx="70.12" cy="30.5" r="14.5"/><circle cx="70.12" cy="59.5" r="14.5"/>
      <circle cx="45" cy="74" r="14.5"/><circle cx="19.88" cy="59.5" r="14.5"/>
      <circle cx="19.88" cy="30.5" r="14.5"/><circle cx="70.12" cy="45" r="14.5"/>
      <circle cx="57.56" cy="67.56" r="14.5"/><circle cx="32.44" cy="67.56" r="14.5"/>
      <circle cx="19.88" cy="45" r="14.5"/><circle cx="32.44" cy="22.44" r="14.5"/>
      <circle cx="57.56" cy="22.44" r="14.5"/>
    </g>
    <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.2"/>
    <circle cx="45" cy="45" r="4" fill="#F4B800"/>
    <circle cx="45" cy="45" r="2" fill="#FFE066"/>
    <text x="100" y="38" fontFamily="Georgia,Garamond,serif" fontSize="20" fill="white" fontWeight="700" letterSpacing="1">WIDGEON POINT</text>
    <text x="100" y="54" fontFamily="Georgia,Garamond,serif" fontSize="9.5" fill="rgba(255,255,255,.8)" letterSpacing="3">CHARITABLE FOUNDATION</text>
    <line x1="100" y1="59" x2="358" y2="59" stroke="rgba(255,255,255,.25)" strokeWidth=".8"/>
    <text x="100" y="73" fontFamily="Georgia,serif" fontSize="8.5" fill="rgba(255,255,255,.5)" letterSpacing="2" fontStyle="italic">Board Portal</text>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(false);
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) { router.push('/board'); }
    else { setError(true); setTimeout(() => setError(false), 3500); }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d3b6e 0%, #1B4F9B 40%, #2a6cc4 100%)' }}>

      {/* Orbs */}
      <div className="absolute w-[520px] h-[520px] rounded-full opacity-20 top-[-80px] left-[-100px]"
        style={{ background: 'radial-gradient(circle, #4a90d9, transparent)', animation: 'float 12s ease-in-out infinite' }}/>
      <div className="absolute w-[400px] h-[400px] rounded-full opacity-15 bottom-[-60px] right-[-80px]"
        style={{ background: 'radial-gradient(circle, #F4B800, transparent)', animation: 'float 16s ease-in-out infinite reverse' }}/>

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        <FlowerLogo />

        <div className="glass rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to access the board dashboard</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email" required autoComplete="username"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-10 rounded-lg border border-gray-200 bg-white/70 px-3 text-sm outline-none focus:border-[#1B4F9B] focus:ring-2 focus:ring-[#1B4F9B]/20 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password" required autoComplete="current-password"
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-10 rounded-lg border border-gray-200 bg-white/70 px-3 text-sm outline-none focus:border-[#1B4F9B] focus:ring-2 focus:ring-[#1B4F9B]/20 transition-all"
              />
            </div>

            {error && (
              <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
                Incorrect credentials. Please try again.
              </p>
            )}

            <Button type="submit" disabled={loading}
              className="h-10 bg-[#0d3b6e] hover:bg-[#1B4F9B] text-white font-semibold rounded-lg transition-all">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <LogIn className="h-4 w-4 mr-2"/>}
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
