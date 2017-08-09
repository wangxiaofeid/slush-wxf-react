export async function ajax1(querys) {
  const data = Object.assign({}, querys||{});
  const params = Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
  return await fetch(`/url?${params}`, {
      credentials: 'include',
      method: 'post'
    })
    .then(res => res.json());
}

export async function ajax2(querys) {
  const data = Object.assign({}, querys||{});
  let formData = new FormData();
  for(var key in data){
      formData.append(key, data[key]);
  }
  return await fetch(`/url`, {
      credentials: 'include',
      method: 'post',
      body: formData
    })
    .then(res => res.json());
}
