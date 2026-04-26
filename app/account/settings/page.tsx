'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

type Section = 'profile' | 'password' | 'addresses' | 'notifications' | 'danger'

type Address = {
  id: number
  label: string
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  pin: string
  phone?: string
  is_default: boolean
}

export default function AccountSettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [section, setSection] = useState<Section>('profile')
  const supabase = createClient()

  // Profile state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [phone, setPhone]         = useState('')
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileMsg, setProfileMsg] = useState('')

  // Password state
  const [newPassword, setNewPassword]     = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordSaving, setPasswordSaving]   = useState(false)
  const [passwordMsg, setPasswordMsg]         = useState('')

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>([])
  const [addrLoading, setAddrLoading] = useState(false)
  const [showAddAddr, setShowAddAddr] = useState(false)
  const [addrForm, setAddrForm] = useState({ label:'', name:'', line1:'', line2:'', city:'', state:'', pin:'', phone:'' })
  const [addrSaving, setAddrSaving] = useState(false)
  const [addrMsg, setAddrMsg] = useState('')

  // Notifications
  const [notifOrderUpdates, setNotifOrderUpdates]   = useState(true)
  const [notifNewDrops, setNotifNewDrops]           = useState(true)
  const [notifNewsletter, setNotifNewsletter]       = useState(false)
  const [notifSaving, setNotifSaving]               = useState(false)
  const [notifMsg, setNotifMsg]                     = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push('/signin?next=/account/settings')
        return
      }
      setUser(data.user)

      // Load profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, phone')
        .eq('id', data.user.id)
        .single()

      if (profile) {
        setFirstName(profile.first_name ?? data.user.user_metadata?.given_name ?? '')
        setLastName(profile.last_name ?? data.user.user_metadata?.family_name ?? '')
        setPhone(profile.phone ?? '')
      }

      setLoading(false)
    })
  }, [])

  async function loadAddresses() {
    if (!user) return
    setAddrLoading(true)
    const { data } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
    setAddresses(data ?? [])
    setAddrLoading(false)
  }

  useEffect(() => {
    if (section === 'addresses' && user) loadAddresses()
  }, [section, user])

  async function saveProfile() {
    if (!user) return
    setProfileSaving(true)
    setProfileMsg('')
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, first_name: firstName, last_name: lastName, phone })
    setProfileSaving(false)
    setProfileMsg(error ? error.message : 'Saved.')
    setTimeout(() => setProfileMsg(''), 3000)
  }

  async function savePassword() {
    if (newPassword !== confirmPassword) {
      setPasswordMsg('Passwords do not match.')
      return
    }
    if (newPassword.length < 8) {
      setPasswordMsg('Password must be at least 8 characters.')
      return
    }
    setPasswordSaving(true)
    setPasswordMsg('')
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPasswordSaving(false)
    if (error) {
      setPasswordMsg(error.message)
    } else {
      setPasswordMsg('Password updated.')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPasswordMsg(''), 3000)
    }
  }

  async function saveAddress() {
    if (!user) return
    setAddrSaving(true)
    setAddrMsg('')
    const { error } = await supabase.from('addresses').insert({
      user_id: user.id,
      ...addrForm,
      is_default: addresses.length === 0,
    })
    setAddrSaving(false)
    if (error) {
      setAddrMsg(error.message)
    } else {
      setAddrMsg('Address saved.')
      setAddrForm({ label:'', name:'', line1:'', line2:'', city:'', state:'', pin:'', phone:'' })
      setShowAddAddr(false)
      loadAddresses()
      setTimeout(() => setAddrMsg(''), 3000)
    }
  }

  async function deleteAddress(id: number) {
    await supabase.from('addresses').delete().eq('id', id)
    loadAddresses()
  }

  async function setDefaultAddress(id: number) {
    if (!user) return
    await supabase.from('addresses').update({ is_default: false }).eq('user_id', user.id)
    await supabase.from('addresses').update({ is_default: true }).eq('id', id)
    loadAddresses()
  }

  async function saveNotifications() {
    setNotifSaving(true)
    // Store in user metadata for now
    await supabase.auth.updateUser({
      data: { notif_order_updates: notifOrderUpdates, notif_new_drops: notifNewDrops, notif_newsletter: notifNewsletter }
    })
    setNotifSaving(false)
    setNotifMsg('Preferences saved.')
    setTimeout(() => setNotifMsg(''), 3000)
  }

  async function deleteAccount() {
    const confirmed = window.confirm('Are you sure? This cannot be undone. All your data will be permanently deleted.')
    if (!confirmed) return
    // Sign out — actual deletion requires a server function (future)
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-forest pt-32 px-6 flex items-center justify-center">
          <p className="text-micro text-monk-faint tracking-widest">Loading...</p>
        </main>
      </>
    )
  }

  const NAV_ITEMS: { id: Section; label: string }[] = [
    { id: 'profile',       label: 'Profile' },
    { id: 'password',      label: 'Password' },
    { id: 'addresses',     label: 'Addresses' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'danger',        label: 'Danger Zone' },
  ]

  const inputCls = "w-full bg-forest border border-monk-border px-4 py-3 text-small text-monk-white placeholder:text-monk-faint focus:border-gold focus:outline-none transition-colors"
  const labelCls = "text-micro text-monk-faint tracking-widest block mb-2"
  const btnPrimary = "bg-gold text-forest-dark text-micro tracking-widest px-8 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${checked ? 'bg-gold' : 'bg-forest border border-monk-border'}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-transform ${checked ? 'bg-forest-dark translate-x-5' : 'bg-monk-faint translate-x-0.5'}`} />
    </button>
  )

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-forest pt-32 pb-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-container mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-10 text-micro text-monk-faint tracking-widest">
            <Link href="/account" className="hover:text-gold transition-colors">Account</Link>
            <span>→</span>
            <span className="text-monk-white">Settings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-px bg-monk-border border border-monk-border">

            {/* Sidebar */}
            <div className="bg-forest-dark flex flex-col">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`px-6 py-4 text-left text-small tracking-wide transition-colors border-b border-monk-border last:border-b-0 ${
                    section === item.id
                      ? 'text-gold bg-forest border-l-2 border-l-gold'
                      : 'text-monk-dim hover:text-monk-white hover:bg-forest'
                  } ${item.id === 'danger' ? 'mt-auto text-monk-error/70 hover:text-monk-error' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="bg-forest p-8 md:p-12">

              {/* PROFILE */}
              {section === 'profile' && (
                <div>
                  <h2 className="text-h3 font-medium text-monk-white mb-8">Profile</h2>
                  <div className="flex flex-col gap-6 max-w-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>First Name</label>
                        <input className={inputCls} value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Arjun" />
                      </div>
                      <div>
                        <label className={labelCls}>Last Name</label>
                        <input className={inputCls} value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Sharma" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input className={`${inputCls} opacity-50 cursor-not-allowed`} value={user?.email ?? ''} disabled />
                      <p className="text-small text-monk-faint mt-1">Email cannot be changed here.</p>
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input className={inputCls} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <button onClick={saveProfile} disabled={profileSaving} className={btnPrimary}>
                        {profileSaving ? 'Saving…' : 'Save Profile'}
                      </button>
                      {profileMsg && <p className="text-small text-gold">{profileMsg}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* PASSWORD */}
              {section === 'password' && (
                <div>
                  <h2 className="text-h3 font-medium text-monk-white mb-2">Password</h2>
                  <p className="text-small text-monk-dim mb-8">
                    {user?.app_metadata?.provider === 'email'
                      ? 'Change your password below.'
                      : `You signed in with ${user?.app_metadata?.provider}. Password login is not available for your account.`}
                  </p>
                  {user?.app_metadata?.provider === 'email' && (
                    <div className="flex flex-col gap-6 max-w-md">
                      <div>
                        <label className={labelCls}>New Password</label>
                        <input type="password" className={inputCls} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" minLength={8} />
                      </div>
                      <div>
                        <label className={labelCls}>Confirm New Password</label>
                        <input type="password" className={inputCls} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" />
                      </div>
                      <div className="flex items-center gap-4 pt-2">
                        <button onClick={savePassword} disabled={passwordSaving} className={btnPrimary}>
                          {passwordSaving ? 'Saving…' : 'Update Password'}
                        </button>
                        {passwordMsg && <p className={`text-small ${passwordMsg.includes('updated') ? 'text-gold' : 'text-monk-error'}`}>{passwordMsg}</p>}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ADDRESSES */}
              {section === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-h3 font-medium text-monk-white">Saved Addresses</h2>
                    <button onClick={() => setShowAddAddr(v => !v)} className="text-micro text-gold tracking-widest border border-monk-border px-4 py-2 hover:border-gold transition-colors">
                      {showAddAddr ? 'Cancel' : '+ Add Address'}
                    </button>
                  </div>

                  {addrMsg && <p className="text-small text-gold mb-4">{addrMsg}</p>}

                  {showAddAddr && (
                    <div className="border border-monk-border p-6 mb-8 bg-forest-dark">
                      <p className="text-micro text-gold tracking-widest mb-6">New Address</p>
                      <div className="grid grid-cols-1 gap-4 max-w-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={labelCls}>Label (optional)</label>
                            <input className={inputCls} value={addrForm.label} onChange={e => setAddrForm(f => ({...f, label:e.target.value}))} placeholder="Home, Office…" />
                          </div>
                          <div>
                            <label className={labelCls}>Full Name</label>
                            <input className={inputCls} value={addrForm.name} onChange={e => setAddrForm(f => ({...f, name:e.target.value}))} placeholder="Arjun Sharma" required />
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Address Line 1</label>
                          <input className={inputCls} value={addrForm.line1} onChange={e => setAddrForm(f => ({...f, line1:e.target.value}))} placeholder="Flat 4B, Tower C" required />
                        </div>
                        <div>
                          <label className={labelCls}>Address Line 2 (optional)</label>
                          <input className={inputCls} value={addrForm.line2} onChange={e => setAddrForm(f => ({...f, line2:e.target.value}))} placeholder="DLF Phase 2" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className={labelCls}>City</label>
                            <input className={inputCls} value={addrForm.city} onChange={e => setAddrForm(f => ({...f, city:e.target.value}))} placeholder="Gurugram" required />
                          </div>
                          <div>
                            <label className={labelCls}>State</label>
                            <input className={inputCls} value={addrForm.state} onChange={e => setAddrForm(f => ({...f, state:e.target.value}))} placeholder="Haryana" required />
                          </div>
                          <div>
                            <label className={labelCls}>PIN Code</label>
                            <input className={inputCls} value={addrForm.pin} onChange={e => setAddrForm(f => ({...f, pin:e.target.value}))} placeholder="122002" required />
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Phone</label>
                          <input className={inputCls} value={addrForm.phone} onChange={e => setAddrForm(f => ({...f, phone:e.target.value}))} placeholder="+91 98765 43210" />
                        </div>
                        <div className="pt-2">
                          <button onClick={saveAddress} disabled={addrSaving} className={btnPrimary}>
                            {addrSaving ? 'Saving…' : 'Save Address'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {addrLoading ? (
                    <p className="text-micro text-monk-faint tracking-widest">Loading addresses…</p>
                  ) : addresses.length === 0 ? (
                    <div className="border border-monk-border p-10 text-center">
                      <p className="text-body text-monk-dim">No addresses saved yet.</p>
                      <p className="text-small text-monk-faint mt-2">Add one to speed up checkout.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-px bg-monk-border border border-monk-border">
                      {addresses.map(addr => (
                        <div key={addr.id} className="bg-forest p-6 flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              {addr.label && <span className="text-micro text-gold tracking-widest border border-monk-border px-2 py-0.5">{addr.label}</span>}
                              {addr.is_default && <span className="text-micro text-monk-faint tracking-widest">Default</span>}
                            </div>
                            <p className="text-body font-medium text-monk-white">{addr.name}</p>
                            <p className="text-small text-monk-dim mt-1">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                            <p className="text-small text-monk-dim">{addr.city}, {addr.state} — {addr.pin}</p>
                            {addr.phone && <p className="text-small text-monk-dim">{addr.phone}</p>}
                          </div>
                          <div className="flex flex-col gap-2 flex-shrink-0">
                            {!addr.is_default && (
                              <button onClick={() => setDefaultAddress(addr.id)} className="text-micro text-monk-dim hover:text-gold transition-colors tracking-widest">
                                Set default
                              </button>
                            )}
                            <button onClick={() => deleteAddress(addr.id)} className="text-micro text-monk-faint hover:text-monk-error transition-colors tracking-widest">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* NOTIFICATIONS */}
              {section === 'notifications' && (
                <div>
                  <h2 className="text-h3 font-medium text-monk-white mb-8">Notifications</h2>
                  <div className="flex flex-col gap-0 max-w-lg border border-monk-border">
                    {[
                      { label: 'Order updates', sub: 'Shipping, delivery, and order status changes.', value: notifOrderUpdates, set: setNotifOrderUpdates },
                      { label: 'New Companion drops', sub: 'When new Companions are added to the Hud.', value: notifNewDrops, set: setNotifNewDrops },
                      { label: 'Field notes (newsletter)', sub: 'Occasional signals from the Hud. Never noise.', value: notifNewsletter, set: setNotifNewsletter },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-5 border-b border-monk-border last:border-b-0">
                        <div>
                          <p className="text-body font-medium text-monk-white">{item.label}</p>
                          <p className="text-small text-monk-dim mt-0.5">{item.sub}</p>
                        </div>
                        <Toggle checked={item.value} onChange={item.set} />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-8">
                    <button onClick={saveNotifications} disabled={notifSaving} className={btnPrimary}>
                      {notifSaving ? 'Saving…' : 'Save Preferences'}
                    </button>
                    {notifMsg && <p className="text-small text-gold">{notifMsg}</p>}
                  </div>
                </div>
              )}

              {/* DANGER ZONE */}
              {section === 'danger' && (
                <div>
                  <h2 className="text-h3 font-medium text-monk-white mb-2">Danger Zone</h2>
                  <p className="text-body text-monk-dim mb-8">These actions are permanent and cannot be undone.</p>
                  <div className="border border-monk-error/30 p-6 max-w-md">
                    <h3 className="font-medium text-monk-white mb-2">Delete Account</h3>
                    <p className="text-small text-monk-dim mb-6 leading-relaxed">
                      Your profile, addresses, and all account data will be permanently deleted. Orders already placed are retained for legal purposes.
                    </p>
                    <button
                      onClick={deleteAccount}
                      className="border border-monk-error text-monk-error text-micro tracking-widest px-6 py-3 hover:bg-monk-error hover:text-forest transition-colors"
                    >
                      Delete my account
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
