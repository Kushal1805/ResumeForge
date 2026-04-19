export function encodeState(state) {
  try {
    const str = JSON.stringify(state);
    const hash = btoa(unescape(encodeURIComponent(str)));
    return window.location.origin + window.location.pathname + "#" + hash;
  } catch (e) {
    console.error("Failed to encode state", e);
    return window.location.href;
  }
}

export function decodeState(hash) {
  if (!hash || hash.length <= 1) return null;
  try {
    const raw = hash.replace(/^#/, '');
    const jsonStr = decodeURIComponent(escape(atob(raw)));
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to decode state", e);
    return null;
  }
}
