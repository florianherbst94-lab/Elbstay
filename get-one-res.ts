import 'dotenv/config'

async function check() {
  const token = process.env.HOSPITABLE_API_TOKEN
  const propRes = await fetch("https://public.api.hospitable.com/v2/properties", {
    headers: { "Authorization": `Bearer ${token}` }
  })
  const propData = await propRes.json()
  const propIds = propData.data?.map((p: any) => p.id) || []
  const propsQuery = propIds.map((id: string) => `properties[]=${id}`).join('&')
  
  const noDateUrl = `https://public.api.hospitable.com/v2/reservations?include=financials&per_page=1&${propsQuery}`
  const res2 = await fetch(noDateUrl, {
    headers: { "Authorization": `Bearer ${token}` }
  })
  const data2 = await res2.json()
  console.log(JSON.stringify(data2.data[0], null, 2))
}
check()
