import { supabaseServer } from '../lib/supabase'
import JobCard from '../components/JobCard'
import SearchBar from '../components/SearchBar'

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }) {
  const s = searchParams || {}
  const supabase = supabaseServer()

  let q = supabase.from('jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(60)

  if(s.state) q = q.ilike('state', `%${s.state}%`)
  if(s.district) q = q.ilike('district', `%${s.district}%`)
  if(s.category) q = q.ilike('category', `%${s.category}%`)
  if(s.q) q = q.or(`title.ilike.%${s.q}%,company.ilike.%${s.q}%,location.ilike.%${s.q}%`)

  const { data, error } = await q

  return (
    <main>
      <section className="hero">
        <h1>Jobs in AP & Telangana</h1>
        <p>Fresh, local, and fast. Built for candidates in Andhra Pradesh & Telangana.</p>
      </section>

      <SearchBar />

      {error && <div className="card" style={{borderColor:'var(--danger)'}}>Error: {error.message}</div>}
      {!data?.length ? <div className="card">No jobs yet. Add rows to <code>public.jobs</code>.</div> :
        <div className="grid">
          {data.map(j => <JobCard key={j.id} job={j} />)}
        </div>
      }
    </main>
  )
}
