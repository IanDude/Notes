// testPassword.js
import bcrypt from "bcryptjs";

async function testPassword() {
  const testPassword = "supernatural3";

  console.log("=== TEST PASSWORD HASHING ===");
  console.log("Original password:", testPassword);

  // Hash it
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(testPassword, salt);

  console.log("Generated hash:", hash);
  console.log("Hash length:", hash.length);
  console.log("Hash starts with $2a$10$?:", hash.startsWith("$2a$10$"));

  // Test comparison
  const isValid = await bcrypt.compare(testPassword, hash);
  console.log("Compare SAME password:", isValid);

  const isWrong = await bcrypt.compare("wrongpassword", hash);
  console.log("Compare WRONG password:", isWrong);
}

testPassword();
