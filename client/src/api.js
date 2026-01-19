const base = import.meta.env.VITE_API_BASE || "/api";

export async function apiGet(path) {
  const res = await fetch(`${base}${path}`);
  if (!res.ok) throw new Error("请求失败");
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error("请求失败");
  return res.json();
}
