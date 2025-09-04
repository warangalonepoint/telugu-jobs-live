'use client'
import { useState } from 'react'

export default function PostJob(){
  const [msg,setMsg] = useState('')

  async function submit(e){
    e.preventDefault()
    setMsg('Posting...')
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/jobs', { method:'POST', body: fd })
    const j = await res.json()
    setMsg(j.ok ? 'Posted!' : ('Error: '+j.error))
    if(j.ok) e.currentTarget.reset()
  }

  return (
    <form onSubmit={submit} className="card">
      <h1>Post a Job</h1>
      <div className="label">Title*</div>
      <input name="title" className="input" required />

      <div className="row">
        <input name="company" className="input" placeholder="Company" />
        <input name="location" className="input" placeholder="City / Town" />
      </div>

      <div className="row" style={{marginTop:10}}>
        <input name="district" className="input" placeholder="District" />
        <select name="state" className="input">
          <option>Telangana</option>
          <option>Andhra Pradesh</option>
        </select>
      </div>

      <div className="row" style={{marginTop:10}}>
        <input name="category" className="input" placeholder="IT / Govt / Banking" />
        <select name="job_type" className="input">
          <option value="FULL_TIME">FULL_TIME</option>
          <option value="PART_TIME">PART_TIME</option>
          <option value="CONTRACT">CONTRACT</option>
        </select>
      </div>

      <div className="label" style={{marginTop:10}}>Description</div>
      <textarea name="description" rows={6} className="input" />

      <div className="row" style={{marginTop:10}}>
        <input name="salary_min" className="input" placeholder="Salary Min (₹)" />
        <input name="salary_max" className="input" placeholder="Salary Max (₹)" />
      </div>

      <div className="label" style={{marginTop:10}}>External Apply URL</div>
      <input name="external_url" className="input" placeholder="https://..." />

      <div style={{marginTop:12,display:'flex',gap:10,alignItems:'center'}}>
        <button className="btn" type="submit">Post</button>
        <span className="small">{msg}</span>
      </div>
    </form>
  )
}
