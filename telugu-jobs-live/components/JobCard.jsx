import Link from 'next/link'

export default function JobCard({ job }){
  return (
    <Link href={`/jobs/${job.id}`} className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10}}>
        <h3 style={{margin:0}}>{job.title}</h3>
        <span className="badge">{job.category || 'General'}</span>
      </div>
      <div className="small" style={{marginTop:6}}>{job.company} • {job.location || job.district}, {job.state}</div>
      <div className="small" style={{marginTop:6}}>{job.job_type} {job.salary_min ? `• ₹${(job.salary_min/1000).toFixed(0)}k - ₹${(job.salary_max/1000).toFixed(0)}k` : ''}</div>
    </Link>
  )
}
