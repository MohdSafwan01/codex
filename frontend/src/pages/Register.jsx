import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import MagneticButton from '../components/effects/MagneticButton';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters.'); setShaking(true); setTimeout(() => setShaking(false), 500); return; }
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-ink)' }}>
      {/* Left — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-ochre-dark), var(--color-ink))' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8852a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative z-10 text-center px-12">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-cream)' }}>Join the Archive</h2>
          <p className="text-lg" style={{ color: 'var(--color-cream)', opacity: 0.6 }}>Begin building your digital library today.</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: 'var(--color-parchment)' }}>
        <div className={`w-full max-w-md ${shaking ? 'shake' : ''}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px" style={{ background: 'var(--color-ochre)' }} />
            <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ochre)' }}>Register</span>
          </div>
          <h1 className="text-4xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-ink)' }}>Create Account</h1>
          <p className="mb-8 text-sm" style={{ color: 'var(--color-ink)', opacity: 0.5 }}>Start your collection of digital knowledge.</p>

          {error && (
            <div className="mb-6 p-3 rounded-md text-sm" style={{ background: 'rgba(107,30,46,0.1)', color: 'var(--color-burgundy)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="text-xs uppercase tracking-wider mb-2 block" style={{ fontFamily: 'var(--font-mono)', opacity: 0.5, color: 'var(--color-ink)' }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe"
                className="input-editorial" style={{ color: 'var(--color-ink)', borderBottomColor: 'var(--color-mist)' }} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider mb-2 block" style={{ fontFamily: 'var(--font-mono)', opacity: 0.5, color: 'var(--color-ink)' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                className="input-editorial" style={{ color: 'var(--color-ink)', borderBottomColor: 'var(--color-mist)' }} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider mb-2 block" style={{ fontFamily: 'var(--font-mono)', opacity: 0.5, color: 'var(--color-ink)' }}>Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min 6 characters"
                  className="input-editorial" style={{ color: 'var(--color-ink)', borderBottomColor: 'var(--color-mist)' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none" style={{ color: 'var(--color-ink)', opacity: 0.4 }} data-cursor="button">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <MagneticButton variant="primary" className="w-full mt-2">{loading ? 'Creating...' : 'Create Account'}</MagneticButton>
          </form>

          <p className="mt-8 text-center text-sm" style={{ color: 'var(--color-ink)', opacity: 0.5 }}>
            Already have an account?{' '}
            <Link to="/login" className="no-underline font-medium" style={{ color: 'var(--color-ochre)' }} data-cursor="button">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
