const bcrypt = require('bcryptjs');

// Helper function to create a test string of given length
function createTestStrings(length) {
  const baseString = '0'.repeat(length); // String of '0's with the specified length
  const extendedString = baseString + '_' + Date.now(); // Append a timestamp for uniqueness
  return { baseString, extendedString };
}

// Function to test bcrypt behavior for a given string length
function testBcryptLength(length) {
  const { baseString, extendedString } = createTestStrings(length);

  console.log(`\nTesting bcrypt with string length = ${length}`);
  console.log({ baseString, extendedString });

  // Generate bcrypt hashes for both strings
  const hash1 = bcrypt.hashSync(baseString);
  const hash2 = bcrypt.hashSync(extendedString);

  // Perform comparisons and log results
  console.log('baseString matches hash1:', bcrypt.compareSync(baseString, hash1)); // true
  console.log('baseString matches hash2:', bcrypt.compareSync(baseString, hash2)); // Expected false unless truncated
  console.log('extendedString matches hash1:', bcrypt.compareSync(extendedString, hash1)); // Expected false unless truncated
  console.log('extendedString matches hash2:', bcrypt.compareSync(extendedString, hash2)); // true
}

// Run tests for lengths 71 and 72
[71, 72].forEach(testBcryptLength);
