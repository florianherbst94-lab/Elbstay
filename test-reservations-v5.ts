import 'dotenv/config'

async function checkHospitableReservations() {
  const token = process.env.HOSPITABLE_API_TOKEN
  
  if (!token) return

  // We need to fetch properties first to get the IDs
  const propRes = await fetch("https://public.api.hospitable.com/v2/properties", {
    headers: { "Authorization": `Bearer ${token}` }
  })
  const propData = await propRes.json()
  const propIds = propData.data?.map((p: any) => p.id) || []
  
  console.log("Found Property IDs:", propIds)
  
  if (propIds.length === 0) return

  // Construct URL with properties[]=id1&properties[]=id2 format
  const propsQuery = propIds.map((id: string) => `properties[]=${id}`).join('&')
  const url = `https://public.api.hospitable.com/v2/reservations?start_date=2024-01-01&end_date=2024-12-31&include=financials&per_page=100&${propsQuery}`
  
  console.log("Testing URL format (array notation)...")
  
  const res = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` }
  })
  
  console.log("Status:", res.status)
  if (!res.ok) {
    const text = await res.text()
    console.log("Error response:", text)
  } else {
    const data = await res.json()
    console.log("SUCCESS! Found", data.data?.length, "reservations.")
    if (data.data?.length > 0) {
      console.log("First reservation:", JSON.stringify(data.data[0], null, 2))
    } else {
      console.log("NO RESERVATIONS FOUND!")
      console.log("Let's try without start/end date filters...")
      
      const noDateUrl = `https://public.api.hospitable.com/v2/reservations?include=financials&per_page=100&${propsQuery}`
      const res2 = await fetch(noDateUrl, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      const data2 = await res2.json()
      console.log("Found without dates:", data2.data?.length)
    }
  }
}

checkHospitableReservations()
