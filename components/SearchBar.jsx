'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SearchBar(){
  const r = useRouter()
  const sp = useSearchParams()
  const [q,setQ] = useState(sp.get('q') || '')
  const [district,setDistrict] = useState(sp.get('district') || '')
  const [category,setCategory] = useState(sp.get('category') || '')
  const [state,setState] = useState(sp.get('state') || '')

  useEffect(()=>{ setQ(sp.get('q')||'') },[sp])

  function submit(e){
    e.preventDefault()
    const p = new URLSearchParams()
    if(q) p.set('q', q)
    if(district) p.set('district', district)
    if(category) p.set('category', category)
    if(state) p.set('state', state)
    r.push('/?'+p.toString())
  }

  return (
    <form onSubmit={submit} className="card" style={{marginBottom:12}}>
      <div className="label">Search jobs</div>
      <input className="input" placeholder="Title / Company / Location" value={q} onChange={e=>setQ(e.target.value)} />
      <div className="row" style={{marginTop:10}}>
        <input className="input" placeholder="District" value={district} onChange={e=>setDistrict(e.target.value)} />
        <input className="input" placeholder="Category (IT, Govt, Banking...)" value={category} onChange={e=>setCategory(e.target.value)} />
      </div>
      <div className="row" style={{marginTop:10}}>
        <select className="input" value={state} onChange={e=>setState(e.target.value)}>
          <option value="">Any State</option>
          <option value="Telangana">Telangana</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
        </select>
        <button className="btn" type="submit">Search</button>
      </div>
    </form>
  )
}
