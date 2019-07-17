async function isTokenValid(method, accessToken) {

  // Validate FB token
  if(method === "facebook") {
    const isTokenValid = await fetch(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${process.env.FB_APP_ID}|${process.env.FB_APP_SECRET}`)
    .then(res => (res.json()))
    .then(json => (json.data.is_valid))
    .catch(err => { throw new Error(`Error in Facebook API. ${err.message}`) })
    return isTokenValid
  }

  // Validate Google token
  if(method === "google") {
    const isTokenValid = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`)
    .then(res => (res.json()))
    .then(json => {
      if(json.email){
        if(json.azp === process.env.GOOGLE_CLIENT_ID){
          return true
        } return false
      } return false
    })
    .catch(err => { throw new Error(`Error in Google API. ${err.message}`) })
    return isTokenValid
  }

}

module.exports = isTokenValid