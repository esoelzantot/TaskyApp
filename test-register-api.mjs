/**
 * Diagnostic script to test the Register API directly.
 * Run with: node test-register-api.mjs
 */

const BASE_URL = "https://web-production-2f6b.up.railway.app";
const REGISTER_URL = `${BASE_URL}/auth/register`;

// Generate a unique email so it's guaranteed new
const uniqueEmail = `testuser_${Date.now()}@example.com`;

const payload = {
  name: "Test User",
  email: uniqueEmail,
  password: "abc123",
};

console.log("=== Register API Diagnostic ===");
console.log("URL:", REGISTER_URL);
console.log("Method: POST");
console.log("Payload:", JSON.stringify(payload, null, 2));
console.log("---");

try {
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log("HTTP Status:", response.status);
  console.log("Status Text:", response.statusText);
  console.log("Content-Type:", response.headers.get("content-type"));

  const text = await response.text();
  console.log("Response Body:", text);

  try {
    const json = JSON.parse(text);
    console.log("Parsed JSON:", JSON.stringify(json, null, 2));
  } catch {
    console.log("(Response is not valid JSON)");
  }
} catch (err) {
  console.log("FETCH ERROR:", err.message);
  console.log("Error type:", err.constructor.name);
  console.log("Full error:", err);
}
