// Generate 300 SpeakCEO IDs
console.log('🎉 300 Working SpeakCEO Login IDs:');
console.log('================================');

const ids = [];
for (let i = 1; i <= 300; i++) {
  const paddedNumber = i.toString().padStart(3, '0');
  const id = `SpeakCEO${paddedNumber}`;
  ids.push(id);
}

// Display in groups of 10 for easy reading
for (let i = 0; i < ids.length; i += 10) {
  const group = ids.slice(i, i + 10);
  console.log(`${String(i + 1).padStart(3, ' ')}-${String(Math.min(i + 10, ids.length)).padStart(3, ' ')}: ${group.join(', ')}`);
}

console.log('\n✅ All 300 IDs generated successfully!');
console.log('\n🔗 Usage:');
console.log('• Go to http://localhost:5173/login');
console.log('• Enter any ID from SpeakCEO001 to SpeakCEO300');
console.log('• First-time users will enter their name');
console.log('• Returning users login directly');

export default ids;
