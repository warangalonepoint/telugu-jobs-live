import { supabaseServer } from '../../../lib/supabase'

export async function POST(req){
  try{
    const form = await req.formData()
    const payload = {
      title: String(form.get('title')||''),
      company: String(form.get('company')||''),
      location: String(form.get('location')||''),
      district: String(form.get('district')||''),
      state: String(form.get('state')||''),
      category: String(form.get('category')||''),
      job_type: String(form.get('job_type')||'FULL_TIME'),
      salary_min: Number(form.get('salary_min')||0),
      salary_max: Number(form.get('salary_max')||0),
      salary_currency: 'INR',
      description: String(form.get('description')||''),
      source: 'Manual',
      external_url: String(form.get('external_url')||''),
      is_active: true
    }
    const supabase = supabaseServer()
    const { error } = await supabase.from('jobs').insert(payload)
    if(error) return Response.json({ ok:false, error: error.message }, { status: 400 })
    return Response.json({ ok:true })
  }catch(e){
    return Response.json({ ok:false, error: e.message }, { status: 500 })
  }
}
