import 'dotenv/config'

async function checkHospitable() {
  const token = process.env.HOSPITABLE_API_TOKEN
  console.log("Token configured:", token ? "Yes (length: " + token.length + ")" : "No")
  console.log("Token starts with:", token?.substring(0, 5))
  
  if (!token) {
    console.error("No token available in process.env")
    return
  }

  try {
    const res = await fetch("https://public.api.hospitable.com/v2/properties", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    
    console.log("Status:", res.status)
    if (!res.ok) {
      console.log("Error response:", await res.text())
    } else {
      console.log("Success! Found properties.")
    }
  } catch (err) {
    console.error("Request failed:", err)
  }
}

checkHospitable()
