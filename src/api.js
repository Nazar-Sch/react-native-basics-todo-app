export class Api {
  static HEADERS = { "Content-Type": "application/json" }

  static async get(url) {
    try {
      return await _request(url, "GET")
    } catch (e) {
      console.log(e)
    }
  }

  static async post(url, data = {}) {
    try {
      return await _request(url, "POST", data)
    } catch (e) {
      console.log(e)
    }
  }

  static async patch(url, data = {}) {
    try {
      return await _request(url, "PATCH", data)
    } catch (e) {
      console.log(e)
    }
  }

  static async delete(url) {
    try {
      return await _request(url, "DELETE")
    } catch (e) {
      console.log(e)
    }
  }
}

async function _request(url, method = "GET", data) {
  const config = {
    method,
    headers: Api.HEADERS,
  }

  if (method === "POST" || method === "PATCH") {
    config.body = JSON.stringify(data)
  }

  const res = await fetch(url, config)
  return await res.json()
}
