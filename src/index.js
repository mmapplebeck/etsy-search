const formEl = document.querySelector('.search')
const apiKey = 'rrok6oy5kysthf2v2fyh4qja'

formEl.addEventListener('submit', e => {
  e.preventDefault()

  const script = document.createElement('script')

  script.setAttribute('src', `https://openapi.etsy.com/v2/users/testusername.js?callback=EtsySearch.callback&api_key=${apiKey}`)

  document.head.appendChild(script)
  document.head.removeChild(script)
});

export function callback(data) {
  console.log(data)
}
