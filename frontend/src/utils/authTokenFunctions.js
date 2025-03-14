import Base64 from "crypto-js/enc-base64";
import HmacSHA256 from "crypto-js/hmac-sha256";
import Utf8 from "crypto-js/enc-utf8";
const jwtSecret = "some-secret-code-goes-here";

function base64url(source) {
  // Encode in classical base64
  let encodedSource = Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, "");

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");

  // Return the base64 encoded string
  return encodedSource;
}

export function generateJWTToken(tokenPayload) {
  // Define token header
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  // Calculate the issued at and expiration dates
  const date = new Date();
  const iat = Math.floor(date.getTime() / 1000);
  const exp = Math.floor(date.setDate(date.getDate() + 7) / 1000);

  // Define token payload
  const payload = {
    iat,
    iss: "Fuse",
    exp,
    ...tokenPayload,
  };

  // Stringify and encode the header
  const stringifiedHeader = Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);

  // Stringify and encode the payload
  const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
  const encodedPayload = base64url(stringifiedPayload);

  // Sign the encoded header and mock-api
  let signature = `${encodedHeader}.${encodedPayload}`;
  signature = HmacSHA256(signature, jwtSecret);
  signature = base64url(signature);

  // Build and return the token
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyJWTToken(token) {
  // Split the token into parts
  const parts = token.split(".");
  const header = parts[0];
  const payload = parts[1];
  const signature = parts[2];

  // Re-sign and encode the header and payload using the secret
  const signatureCheck = base64url(
    HmacSHA256(`${header}.${payload}`, jwtSecret)
  );

  // Verify that the resulting signature is valid
  return signature === signatureCheck;
}
