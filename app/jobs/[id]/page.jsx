import { supabaseServer } from '../../../lib/supabase'

export const dynamic = 'force-dynamic'

export default async function JobPage({ params }){
  const supabase = supabaseServer()
  const { data: job, error } = await supabase.from('jobs').select('*').eq('id', params.id).single()

  if(error || !job) return <div className="card">Job not found.</div>

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "employmentType": job.job_type || "FULL_TIME",
    "hiringOrganization": { "@type": "Organization", "name": job.company || "Employer" },
    "jobLocation": { "@type": "Place", "address": { "@type":"PostalAddress", "addressLocality": job.location || job.district, "addressRegion": job.state, "addressCountry":"IN" } },
    "datePosted": job.created_at,
    "validThrough": job.expires_at || undefined,
    "description": job.description
  }

  return (
    <article className="card">
      <h1>{job.title}</h1>
      <div className="small">{job.company} • {(job.location || job.district)}, {job.state}</div>
      <div className="small" style={{marginTop:6}}>{job.category} • {job.job_type}</div>
      <div style={{marginTop:12,whiteSpace:'pre-wrap'}}>{job.description}</div>
      <div style={{marginTop:16,display:'flex',gap:10}}>
        {job.external_url && <a className="btn" href={job.external_url} target="_blank">Apply</a>}
        <a href="/" className="btn ghost">← Back</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  )
}
